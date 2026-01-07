import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, StatusBar } from "react-native";
import { Search, SlidersHorizontal, X, Heart, MapPin, Briefcase, GraduationCap } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { mockProfiles } from "../../data/mockProfiles";
import { styles } from './styles';

interface SearchScreenProps {
    onBack: () => void;
    onViewProfile: (profileId: string) => void;
}

export function SearchScreen({ onViewProfile }: SearchScreenProps) {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [savedProfiles, setSavedProfiles] = useState<string[]>([]);

    const [filters, setFilters] = useState({
        ageMin: "",
        ageMax: "",
        city: "",
        maritalStatus: "",
        diet: "",
        education: "",
        occupation: "",
    });

    const handleToggleSave = (profileId: string) => {
        setSavedProfiles(prev =>
            prev.includes(profileId)
                ? prev.filter(id => id !== profileId)
                : [...prev, profileId]
        );
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
    };

    const filteredProfiles = mockProfiles.filter(profile => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                profile.name.toLowerCase().includes(query) ||
                profile.city.toLowerCase().includes(query) ||
                profile.occupation.toLowerCase().includes(query);
            if (!matchesSearch) return false;
        }

        if (filters.ageMin && profile.age < parseInt(filters.ageMin)) return false;
        if (filters.ageMax && profile.age > parseInt(filters.ageMax)) return false;
        if (filters.city && !profile.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
        if (filters.education && !profile.education.toLowerCase().includes(filters.education.toLowerCase())) return false;
        if (filters.occupation && !profile.occupation.toLowerCase().includes(filters.occupation.toLowerCase())) return false;
        if (filters.maritalStatus && profile.maritalStatus !== filters.maritalStatus) return false;
        if (filters.diet && profile.diet !== filters.diet) return false;

        return true;
    });

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
                <Text style={styles.resultsText}>{filteredProfiles.length} {t('search.profilesFound')}</Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {filteredProfiles.length > 0 ? (
                    filteredProfiles.map((profile) => (
                        <TouchableOpacity
                            key={profile.id}
                            style={styles.profileCard}
                            onPress={() => onViewProfile(profile.id)}
                        >
                            <Image source={{ uri: profile.profilePhoto }} style={styles.profileImage} />

                            <View style={styles.profileInfo}>
                                <View style={styles.profileHeader}>
                                    <View style={styles.profileNameRow}>
                                        <Text style={styles.profileName}>{profile.name}, {profile.age}</Text>
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


