import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { ArrowLeft, Heart, MessageCircle, MapPin, Briefcase } from "lucide-react-native";
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { getProfileById } from "../../data/mockProfiles";
import { styles } from './styles';
import { getUserProfile } from '../../redux/actions/profile';
import { sendInterest } from '../../redux/actions/interests';
import { createChat } from '../../redux/actions/chat';
import { showToast } from '../../utils/toast';
import { SkeletonProfileDetail } from '../../components/skeletons';

interface ProfileDetailScreenProps {
    profileId: string;
    onBack: () => void;
    onOpenChat: (profileId: string) => void;
}

export function ProfileDetailScreen({
    profileId,
    onBack,
    onOpenChat,
}: ProfileDetailScreenProps) {
    const { t } = useTranslation();
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [sendingInterest, setSendingInterest] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, [profileId]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await getUserProfile(profileId);
            if (response.success && response.data) {
                setProfile(response.data);
            } else {
                setProfile(getProfileById(profileId));
            }
        } catch (error) {
            setProfile(getProfileById(profileId));
        } finally {
            setLoading(false);
        }
    };

    const handleSendInterest = async () => {
        try {
            setSendingInterest(true);
            const response = await sendInterest(profileId, 'I am interested in connecting with you!');
            if (response.success) {
                showToast('Interest sent successfully!', { type: 'success' });
            } else {
                showToast(response.message || 'Failed to send interest', { type: 'error' });
            }
        } catch (error: any) {
            showToast(error?.message || 'Failed to send interest', { type: 'error' });
        } finally {
            setSendingInterest(false);
        }
    };

    const handleStartChat = async () => {
        try {
            const response = await createChat(profileId);
            if (response.success && response.data) {
                onOpenChat(response.data._id || profileId);
            } else {
                onOpenChat(profileId);
            }
        } catch (error) {
            onOpenChat(profileId);
        }
    };

    if (loading) {
        return (
            <CustomSafeAreaView
                barColor="#f9fafb"
                barStyle="dark-content"
                edges={['top', 'right', 'bottom', 'left']}
                style={styles.container}
            >
                <ScrollView>
                    <SkeletonProfileDetail />
                </ScrollView>
            </CustomSafeAreaView>
        );
    }

    if (!profile) {
        return (
            <CustomSafeAreaView
                barColor="#f9fafb"
                barStyle="dark-content"
                edges={['top', 'right', 'bottom', 'left']}
                style={styles.container}
            >
                <Text>Profile not found</Text>
            </CustomSafeAreaView>
        );
    }

    return (
        <CustomSafeAreaView
            barColor="#f9fafb"
            barStyle="dark-content"
            edges={['top', 'right', 'bottom', 'left']}
            style={styles.container}
        >
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: profile.profilePhoto || profile.photos?.[0]?.url }}
                        style={styles.profileImage}
                        resizeMode="contain"
                    />

                    <TouchableOpacity
                        onPress={onBack}
                        style={styles.backButton}
                    >
                        <ArrowLeft size={20} color="#374151" />
                    </TouchableOpacity>

                    <View style={styles.matchBadge}>
                        <Text style={styles.matchText}>
                            ⭐ {profile.matchPercentage}% Match
                        </Text>
                    </View>
                </View>

                {/* Profile Content */}
                <Animated.View
                    entering={FadeInUp.delay(200)}
                    style={styles.contentContainer}
                >
                    <View style={styles.content}>
                        <View style={styles.headerSection}>
                            <View style={styles.nameContainer}>
                                <View style={styles.nameRow}>
                                    <Text style={styles.name}>
                                        {profile.name || profile.fullName}, {profile.age}
                                    </Text>
                                    {profile.verified && (
                                        <View style={styles.verifiedBadge}>
                                            <Text style={styles.verifiedText}>✓</Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.infoRow}>
                                    <MapPin size={16} color="#6b7280" />
                                    <Text style={styles.infoText}>{profile.city}, Gujarat</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Briefcase size={16} color="#6b7280" />
                                    <Text style={styles.infoText}>{profile.occupation}</Text>
                                </View>
                            </View>
                            {profile.online && (
                                <View style={styles.onlineBadge}>
                                    <Text style={styles.onlineText}>Online</Text>
                                </View>
                            )}
                        </View>

                        {/* About Section */}
                        {profile.bio && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>{t('profile.about')}</Text>
                                <Text style={styles.bioText}>{profile.bio}</Text>
                            </View>
                        )}

                        {/* Basic Details */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('profile.basicDetails')}</Text>
                            <View style={styles.detailsGrid}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.age')}</Text>
                                    <Text style={styles.detailValue}>{profile.age} years</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.height')}</Text>
                                    <Text style={styles.detailValue}>{profile.height}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.maritalStatus')}</Text>
                                    <Text style={styles.detailValue}>{profile.maritalStatus}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.diet')}</Text>
                                    <Text style={styles.detailValue}>{profile.diet}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Professional Details */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionIcon}>💼</Text>
                                <Text style={styles.sectionTitle}>💼 {t('profile.professionalDetails')}</Text>
                            </View>
                            <View style={styles.detailsGrid}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.education')}</Text>
                                    <Text style={styles.detailValue}>{profile.education}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.occupation')}</Text>
                                    <Text style={styles.detailValue}>{profile.occupation}</Text>
                                </View>
                                <View style={[styles.detailItem, { width: '100%' }]}>
                                    <Text style={styles.detailLabel}>{t('profile.income')}</Text>
                                    <Text style={styles.detailValue}>{profile.income}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Family Details */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionIcon}>👨‍👩‍👧‍👦</Text>
                                <Text style={styles.sectionTitle}>👨‍👩‍👧‍👦 {t('profile.familyDetails')}</Text>
                            </View>
                            <View style={styles.familyDetails}>
                                <Text style={styles.familyText}>• Family Type: {profile.familyType}</Text>
                                <Text style={styles.familyText}>• Father: {profile.fatherOccupation}</Text>
                                <Text style={styles.familyText}>• Mother: {profile.motherOccupation}</Text>
                                <Text style={styles.familyText}>• Siblings: {profile.siblings}</Text>
                            </View>
                        </View>

                        <View style={{ height: 100 }} />
                    </View>
                </Animated.View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={styles.interestButton}
                    onPress={handleSendInterest}
                    disabled={sendingInterest}
                >
                    {sendingInterest ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                        <>
                            <Heart size={20} color="#ffffff" />
                            <Text style={styles.interestButtonText}>{t('profile.sendInterest')}</Text>
                        </>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.chatButton}
                    onPress={handleStartChat}
                >
                    <MessageCircle size={20} color="#ffffff" />
                    <Text style={styles.chatButtonText}>{t('profile.startChat')}</Text>
                </TouchableOpacity>
            </View>
        </CustomSafeAreaView>
    );
}


