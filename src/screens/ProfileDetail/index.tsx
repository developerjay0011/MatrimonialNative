import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { ArrowLeft, Heart, MessageCircle, MapPin, Briefcase } from "lucide-react-native";
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';
import { getUserProfile } from '../../redux/actions/profile';
import { sendInterest } from '../../redux/actions/interests';
import { createChat } from '../../redux/actions/chat';
import { showToast } from '../../utils/toast';
import { SkeletonProfileDetail } from '../../components/skeletons';
import { goBack } from '../../navigation/RootNavigation';
import { ImageCarousel } from '../../components/common/ImageCarousel';

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

    useEffect(() => { fetchProfile() }, [profileId]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await getUserProfile(profileId);
            if (response?.success && response?.data) {
                setProfile(response?.data);
            } else { throw new Error(response?.data?.message || 'Failed to load profile') }
        } catch (error: any) {
            goBack();
            showToast(error?.response?.data?.message || 'Failed to load profile', { type: 'error' });
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
            showToast(error?.response?.data?.message || 'Failed to send interest', { type: 'error' });
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


    if (loading || !profile) {
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

    return (
        <CustomSafeAreaView
            barColor="#f9fafb"
            barStyle="dark-content"
            edges={['top', 'right', 'bottom', 'left']}
            style={styles.container}
        >
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header Image Carousel */}
                <View style={styles.imageContainer}>
                    <ImageCarousel
                        height={380}
                        showIndicators={true}
                        enableFullScreen={true}
                        photos={profile?.photos || []}
                    />

                    <TouchableOpacity
                        onPress={onBack}
                        style={styles.backButton}
                    >
                        <ArrowLeft size={20} color="#374151" />
                    </TouchableOpacity>

                    {profile?.profile?.isProfileVerified && (
                        <View style={styles.verifiedTopBadge}>
                            <Text style={styles.verifiedTopText}>✓ {t('profile.verified')}</Text>
                        </View>
                    )}
                </View>

                {/* Profile Content */}
                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                        <View style={styles.headerSection}>
                            <View style={styles.nameContainer}>
                                <View style={styles.nameRow}>
                                    <Text style={styles.name}>
                                        {profile?.profile?.fullName}, {profile?.profile?.age}
                                    </Text>
                                    {profile?.profile?.isProfileVerified && (
                                        <View style={styles.verifiedBadge}>
                                            <Text style={styles.verifiedText}>✓</Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.infoRow}>
                                    <MapPin size={16} color="#6b7280" />
                                    <Text style={styles.infoText}>
                                        {profile?.profile?.currentCity}, {profile?.profile?.currentState}
                                    </Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Briefcase size={16} color="#6b7280" />
                                    <Text style={styles.infoText}>{profile?.profile?.occupation}</Text>
                                </View>
                            </View>
                            {profile?.status === 'active' && (
                                <View style={styles.statusBadge}>
                                    <View style={styles.statusDot} />
                                    <Text style={styles.statusText}>{t('profile.active')}</Text>
                                </View>
                            )}
                        </View>

                        {/* About Section */}
                        {profile?.profile?.aboutMe && (
                            <View style={styles.section}>
                                <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>{t('profile.about')}</Text>
                                <Text style={styles.bioText}>{profile?.profile?.aboutMe}</Text>
                            </View>
                        )}

                        {/* Basic Details */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('profile.basicDetails')}</Text>
                            <View style={styles.detailsGrid}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.age')}</Text>
                                    <Text style={styles.detailValue}>{profile?.profile?.age} years</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.height')}</Text>
                                    <Text style={styles.detailValue}>{profile?.profile?.height} cm</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.weight')}</Text>
                                    <Text style={styles.detailValue}>{profile?.profile?.weight} kg</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.maritalStatus')}</Text>
                                    <Text style={styles.detailValue}>
                                        {profile?.profile?.maritalStatus?.replace('_', ' ')}
                                    </Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.religion')}</Text>
                                    <Text style={styles.detailValue}>{profile?.profile?.religion}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.caste')}</Text>
                                    <Text style={styles.detailValue}>{profile?.profile?.caste}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.motherTongue')}</Text>
                                    <Text style={styles.detailValue}>{profile?.profile?.motherTongue}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>{t('profile.nativePlace')}</Text>
                                    <Text style={styles.detailValue}>{profile?.profile?.nativeCountry}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Professional Details */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('profile.professionalDetails')}</Text>
                            <View style={styles.detailsGrid}>
                                <View style={[styles.detailItem, { width: '100%' }]}>
                                    <Text style={styles.detailLabel}>{t('profile.education')}</Text>
                                    <Text style={styles.detailValue}>{profile?.profile?.education}</Text>
                                </View>
                                <View style={[styles.detailItem, { width: '100%' }]}>
                                    <Text style={styles.detailLabel}>{t('profile.occupation')}</Text>
                                    <Text style={styles.detailValue}>{profile?.profile?.occupation}</Text>
                                </View>
                                {profile?.profile?.workLocation && (
                                    <View style={[styles.detailItem, { width: '100%' }]}>
                                        <Text style={styles.detailLabel}>{t('profile.workLocation')}</Text>
                                        <Text style={styles.detailValue}>{profile?.profile?.workLocation}</Text>
                                    </View>
                                )}
                            </View>
                        </View>

                        {/* Family Details */}
                        {profile?.familyDetails && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>{t('profile.familyDetails')}</Text>
                                <View style={styles.detailsGrid}>
                                    <View style={[styles.detailItem, { width: '100%' }]}>
                                        <Text style={styles.detailLabel}>{t('profile.familyType')}</Text>
                                        <Text style={styles.detailValue}>
                                            {profile?.familyDetails?.familyType?.replace('_', ' ')}
                                        </Text>
                                    </View>
                                    <View style={[styles.detailItem, { width: '100%' }]}>
                                        <Text style={styles.detailLabel}>{t('profile.father')}</Text>
                                        <Text style={styles.detailValue}>
                                            {profile?.familyDetails?.fatherName} - {profile?.familyDetails?.fatherOccupation}
                                        </Text>
                                    </View>
                                    <View style={[styles.detailItem, { width: '100%' }]}>
                                        <Text style={styles.detailLabel}>{t('profile.mother')}</Text>
                                        <Text style={styles.detailValue}>
                                            {profile?.familyDetails?.motherName} - {profile?.familyDetails?.motherOccupation}
                                        </Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailLabel}>{t('profile.brothers')}</Text>
                                        <Text style={styles.detailValue}>
                                            {profile?.familyDetails?.brothers} ({profile?.familyDetails?.marriedBrothers} {t('profile.married')})
                                        </Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailLabel}>{t('profile.sisters')}</Text>
                                        <Text style={styles.detailValue}>
                                            {profile?.familyDetails?.sisters} ({profile?.familyDetails?.marriedSisters} {t('profile.married')})
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}

                        <View style={{ height: 100 }} />
                    </View>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
                {!profile?.hasInterestSent && (
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
                )}
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


