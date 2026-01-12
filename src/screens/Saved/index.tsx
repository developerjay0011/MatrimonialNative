import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, RefreshControl } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { X, MapPin, GraduationCap, Briefcase, DollarSign, Heart, Inbox, MessageCircle } from 'lucide-react-native';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';
import { getSentInterests, getReceivedInterests } from '../../redux/actions/interests';
import { SkeletonProfileCard } from '../../components/skeletons';

interface ShortlistedScreenProps {
    onViewProfile: (profileId: string) => void;
}

export function ShortlistedScreen({ onViewProfile }: ShortlistedScreenProps) {
    const { t } = useTranslation();
    const isFocused = useIsFocused();
    const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');
    const [sentInterests, setSentInterests] = useState<any[]>([]);
    const [receivedInterests, setReceivedInterests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (isFocused) { fetchInterests() }
    }, [isFocused]);

    const fetchInterests = async () => {
        try {
            setLoading(true);
            const [sentResponse, receivedResponse] = await Promise.all([
                getSentInterests(),
                getReceivedInterests()
            ]);

            if (sentResponse?.success && sentResponse?.data?.interests) {
                setSentInterests(sentResponse.data.interests);
            }
            if (receivedResponse?.success && receivedResponse?.data?.interests) {
                setReceivedInterests(receivedResponse.data.interests);
            }
        } catch (error) {
            setSentInterests([]);
            setReceivedInterests([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchInterests();
    };

    const displayProfiles = activeTab === 'sent' ? sentInterests : receivedInterests;

    return (
        <CustomSafeAreaView
            barColor="#f97316"
            barStyle="light-content"
            style={styles.container}
            edges={['right', 'left']}
            headerComponent={(insets) => (
                <LinearGradient
                    colors={['#f97316', '#ea580c']}
                    style={[styles.header, { paddingTop: insets.top + 15 }]}
                >
                    <Text style={styles.title}>{t('interests.title')}</Text>

                    {/* Tabs */}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'sent' && styles.activeTab]}
                            onPress={() => setActiveTab('sent')}
                        >
                            <Text style={[styles.tabText, activeTab === 'sent' && styles.activeTabText]}>{t('interests.sent')} ({sentInterests.length})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'received' && styles.activeTab]}
                            onPress={() => setActiveTab('received')}
                        >
                            <Text style={[styles.tabText, activeTab === 'received' && styles.activeTabText]}>{t('interests.received')} ({receivedInterests.length})</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            )}
        >
            {/* Profile Cards */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#f97316"
                    />
                }
            >
                {loading ? (
                    <>
                        <SkeletonProfileCard />
                        <SkeletonProfileCard />
                        <SkeletonProfileCard />
                    </>
                ) : displayProfiles.length === 0 ? (
                    <View style={styles.emptyStateContainer}>
                        <View style={styles.emptyIconContainer}>
                            {activeTab === 'sent' ? (
                                <Heart size={64} color="#fed7aa" strokeWidth={1.5} />
                            ) : (
                                <Inbox size={64} color="#fed7aa" strokeWidth={1.5} />
                            )}
                        </View>
                        <Text style={styles.emptyTitle}>
                            {activeTab === 'sent' ? t('interests.noSentTitle') : t('interests.noReceivedTitle')}
                        </Text>
                        <Text style={styles.emptyMessage}>
                            {activeTab === 'sent' ? t('interests.noSentMessage') : t('interests.noReceivedMessage')}
                        </Text>
                    </View>
                ) : (
                    displayProfiles.map((detail) => (
                        <View key={detail.id} style={styles.profileCard}>
                            <View style={styles.profileImageContainer}>

                                <Image
                                    source={{ uri: detail?.photos?.find((photo: any) => photo.isProfilePhoto)?.url || detail?.photos?.[0]?.url }}
                                    style={styles.profileImage}
                                />

                                {detail?.profile?.isProfileVerified && (
                                    <View style={styles.verifiedBadge}>
                                        <Text style={styles.verifiedText}>✓ {t('profile.verified')}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.profileInfo}>
                                <View style={styles.profileHeader}>
                                    <Text style={styles.profileName}>{detail.profile.fullName}, {detail?.profile.age}</Text>
                                    {detail?.profile?.isOnline &&
                                        <View style={styles.onlineBadge}>
                                            <View style={styles.onlineDot} />
                                            <Text style={styles.onlineText}>{t('profile.online')}</Text>
                                        </View>
                                    }
                                </View>

                                <View style={styles.profileDetail}>
                                    <MapPin size={14} color="#6b7280" />
                                    <Text style={styles.profileDetailText}>{detail?.profile?.currentCity}, {detail?.profile?.currentState}</Text>
                                </View>

                                <View style={styles.profileDetail}>
                                    <GraduationCap size={14} color="#6b7280" />
                                    <Text style={styles.profileDetailText}>{detail?.profile?.education}</Text>
                                </View>

                                <View style={styles.profileDetail}>
                                    <Briefcase size={14} color="#6b7280" />
                                    <Text style={styles.profileDetailText}>{detail?.profile?.occupation}</Text>
                                </View>

                                <View style={styles.profileTags}>
                                    <View style={styles.tag}>
                                        <Text style={styles.tagText}>{detail?.profile?.height} cm</Text>
                                    </View>
                                    <View style={styles.tag}>
                                        <Text style={styles.tagText}>{detail?.profile?.weight} kg</Text>
                                    </View>
                                    <View style={styles.tag}>
                                        <Text style={[styles.tagText, { textTransform: 'capitalize' }]}>{detail?.profile?.maritalStatus?.replace('_', ' ')}</Text>
                                    </View>
                                </View>

                                <Text style={styles.profileBio} numberOfLines={3}>
                                    {detail?.profile?.aboutMe}
                                </Text>

                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={styles.viewProfileButton}
                                        onPress={() => onViewProfile(detail.id)}
                                    >
                                        <Text style={styles.viewProfileText}>{t('interests.viewProfile')}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.messageButton, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                                        <MessageCircle size={20} color="#ffffff" />
                                        <Text style={styles.messageButtonText}> {t('interests.message')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </CustomSafeAreaView>
    );
}


