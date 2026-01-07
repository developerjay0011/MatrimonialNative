import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { X, MapPin, GraduationCap, Briefcase, DollarSign } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { mockProfiles } from '../../data/mockProfiles';
import { styles } from './styles';

interface ShortlistedScreenProps {
    onBack: () => void;
    onViewProfile: (profileId: string) => void;
}

export function ShortlistedScreen({ onViewProfile }: ShortlistedScreenProps) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'saved' | 'interested'>('saved');

    // Mock saved profiles
    const savedProfiles = mockProfiles.slice(0, 3);
    const interestedProfiles = mockProfiles.slice(3, 5);

    const displayProfiles = activeTab === 'saved' ? savedProfiles : interestedProfiles;

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
                    <Text style={styles.title}>{t('saved.title')}</Text>

                    {/* Tabs */}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
                            onPress={() => setActiveTab('saved')}
                        >
                            <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>{t('saved.saved')} ({savedProfiles.length})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'interested' && styles.activeTab]}
                            onPress={() => setActiveTab('interested')}
                        >
                            <Text style={[styles.tabText, activeTab === 'interested' && styles.activeTabText]}>{t('saved.interested')} ({interestedProfiles.length})</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            )}
        >
            {/* Profile Cards */}
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {displayProfiles.map((profile) => (
                    <View key={profile.id} style={styles.profileCard}>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => { }}
                        >
                            <X size={20} color="#6b7280" />
                        </TouchableOpacity>

                        <View style={styles.profileImageContainer}>

                            <Image source={{ uri: profile.profilePhoto }} style={styles.profileImage} />

                            {profile.verified && (
                                <View style={styles.verifiedBadge}>
                                    <Text style={styles.verifiedText}>✓ Verified</Text>
                                </View>
                            )}

                            <View style={styles.matchBadge}>
                                <Text style={styles.matchText}>{profile.matchPercentage}% Match</Text>
                            </View>

                        </View>
                        <View style={styles.profileInfo}>
                            <View style={styles.profileHeader}>
                                <Text style={styles.profileName}>{profile.name}, {profile.age}</Text>
                                {profile.online &&
                                    <View style={styles.onlineBadge}>
                                        <View style={styles.onlineDot} />
                                        <Text style={styles.onlineText}>Online</Text>
                                    </View>
                                }
                            </View>

                            <View style={styles.profileDetail}>
                                <MapPin size={14} color="#6b7280" />
                                <Text style={styles.profileDetailText}>{profile.city}, Gujarat</Text>
                            </View>

                            <View style={styles.profileDetail}>
                                <GraduationCap size={14} color="#6b7280" />
                                <Text style={styles.profileDetailText}>{profile.education}</Text>
                            </View>

                            <View style={styles.profileDetail}>
                                <Briefcase size={14} color="#6b7280" />
                                <Text style={styles.profileDetailText}>{profile.occupation} • {profile.income}</Text>
                            </View>

                            <View style={styles.profileTags}>
                                <View style={styles.tag}>
                                    <Text style={styles.tagText}>{profile.height}</Text>
                                </View>
                                <View style={styles.tag}>
                                    <Text style={styles.tagText}>{profile.diet}</Text>
                                </View>
                                <View style={styles.tag}>
                                    <Text style={styles.tagText}>{profile.maritalStatus}</Text>
                                </View>
                            </View>

                            <Text style={styles.profileBio} numberOfLines={2}>
                                {profile.bio}
                            </Text>

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={styles.viewProfileButton}
                                    onPress={() => onViewProfile(profile.id)}
                                >
                                    <Text style={styles.viewProfileText}>View Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.messageButton}>
                                    <Text style={styles.messageButtonText}>💬 Message</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </CustomSafeAreaView>
    );
}


