import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, StatusBar, ActivityIndicator } from "react-native";
import { Search, SlidersHorizontal, X, Heart, MapPin, Briefcase, GraduationCap } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { mockProfiles } from "../../data/mockProfiles";
import { styles } from './styles';
import { advancedSearch, quickSearch } from '../../redux/actions/search';
import { shortlistMatch } from '../../redux/actions/matches';
import { showToast } from '../../utils/toast';
import { SkeletonSearchList } from '../../components/skeletons';

interface SearchScreenProps {
    onBack: () => void;
    onViewProfile: (profileId: string) => void;
}

export function SearchScreen({ onViewProfile }: SearchScreenProps) {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [savedProfiles, setSavedProfiles] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);

    const [filters, setFilters] = useState({
        ageMin: "",
        ageMax: "",
        city: "",
        maritalStatus: "",
        diet: "",
        education: "",
        occupation: "",
    });

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (searchQuery.trim()) {
                handleQuickSearch();
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [searchQuery]);

    const handleQuickSearch = async () => {
        try {
            setSearching(true);
            const response = await quickSearch(searchQuery);
            if (response.success && response.data?.profiles) {
                setSearchResults(response.data.profiles);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            setSearchResults([]);
        } finally {
            setSearching(false);
        }
    };

    const handleAdvancedSearch = async () => {
        try {
            setLoading(true);
            const searchFilters: any = {};

            if (filters.ageMin) searchFilters.ageMin = parseInt(filters.ageMin);
            if (filters.ageMax) searchFilters.ageMax = parseInt(filters.ageMax);
            if (filters.city) searchFilters.location = [filters.city];
            if (filters.education) searchFilters.education = [filters.education];
            if (filters.occupation) searchFilters.occupation = filters.occupation;
            if (filters.maritalStatus) searchFilters.maritalStatus = [filters.maritalStatus];
            if (filters.diet) searchFilters.diet = filters.diet;

            const response = await advancedSearch(searchFilters);
            if (response.success && response.data?.profiles) {
                setSearchResults(response.data.profiles);
                setShowFilters(false);
                showToast(`Found ${response.data.profiles.length} profiles`, { type: 'success' });
            } else {
                setSearchResults([]);
                showToast('No profiles found', { type: 'info' });
            }
        } catch (error: any) {
            showToast(error?.message || 'Search failed', { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleToggleSave = async (profileId: string) => {
        const isSaved = savedProfiles.includes(profileId);

        if (!isSaved) {
            try {
                await shortlistMatch(profileId);
                setSavedProfiles(prev => [...prev, profileId]);
                showToast('Profile shortlisted', { type: 'success' });
            } catch (error) {
                showToast('Failed to shortlist', { type: 'error' });
            }
        } else {
            setSavedProfiles(prev => prev.filter(id => id !== profileId));
        }
    };

    const handleClearFilters = () => {
        setFilters({
            ageMin: "",
            ageMax: "",
            city: "",
            maritalStatus: "",
            diet: "",
            education: "",
            occupation: "",
        });
        setSearchResults([]);
    };

    const displayProfiles = searchResults.length > 0 ? searchResults : mockProfiles;

    const activeFilterCount = Object.values(filters).filter(v => v !== "").length;

    return (
        <CustomSafeAreaView
            barColor="#FFFFFF"
            barStyle="dark-content"
            style={styles.container}
            edges={['right', 'left']}
            headerComponent={(insets) => (
                <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
                    <Text style={styles.title}>{t('search.title')}</Text>

                    <View style={styles.searchRow}>
                        <View style={styles.searchContainer}>
                            <Search size={18} color="#9ca3af" style={styles.searchIcon} />
                            <TextInput
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                placeholder={t('search.placeholder')}
                                style={styles.searchInput}
                                placeholderTextColor="#9ca3af"
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setShowFilters(!showFilters)}
                            style={styles.filterButton}
                        >
                            <SlidersHorizontal size={18} color="#ffffff" />
                            {activeFilterCount > 0 && (
                                <View style={styles.filterBadge}>
                                    <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        >
            {/* Filter Panel */}
            {showFilters && (
                <View style={styles.filterPanel}>
                    <View style={styles.filterHeader}>
                        <Text style={styles.filterTitle}>{t('search.filters')}</Text>
                        <TouchableOpacity onPress={handleClearFilters}>
                            <Text style={styles.clearButton}>{t('search.clearFilters')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.filterContent}>
                        <TouchableOpacity
                            onPress={handleAdvancedSearch}
                            disabled={loading}
                            style={[styles.filterInput, { backgroundColor: '#f97316', marginBottom: 16, alignItems: 'center', justifyContent: 'center', height: 44 }]}
                        >
                            {loading ? (
                                <ActivityIndicator color="#ffffff" />
                            ) : (
                                <Text style={{ color: '#ffffff', fontWeight: '600' }}>Apply Filters</Text>
                            )}
                        </TouchableOpacity>

                        <Text style={styles.filterLabel}>{t('search.ageRange')}</Text>
                        <View style={styles.filterRow}>
                            <TextInput
                                placeholder={t('search.min')}
                                value={filters.ageMin}
                                onChangeText={(value) => setFilters({ ...filters, ageMin: value })}
                                keyboardType="number-pad"
                                style={styles.filterInput}
                                placeholderTextColor="#9ca3af"
                            />
                            <TextInput
                                placeholder={t('search.max')}
                                value={filters.ageMax}
                                onChangeText={(value) => setFilters({ ...filters, ageMax: value })}
                                keyboardType="number-pad"
                                style={styles.filterInput}
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        <Text style={styles.filterLabel}>{t('search.city')}</Text>
                        <TextInput
                            placeholder={t('search.enterCity')}
                            value={filters.city}
                            onChangeText={(value) => setFilters({ ...filters, city: value })}
                            style={[styles.filterInput, { flex: 1 }]}
                            placeholderTextColor="#9ca3af"
                        />

                        <Text style={styles.filterLabel}>{t('search.education')}</Text>
                        <TextInput
                            placeholder={t('search.educationPlaceholder')}
                            value={filters.education}
                            onChangeText={(value) => setFilters({ ...filters, education: value })}
                            style={[styles.filterInput, { flex: 1 }]}
                            placeholderTextColor="#9ca3af"
                        />

                        <Text style={styles.filterLabel}>{t('search.occupation')}</Text>
                        <TextInput
                            placeholder={t('search.occupationPlaceholder')}
                            value={filters.occupation}
                            onChangeText={(value) => setFilters({ ...filters, occupation: value })}
                            style={[styles.filterInput, { flex: 1 }]}
                            placeholderTextColor="#9ca3af"
                        />
                    </View>
                </View>
            )}

            {/* Results */}
            <View style={styles.resultsHeader}>
                <Text style={styles.resultsText}>
                    {searching ? 'Searching...' : `${displayProfiles.length} ${t('search.profilesFound')}`}
                </Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {loading || searching ? (
                    <SkeletonSearchList count={5} />
                ) : displayProfiles.length > 0 ? (
                    displayProfiles.map((profile) => (
                        <TouchableOpacity
                            key={profile.id}
                            style={styles.profileCard}
                            onPress={() => onViewProfile(profile.id)}
                        >
                            <Image source={{ uri: profile.profilePhoto || profile.photos?.[0]?.url }} style={styles.profileImage} />

                            <View style={styles.profileInfo}>
                                <View style={styles.profileHeader}>
                                    <View style={styles.profileNameRow}>
                                        <Text style={styles.profileName}>{profile.name || profile.fullName}, {profile.age}</Text>
                                        {profile.verified && (
                                            <View style={styles.verifiedBadge}>
                                                <Text style={styles.verifiedText}>✓</Text>
                                            </View>
                                        )}
                                    </View>
                                    <TouchableOpacity onPress={() => handleToggleSave(profile.id)}>
                                        <Heart
                                            size={22}
                                            color={savedProfiles.includes(profile.id) ? "#f97316" : "#d1d5db"}
                                            fill={savedProfiles.includes(profile.id) ? "#f97316" : "none"}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.profileDetail}>
                                    <MapPin size={14} color="#9ca3af" />
                                    <Text style={styles.profileDetailText}>{profile.city}</Text>
                                </View>

                                <View style={styles.profileDetail}>
                                    <GraduationCap size={14} color="#9ca3af" />
                                    <Text style={styles.profileDetailText}>{profile.education}</Text>
                                </View>

                                <View style={styles.profileDetail}>
                                    <Briefcase size={14} color="#9ca3af" />
                                    <Text style={styles.profileDetailText}>{profile.occupation}</Text>
                                </View>

                                <View style={styles.profileFooter}>
                                    {profile.online && (
                                        <View style={styles.onlineDot} />
                                    )}
                                    <View style={styles.profileTags}>
                                        <Text style={styles.heightTag}>{profile.height}</Text>
                                        <Text style={styles.dietTag}>{profile.diet}</Text>
                                    </View>
                                    <View style={styles.matchBadgeContainer}>
                                        <Text style={styles.matchText}>{profile.matchPercentage}% {t('profile.match')}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>{t('search.noResults')}</Text>
                    </View>
                )}
            </ScrollView>
        </CustomSafeAreaView >
    );
}


