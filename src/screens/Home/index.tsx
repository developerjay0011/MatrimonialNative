import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { Heart, X, User, Settings } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { CustomSafeAreaView } from "../../components/CustomSafeAreaView";
import { mockProfiles } from "../../data/mockProfiles";
import { styles } from "./styles";
import { getMatchSuggestions, shortlistMatch } from "../../redux/actions/matches";
import { sendInterest } from "../../redux/actions/interests";
import { getMyProfile } from "../../redux/actions/profile";
import { showToast } from "../../utils/toast";
import { SkeletonProfileCard, SkeletonStats } from "../../components/skeletons";

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
    currentUser,
}: HomeScreenProps) {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [profiles, setProfiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [page, setPage] = useState(1);

    const currentProfile = profiles[currentIndex] || mockProfiles[currentIndex];

    useEffect(() => {
        fetchMatchSuggestions();
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await getMyProfile();
            if (response.success) {
                setUserProfile(response.data);
            }
        } catch (error) {
            console.log('Error fetching user profile');
        }
    };

    const fetchMatchSuggestions = async (pageNum = 1) => {
        try {
            setLoading(pageNum === 1);
            const response = await getMatchSuggestions(pageNum, 10);
            if (response.success && response.data?.profiles) {
                setProfiles(pageNum === 1 ? response.data.profiles : [...profiles, ...response.data.profiles]);
                setPage(pageNum);
            } else {
                setProfiles(mockProfiles);
            }
        } catch (error) {
            setProfiles(mockProfiles);
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
            const response = await sendInterest(currentProfile._id || currentProfile.id, 'Interested in connecting with you!');
            if (response.success) {
                showToast('Interest sent successfully!', { type: 'success' });
                await shortlistMatch(currentProfile._id || currentProfile.id);
            }
        } catch (error: any) {
            showToast(error?.message || 'Failed to send interest', { type: 'error' });
        }

        moveToNextProfile();
    };

    const moveToNextProfile = () => {
        if (currentIndex < profiles.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (profiles.length > 0) {
            fetchMatchSuggestions(page + 1);
            setCurrentIndex(0);
        }
    };

    const handlePass = () => {
        moveToNextProfile();
    };

    if (loading && profiles.length === 0) {
        return (
            <CustomSafeAreaView
                barColor="#f97316"
                style={styles.container}
                edges={['right', 'left']}
                barStyle="light-content"
                headerComponent={(insets) =>
                    <LinearGradient
                        colors={['#f97316', '#ea580c']}
                        style={[styles.header, { paddingTop: insets.top + 20 }]}
                    >
                        <View style={styles.headerContent}>
                            <View>
                                <Text style={styles.greeting}>
                                    {t('home.greeting')}, {userProfile?.firstName || currentUser?.fullName || "User"}
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
                }
            >
                <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
                    <SkeletonStats />
                    <SkeletonProfileCard />
                </ScrollView>
            </CustomSafeAreaView>
        );
    }

    if (!currentProfile) return null;

    return (
        <CustomSafeAreaView
            barColor="#f97316"
            style={styles.container}
            edges={['right', 'left']}
            barStyle="light-content"
            headerComponent={(insets) =>
                <LinearGradient
                    colors={['#f97316', '#ea580c']}
                    style={[styles.header, { paddingTop: insets.top + 20 }]}
                >
                    <View style={styles.headerContent}>
                        <View>
                            <Text style={styles.greeting}>
                                {t('home.greeting')}, {userProfile?.firstName || currentUser?.fullName || "User"}
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
            }
        >
            <ScrollView
                bounces={false}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f97316" />
                }
            >
                {/* Quick Stats */}
                <View style={styles.statsContainer}>
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
                </View>

                {/* Profile Card */}
                <View style={styles.cardContainer}>
                    <Animated.View
                        key={`profile-${currentIndex}`}
                        entering={FadeIn.duration(400)}
                        style={styles.profileCard}
                    >
                        {/* Profile Image */}
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: currentProfile.profilePhoto || currentProfile.photos?.[0]?.url }}
                                style={styles.profileImage}
                                resizeMode="cover"
                            />

                            {/* Badges */}
                            <View style={styles.badgesContainer}>
                                {currentProfile.verified && (
                                    <View style={styles.verifiedBadge}>
                                        <Text style={styles.badgeText}>✓ {t('profile.verified')}</Text>
                                    </View>
                                )}
                                {currentProfile.online && (
                                    <View style={styles.onlineBadge}>
                                        <Text style={styles.badgeText}>{t('profile.online')}</Text>
                                    </View>
                                )}
                            </View>

                            {/* Match Percentage */}
                            <View style={styles.matchBadgeContainer}>
                                <View style={styles.matchBadge}>
                                    <Text style={styles.matchText}>
                                        ⭐ {currentProfile.matchPercentage}%
                                    </Text>
                                </View>
                            </View>

                            {/* Profile Info Overlay */}
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.8)']}
                                style={styles.profileOverlay}
                            >
                                <Text style={styles.profileName}>
                                    {currentProfile.name || currentProfile.fullName}, {currentProfile.age}
                                </Text>
                                <Text style={styles.profileLocation}>
                                    📍 {currentProfile.city} • {currentProfile.height || 'N/A'}
                                </Text>
                            </LinearGradient>
                        </View>

                        {/* Profile Details */}
                        <View style={styles.detailsContainer}>
                            <View style={styles.detailsGrid}>
                                <View style={styles.detailBox}>
                                    <Text style={styles.detailLabel}>{t('profile.education')}</Text>
                                    <Text style={styles.detailValue}>{currentProfile.education}</Text>
                                </View>
                                <View style={styles.detailBox}>
                                    <Text style={styles.detailLabel}>{t('profile.occupation')}</Text>
                                    <Text style={styles.detailValue}>{currentProfile.occupation}</Text>
                                </View>
                                <View style={styles.detailBox}>
                                    <Text style={styles.detailLabel}>{t('profile.income')}</Text>
                                    <Text style={styles.detailValue}>{currentProfile.income}</Text>
                                </View>
                                <View style={styles.detailBox}>
                                    <Text style={styles.detailLabel}>{t('profile.diet')}</Text>
                                    <Text style={styles.detailValue}>{currentProfile.diet}</Text>
                                </View>
                            </View>

                            {currentProfile.bio && (
                                <Text style={styles.bio}>{currentProfile.bio}</Text>
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
            </ScrollView>
        </CustomSafeAreaView>
    );
}
