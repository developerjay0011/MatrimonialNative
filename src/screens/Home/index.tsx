import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { Heart, X, User, Settings } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { CustomSafeAreaView } from "../../components/CustomSafeAreaView";
import { styles } from "./styles";
import { getMatchSuggestions, shortlistMatch } from "../../redux/actions/matches";
import { sendInterest } from "../../redux/actions/interests";
import { getMyProfile } from "../../redux/actions/profile";
import { showToast } from "../../utils/toast";
import { SkeletonProfileCard, SkeletonStats } from "../../components/skeletons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useIsFocused } from "@react-navigation/native";

interface HomeScreenProps {
    onViewProfile: (profileId: string) => void;
    onOpenSearch: () => void;
    onOpenChats: () => void;
    onOpenSettings: () => void;
    onOpenShortlisted: () => void;
    currentUser: any;
}

export function HomeScreen({
    onViewProfile,
    onOpenChats,
    onOpenSettings,
    onOpenShortlisted,
}: HomeScreenProps) {

    const { t } = useTranslation();
    const isFoucsed = useIsFocused();
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [profiles, setProfiles] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const { profileDetails } = useAppSelector((state: any) => state.user);

    const currentProfile = profiles[currentIndex] || {};

    useEffect(() => {
        fetchMatchSuggestions();
        dispatch(getMyProfile());
    }, []);

    const fetchMatchSuggestions = async (pageNum = 1) => {
        try {
            setLoading(pageNum === 1);
            setError(null);
            const response = await getMatchSuggestions(pageNum, 10);
            if (response.success && response.data?.matches) {
                setProfiles(pageNum === 1 ? response.data.matches : [...profiles, ...response.data.matches]);
                setPage(pageNum);
                setError(null);
            } else {
                setError(response.message || t('home.failedToLoadProfiles'));
                setProfiles([]);
            }
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data?.message || t('home.failedToLoadMatchSuggestions');
            setProfiles([]);
            setError(errorMessage);
            showToast(errorMessage, { type: 'error' });
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        setCurrentIndex(0);
        fetchMatchSuggestions(1);
    };

    const handleLike = async () => {
        if (!currentProfile) return;

        try {
            const response = await sendInterest(currentProfile?.id, 'Interested in connecting with you!');
            if (response.success) {
                showToast(t('interests.sentSuccess'), { type: 'success' });
                // await shortlistMatch(currentProfile?.id);
                moveToNextProfile();
            }
        } catch (error: any) {
            showToast(error?.response?.data?.message || t('interests.sendFailed'), { type: 'error' });
        }

    };

    const moveToNextProfile = () => {
        if (currentIndex < profiles.length - 1) {
            setCurrentIndex(currentIndex + 1);
            if (currentIndex === profiles.length - 1) { fetchMatchSuggestions(page + 1) }
        } else if (profiles.length > 0) {
            setCurrentIndex(0);
        }
    };

    const handlePass = () => {
        moveToNextProfile();
    };

    return (
        <CustomSafeAreaView
            barColor="#f97316"
            style={styles.container}
            edges={['right', 'left']}
            barStyle="light-content"
            headerComponent={(insets) => (
                <LinearGradient
                    colors={['#f97316', '#ea580c']}
                    style={[styles.header, { paddingTop: insets.top + 20 }]}
                >
                    <View style={styles.headerContent}>
                        <View>
                            <Text numberOfLines={1} style={styles.greeting}>
                                {t('home.greeting')}, {profileDetails?.fullName || ""}
                            </Text>
                            <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={onOpenSettings}
                            style={styles.settingsButton}
                        >
                            <Settings size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            )}
        >
            {loading ? (
                <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
                    <SkeletonStats />
                    <SkeletonProfileCard />
                </ScrollView>
            ) : error ? (
                <ScrollView
                    bounces={false}
                    contentContainerStyle={styles.scrollContent}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f97316" />}
                >
                    <View style={styles.errorContainer}>
                        <View style={styles.errorIconContainer}>
                            <Text style={styles.errorIcon}>⚠️</Text>
                        </View>
                        <Text style={styles.errorTitle}>{error ? error : t('common.somethingWentWrong')}</Text>
                    </View>
                </ScrollView>
            ) : (
                <ScrollView
                    bounces={false}
                    contentContainerStyle={styles.scrollContent}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f97316" />}
                >
                    {/* Quick Stats */}
                    {/* <View style={styles.statsContainer}>
                        <TouchableOpacity
                            onPress={onOpenShortlisted}
                            style={styles.statCard}
                        >
                            <Text style={styles.statIcon}>❤️</Text>
                            <Text style={styles.statLabel}>{t('home.shortlisted')}</Text>
                            <Text style={styles.statValue}>12</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onOpenChats}
                            style={styles.statCard}
                        >
                            <Text style={styles.statIcon}>💬</Text>
                            <Text style={styles.statLabel}>{t('home.messages')}</Text>
                            <Text style={styles.statValue}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.statCard}>
                            <Text style={styles.statIcon}>✨</Text>
                            <Text style={styles.statLabel}>{t('home.matches')}</Text>
                            <Text style={styles.statValue}>8</Text>
                        </TouchableOpacity>
                    </View> */}

                    {/* Profile Card */}
                    {currentProfile?.id && (
                        <>
                            <View style={styles.cardContainer}>
                                <Animated.View
                                    key={`profile-${currentIndex}`}
                                    entering={FadeIn.duration(400)}
                                    style={styles.profileCard}
                                >
                                    {/* Profile Image Carousel */}
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={{
                                                uri: currentProfile?.photos?.find((photo: any) => photo.isProfilePhoto)?.url || currentProfile?.photos?.[0]?.url
                                            }}
                                            style={styles.profileImage}
                                            resizeMode="cover"
                                        />

                                        {/* Badges */}
                                        <View style={styles.badgesContainer}>
                                            {currentProfile.profile.isProfileVerified && (
                                                <View style={styles.verifiedBadge}>
                                                    <Text style={styles.badgeText}>✓ {t('profile.verified')}</Text>
                                                </View>
                                            )}
                                            {currentProfile.profile.isOnline && (
                                                <View style={styles.onlineBadge}>
                                                    <Text style={styles.badgeText}>{t('profile.online')}</Text>
                                                </View>
                                            )}
                                        </View>

                                        {/* Match Percentage */}
                                        <View style={styles.matchBadgeContainer}>
                                            <View style={styles.matchBadge}>
                                                <Text style={styles.matchText}>
                                                    ⭐ {currentProfile.matchScore}%
                                                </Text>
                                            </View>
                                        </View>

                                        {/* Profile Info Overlay */}
                                        <LinearGradient
                                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                                            style={styles.profileOverlay}
                                        >
                                            <Text style={styles.profileName}>
                                                {currentProfile?.profile?.fullName}, {currentProfile?.profile?.age}
                                            </Text>
                                            <Text style={styles.profileLocation}>
                                                📍 {currentProfile?.profile?.currentCity}, {currentProfile?.profile?.currentState}
                                            </Text>
                                        </LinearGradient>
                                    </View>

                                    {/* Profile Details */}
                                    <View style={styles.detailsContainer}>
                                        <View style={styles.detailsGrid}>
                                            <View style={styles.detailBox}>
                                                <Text style={styles.detailLabel}>{t('profile.education')}</Text>
                                                <Text style={styles.detailValue}>{currentProfile?.profile?.education}</Text>
                                            </View>
                                            <View style={styles.detailBox}>
                                                <Text style={styles.detailLabel}>{t('profile.occupation')}</Text>
                                                <Text style={styles.detailValue}>{currentProfile?.profile?.occupation}</Text>
                                            </View>
                                            <View style={styles.detailBox}>
                                                <Text style={styles.detailLabel}>{t('profile.height')}</Text>
                                                <Text style={styles.detailValue}>{currentProfile?.profile?.height} cm</Text>
                                            </View>
                                            <View style={styles.detailBox}>
                                                <Text style={styles.detailLabel}>{t('profile.weight')}</Text>
                                                <Text style={styles.detailValue}>{currentProfile?.profile?.weight} kg</Text>
                                            </View>
                                        </View>

                                        {currentProfile?.profile?.aboutMe && (
                                            <Text numberOfLines={4} style={styles.bio}>{currentProfile?.profile?.aboutMe}</Text>
                                        )}

                                        <TouchableOpacity
                                            onPress={() => onViewProfile(currentProfile.id)}
                                            style={styles.viewProfileButton}
                                        >
                                            <Text style={styles.viewProfileText}>{t('home.viewFullProfile')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Animated.View>
                            </View>

                            {/* Action Buttons */}
                            <View style={styles.actionsContainer}>
                                <View style={styles.actionsRow}>
                                    <TouchableOpacity
                                        onPress={handlePass}
                                        style={styles.passButton}
                                    >
                                        <X size={24} color="#4b5563" />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={handleLike}
                                        activeOpacity={0.8}
                                    >
                                        <LinearGradient
                                            colors={['#f97316', '#ea580c']}
                                            style={styles.likeButton}
                                        >
                                            <Heart size={32} color="white" fill="white" />
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => onViewProfile(currentProfile.id)}
                                        style={styles.profileButton}
                                    >
                                        <User size={20} color="#3b82f6" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.actionsLabels}>
                                    <Text style={styles.actionLabel}>{t('home.pass')}</Text>
                                    <Text style={styles.actionLabelActive}>{t('home.like')}</Text>
                                    <Text style={styles.actionLabel}>{t('home.profile')}</Text>
                                </View>
                            </View>
                        </>
                    )}
                </ScrollView>
            )}
        </CustomSafeAreaView>
    );
}
