import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { X, ChevronDown } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { getFilterOptions } from '../../redux/actions/search';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: any) => void;
    initialFilters?: any;
}

interface FilterOptions {
    maritalStatus: string[];
    religions: string[];
    castes: string[];
    motherTongues: string[];
    educations: string[];
    occupations: string[];
    cities: string[];
    states: string[];
    complexions: string[];
    heights: { min: number; max: number; step: number };
    ages: { min: number; max: number; step: number };
}

export function FilterModal({ visible, onClose, onApply, initialFilters }: FilterModalProps) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
    const [filters, setFilters] = useState({
        ageMin: '',
        ageMax: '',
        heightMin: '',
        heightMax: '',
        // weightMin: '',
        // weightMax: '',
        maritalStatus: [] as string[],
        education: [] as string[],
        location: [] as string[],

        // occupation: [] as string[],
        // religion: [] as string[],
        // caste: [] as string[],
        // motherTongue: [] as string[],
        // complexion: [] as string[],
    });
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (visible) {
            fetchFilterOptions();
            if (initialFilters) {
                setFilters({
                    ageMin: initialFilters?.ageMin || '',
                    ageMax: initialFilters?.ageMax || '',
                    heightMin: initialFilters?.heightMin || '',
                    heightMax: initialFilters?.heightMax || '',
                    maritalStatus: initialFilters?.maritalStatus || [],
                    education: initialFilters?.education || [],
                    location: initialFilters?.location || [],
                });
            }
        }
    }, [visible]);

    const fetchFilterOptions = async () => {
        try {
            setLoading(true);
            const response = await getFilterOptions();
            if (response.success && response.data) {
                setFilterOptions(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch filter options:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const toggleArrayFilter = (key: keyof typeof filters, value: string) => {
        const currentArray = filters[key] as string[];
        if (currentArray?.includes(value)) {
            setFilters({
                ...filters,
                [key]: currentArray.filter(item => item !== value),
            });
        } else {
            setFilters({
                ...filters,
                [key]: [...currentArray, value],
            });
        }
    };

    const handleClear = () => {
        setFilters({
            ageMin: '',
            ageMax: '',
            heightMin: '',
            heightMax: '',
            maritalStatus: [],
            education: [],
            location: [],
            // weightMin: '',
            // weightMax: '',
            // occupation: [],
            // religion: [],
            // caste: [],
            // motherTongue: [],
            // complexion: [],
        });
        onApply({ ...filters });
    };

    const handleApply = () => {
        onApply({ ...filters, page: 1, limit: 20 });
        onClose();
    };

    const renderMultiSelect = (
        title: string,
        key: keyof typeof filters,
        options: string[] | undefined
    ) => {
        if (!options || options.length === 0) return null;
        const isExpanded = expandedSections[key];
        const selectedValues = filters[key] || [] as string[];

        return (
            <View style={styles.filterSection}>
                <TouchableOpacity
                    style={styles.sectionHeader}
                    onPress={() => toggleSection(key)}
                >
                    <Text style={styles.sectionTitle}>
                        {title} {selectedValues?.length > 0 && `(${selectedValues?.length})`}
                    </Text>
                    <ChevronDown
                        size={20}
                        color="#6b7280"
                        style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}
                    />
                </TouchableOpacity>
                {isExpanded && (
                    <View style={styles.optionsContainer}>
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.optionChip,
                                    selectedValues.includes(option) && styles.optionChipSelected,
                                ]}
                                onPress={() => toggleArrayFilter(key, option)}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        selectedValues.includes(option) && styles.optionTextSelected,
                                    ]}
                                >
                                    {option.replace(/_/g, ' ')}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{t('search.filters')}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color="#111827" />
                        </TouchableOpacity>
                    </View>

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#f97316" />
                        </View>
                    ) : (
                        <>
                            <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
                                {/* Age Range */}
                                <View style={styles.filterSection}>
                                    <Text style={styles.sectionTitle}>{t('search.ageRange')}</Text>
                                    <View style={styles.rangeInputRow}>
                                        <View style={styles.rangeInputContainer}>
                                            <Text style={styles.rangeLabel}>{t('common.min')}</Text>
                                            <TextInput
                                                value={filters.ageMin}
                                                onChangeText={(value) => setFilters({ ...filters, ageMin: value })}
                                                placeholder={filterOptions?.ages?.min.toString() || '18'}
                                                keyboardType="number-pad"
                                                style={styles.rangeInput}
                                                placeholderTextColor="#9ca3af"
                                            />
                                        </View>
                                        <Text style={styles.rangeSeparator}>-</Text>
                                        <View style={styles.rangeInputContainer}>
                                            <Text style={styles.rangeLabel}>{t('common.max')}</Text>
                                            <TextInput
                                                value={filters.ageMax}
                                                onChangeText={(value) => setFilters({ ...filters, ageMax: value })}
                                                placeholder={filterOptions?.ages?.max.toString() || '60'}
                                                keyboardType="number-pad"
                                                style={styles.rangeInput}
                                                placeholderTextColor="#9ca3af"
                                            />
                                        </View>
                                    </View>
                                </View>

                                {/* Height Range */}
                                <View style={styles.filterSection}>
                                    <Text style={styles.sectionTitle}>{t('filterModal.heightCm')}</Text>
                                    <View style={styles.rangeInputRow}>
                                        <View style={styles.rangeInputContainer}>
                                            <Text style={styles.rangeLabel}>{t('common.min')}</Text>
                                            <TextInput
                                                value={filters.heightMin}
                                                onChangeText={(value) => setFilters({ ...filters, heightMin: value })}
                                                placeholder={filterOptions?.heights?.min.toString() || '140'}
                                                keyboardType="number-pad"
                                                style={styles.rangeInput}
                                                placeholderTextColor="#9ca3af"
                                            />
                                        </View>
                                        <Text style={styles.rangeSeparator}>-</Text>
                                        <View style={styles.rangeInputContainer}>
                                            <Text style={styles.rangeLabel}>{t('common.max')}</Text>
                                            <TextInput
                                                value={filters.heightMax}
                                                onChangeText={(value) => setFilters({ ...filters, heightMax: value })}
                                                placeholder={filterOptions?.heights?.max.toString() || '200'}
                                                keyboardType="number-pad"
                                                style={styles.rangeInput}
                                                placeholderTextColor="#9ca3af"
                                            />
                                        </View>
                                    </View>
                                </View>

                                {/* Weight Range */}
                                {/* <View style={styles.filterSection}>
                                    <Text style={styles.sectionTitle}>Weight (kg)</Text>
                                    <View style={styles.rangeInputRow}>
                                        <View style={styles.rangeInputContainer}>
                                            <Text style={styles.rangeLabel}>Min</Text>
                                            <TextInput
                                                value={filters.weightMin}
                                                onChangeText={(value) => setFilters({ ...filters, weightMin: value })}
                                                placeholder="40"
                                                keyboardType="number-pad"
                                                style={styles.rangeInput}
                                                placeholderTextColor="#9ca3af"
                                            />
                                        </View>
                                        <Text style={styles.rangeSeparator}>-</Text>
                                        <View style={styles.rangeInputContainer}>
                                            <Text style={styles.rangeLabel}>Max</Text>
                                            <TextInput
                                                value={filters.weightMax}
                                                onChangeText={(value) => setFilters({ ...filters, weightMax: value })}
                                                placeholder="120"
                                                keyboardType="number-pad"
                                                style={styles.rangeInput}
                                                placeholderTextColor="#9ca3af"
                                            />
                                        </View>
                                    </View>
                                </View> */}

                                {/* Multi-select filters */}
                                {renderMultiSelect(t('profile.maritalStatus'), 'maritalStatus', filterOptions?.maritalStatus)}
                                {renderMultiSelect(t('profile.education'), 'education', filterOptions?.educations)}
                                {/* {renderMultiSelect('Occupation', 'occupation', filterOptions?.occupations)} */}
                                {renderMultiSelect(t('search.location'), 'location', filterOptions?.cities)}
                                {/* {renderMultiSelect('Religion', 'religion', filterOptions?.religions)} */}
                                {/* {renderMultiSelect('Caste', 'caste', filterOptions?.castes)} */}
                                {/* {renderMultiSelect('Mother Tongue', 'motherTongue', filterOptions?.motherTongues)} */}
                                {/* {renderMultiSelect('Complexion', 'complexion', filterOptions?.complexions)} */}
                            </ScrollView>

                            <View style={styles.modalFooter}>
                                <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                                    <Text style={styles.clearButtonText}>{t('search.clearFilters')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                                    <Text style={styles.applyButtonText}>{t('search.applyFilters')}</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '95%',
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    closeButton: {
        padding: 4,
    },
    loadingContainer: {
        padding: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    filterSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    rangeInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    rangeInputContainer: {
        flex: 1,
    },
    rangeLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6b7280',
        marginBottom: 6,
    },
    rangeInput: {
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        color: '#111827',
    },
    rangeSeparator: {
        fontSize: 18,
        fontWeight: '600',
        color: '#9ca3af',
        marginTop: 20,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 0,
    },
    optionChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    optionChipSelected: {
        backgroundColor: '#fef3f2',
        borderColor: '#f97316',
    },
    optionText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
        textTransform: 'capitalize',
    },
    optionTextSelected: {
        color: '#f97316',
        fontWeight: '600',
    },
    modalFooter: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#a5a6a8ff',
    },
    clearButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        alignItems: 'center',
    },
    clearButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#6b7280',
    },
    applyButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: '#f97316',
        alignItems: 'center',
    },
    applyButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#ffffff',
    },
});
