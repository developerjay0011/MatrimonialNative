import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, FlatList } from "react-native";
import { Search, SlidersHorizontal, Heart, MapPin, Briefcase, GraduationCap } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';
import { advancedSearch } from '../../redux/actions/search';
import { showToast } from '../../utils/toast';
import { SkeletonSearchList } from '../../components/skeletons';
import { FilterModal } from '../../components/common/FilterModal';
import { sendInterest } from "../../redux/actions";

const PAGE_SIZE = 20;

interface SearchScreenProps {
    onBack: () => void;
    onViewProfile: (profileId: string) => void;
}

export function SearchScreen({ onViewProfile }: SearchScreenProps) {
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [appliedFilters, setAppliedFilters] = useState<any>({
        ageMin: "18",
        ageMax: "50",
        maritalStatus: ["never_married"],
    });

    const appliedFiltersNumber = useMemo(() => {
        var filers = []
        if (appliedFilters?.ageMin) filers.push('ageMin')
        if (appliedFilters?.ageMax) filers.push('ageMax')
        if (appliedFilters?.heightMin) filers.push('heightMin')
        if (appliedFilters?.heightMax) filers.push('heightMax')
        if (Array.isArray(appliedFilters?.maritalStatus) && appliedFilters?.maritalStatus?.length > 0) filers.push('maritalStatus')
        if (Array.isArray(appliedFilters?.education) && appliedFilters?.education?.length > 0) filers.push('education')
        if (Array.isArray(appliedFilters?.location) && appliedFilters?.location?.length > 0) filers.push('location')
        return filers.length
    }, [appliedFilters])

    const filterListByQuery = useMemo(() => {
        let listData = Array.isArray(searchResults) ? [...searchResults] : []
        if (searchQuery) {
            listData = listData.filter((item: any) => item?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        return listData
    }, [searchQuery, searchResults])

    const fetchAdvancedResults = async ({ page: pageToLoad = 1, filtersOverride }: { page?: number; filtersOverride?: any } = {}) => {
        const filtersToUse = filtersOverride
        const isInitialLoad = pageToLoad === 1;

        if (isInitialLoad) {
            setLoading(true);
            setHasMore(true);
            if (filtersOverride) { setSearchResults([]) }
        } else {
            setIsFetchingMore(true);
        }

        try {
            const response = await advancedSearch({ ...filtersToUse, page: pageToLoad, limit: PAGE_SIZE });
            if (!response?.success) {
                throw new Error(response?.message || 'Search failed');
            }

            const profiles = response?.data?.users || [];
            setSearchResults(prev => (isInitialLoad ? profiles : [...prev, ...profiles]));
            setPage(pageToLoad);

            const moreAvailable = response?.data?.pagination?.totalPages > pageToLoad;
            setHasMore(moreAvailable);

            if (isInitialLoad) { if (profiles.length === 0) { showToast(t('search.noResults'), { type: 'info' }) } }
        } catch (error: any) {
            setHasMore(false);
            if (isInitialLoad) { setSearchResults([]) }
            showToast(error?.response?.data?.message || t('search.searchFailed'), { type: 'error' });
        } finally {
            if (isInitialLoad) {
                setLoading(false);
            } else {
                setIsFetchingMore(false);
            }
        }
    }


    const handleApplyFilters = (filters: any) => {
        setHasMore(true);
        setShowFilterModal(false);
        setAppliedFilters(filters);
        fetchAdvancedResults({ page: 1, filtersOverride: filters });
    };

    const handleToggleSave = async (profileId: string) => {
        try {
            const response = await sendInterest(profileId, 'Interested in connecting with you!');
            if (response.success) {
                fetchAdvancedResults({ page: page, filtersOverride: appliedFilters });
                showToast(t('interests.sentSuccess'), { type: 'success' });
            }
        } catch (error: any) {
            showToast(error?.response?.data?.message || t('interests.sendFailed'), { type: 'error' });
        }
    }

    const handleLoadMore = () => {
        if (loading || isFetchingMore || !hasMore) return;
        fetchAdvancedResults({ page: page + 1, filtersOverride: appliedFilters });
    };

    const renderProfile = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.profileCard}
            onPress={() => onViewProfile(item.id)}
        >
            <Image
                source={{ uri: item.profilePhoto || item.photos?.find((p: any) => p.isProfilePhoto)?.url || item.photos?.[0]?.url }}
                style={styles.profileImage}
            />

            <View style={styles.profileInfo}>
                <View style={styles.profileHeader}>
                    <View style={styles.profileNameRow}>
                        <Text style={styles.profileName}>{item.name || item.profile?.fullName}, {item.age || item.profile?.age}</Text>
                        {(item.verified || item.profile?.isProfileVerified) && (
                            <View style={styles.verifiedBadge}>
                                <Text style={styles.verifiedText}>✓</Text>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity disabled={item?.hasInterestSent} onPress={() => handleToggleSave(item.id)}>
                        <Heart
                            size={22}
                            color={item?.hasInterestSent ? "#f97316" : "#d1d5db"}
                            fill={item?.hasInterestSent ? "#f97316" : "none"}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.profileDetail}>
                    <MapPin size={14} color="#9ca3af" />
                    <Text style={styles.profileDetailText}>{item?.profile?.currentCity}, {item.profile?.currentState}</Text>
                </View>

                <View style={styles.profileDetail}>
                    <GraduationCap size={14} color="#9ca3af" />
                    <Text style={styles.profileDetailText}>{item.profile?.education}</Text>
                </View>

                <View style={styles.profileDetail}>
                    <Briefcase size={14} color="#9ca3af" />
                    <Text style={styles.profileDetailText}>{item?.profile?.occupation}</Text>
                </View>

                <View style={styles.profileFooter}>
                    {(item.online || item.profile?.isOnline) && (<View style={styles.onlineDot} />)}
                    <View style={styles.profileTags}>
                        <Text style={styles.heightTag}>{item.profile?.height} cm</Text>
                    </View>
                    <View style={styles.profileTags}>
                        <Text style={styles.heightTag}>{item.profile?.weight} kg</Text>
                    </View>
                    {item?.matchScore && (
                        <View style={styles.matchBadgeContainer}>
                            <Text style={styles.matchText}>{item?.matchScore}% {t('profile.match')}</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )

    const renderListFooter = () => {
        if (isFetchingMore) {
            return (
                <View style={styles.listFooter}>
                    <ActivityIndicator size="small" color="#f97316" />
                </View>
            );
        }
        if (!hasMore && searchResults.length > 0) {
            return (
                <View style={styles.listFooter}>
                    <Text style={styles.listFooterText}>{t('search.noMoreResults') || 'No more profiles'}</Text>
                </View>
            );
        }
        return null;
    };

    const emptyComponent = !loading ? (
        <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{t('search.noResults')}</Text>
        </View>
    ) : null;

    useEffect(() => { fetchAdvancedResults({ page: 1, filtersOverride: appliedFilters }); }, []);

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
                                placeholder={t('search.name')}
                                style={styles.searchInput}
                                placeholderTextColor="#9ca3af"
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setShowFilterModal(true)}
                            style={styles.filterButton}
                        >
                            <SlidersHorizontal size={18} color="#ffffff" />
                            {appliedFiltersNumber > 0 && (
                                <View style={styles.filterBadge}>
                                    <Text style={styles.filterBadgeText}>{appliedFiltersNumber}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        >
            <FilterModal
                visible={showFilterModal}
                onClose={() => setShowFilterModal(false)}
                onApply={handleApplyFilters}
                initialFilters={appliedFilters}
            />


            <View style={styles.resultsHeader}>
                <Text style={styles.resultsText}>
                    {`${filterListByQuery?.length || 0} ${t('search.profilesFound')}`}
                </Text>
            </View>

            {loading ? (
                <SkeletonSearchList count={5} />
            ) : (
                <FlatList
                    data={filterListByQuery}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderProfile}
                    contentContainerStyle={styles.scrollContent}
                    ListEmptyComponent={emptyComponent}
                    ListFooterComponent={renderListFooter}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.4}
                    refreshing={loading}
                />
            )}
        </CustomSafeAreaView>
    );
}
