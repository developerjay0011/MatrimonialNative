import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';
import { getMyProfile, updateFamilyDetails } from '../../redux/actions/profile';
import { showToast } from '../../utils/toast';
import { useIsFocused } from '@react-navigation/native';
import { FormInput } from '../../components/common/FormInput';
import { DropdownPickerInput } from '../../components/common/DropdownPickerInput';
import { FormSkeleton } from '../../components/skeletons/FormSkeleton';
import { useAppDispatch } from '../../redux/hooks';

interface FamilyInfoScreenProps {
    onBack: () => void;
}

const FAMILY_TYPE_OPTIONS = [
    { label: 'Nuclear Family', value: 'nuclear' },
    { label: 'Joint Family', value: 'joint' },
];

export function FamilyInfoScreen({ onBack }: FamilyInfoScreenProps) {
    const { t } = useTranslation();
    const isFocused = useIsFocused();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        fatherName: '',
        motherName: '',
        fatherOccupation: '',
        motherOccupation: '',
        brothers: '',
        sisters: '',
        familyType: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    useEffect(() => {
        if (isFocused) { fetchFamilyInfo() }
    }, [isFocused]);

    const fetchFamilyInfo = async () => {
        setLoading(true);
        dispatch(
            getMyProfile((response: any) => {
                setLoading(false);
                if (response?.success && response?.data?.familyDetails) {
                    const family = response.data.familyDetails;
                    setFormData({
                        fatherName: family.fatherName || '',
                        motherName: family.motherName || '',
                        fatherOccupation: family.fatherOccupation || '',
                        motherOccupation: family.motherOccupation || '',
                        brothers: family.brothers?.toString() || '',
                        sisters: family.sisters?.toString() || '',
                        familyType: family.familyType || '',
                    });
                }
            })
        );
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.fatherName.trim()) {
            newErrors.fatherName = "Father's name is required";
        } else if (formData.fatherName.trim().length < 2) {
            newErrors.fatherName = "Father's name must be at least 2 characters";
        }

        if (!formData.motherName.trim()) {
            newErrors.motherName = "Mother's name is required";
        } else if (formData.motherName.trim().length < 2) {
            newErrors.motherName = "Mother's name must be at least 2 characters";
        }

        if (!formData.fatherOccupation.trim()) {
            newErrors.fatherOccupation = "Father's occupation is required";
        }

        if (!formData.motherOccupation.trim()) {
            newErrors.motherOccupation = "Mother's occupation is required";
        }

        if (!formData.brothers.trim()) {
            newErrors.brothers = 'Number of brothers is required';
        } else if (parseInt(formData.brothers) < 0 || parseInt(formData.brothers) > 20) {
            newErrors.brothers = 'Please enter a valid number (0-20)';
        }

        if (!formData.sisters.trim()) {
            newErrors.sisters = 'Number of sisters is required';
        } else if (parseInt(formData.sisters) < 0 || parseInt(formData.sisters) > 20) {
            newErrors.sisters = 'Please enter a valid number (0-20)';
        }

        if (!formData.familyType) {
            newErrors.familyType = 'Family type is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            showToast('Please fix the errors before saving', { type: 'error' });
            return;
        }

        try {
            setSaving(true);
            const familyData = {
                fatherName: formData.fatherName.trim(),
                motherName: formData.motherName.trim(),
                fatherOccupation: formData.fatherOccupation.trim(),
                motherOccupation: formData.motherOccupation.trim(),
                brothers: formData.brothers ? parseInt(formData.brothers.trim()) : 0,
                sisters: formData.sisters ? parseInt(formData.sisters.trim()) : 0,
                familyType: formData.familyType.trim(),
            };

            const response = await updateFamilyDetails(familyData);
            if (response.success) {
                showToast('Family information updated successfully!', { type: 'success' });
                onBack();
            } else {
                showToast(response.message || 'Failed to update family information', { type: 'error' });
            }
        } catch (error: any) {
            showToast(error?.message || 'Failed to update family information', { type: 'error' });
        } finally {
            setSaving(false);
        }
    };

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
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <ArrowLeft size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Family Information</Text>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSave}
                        disabled={saving}
                    >
                        {saving ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                            <Text style={styles.saveButtonText}>Save</Text>
                        )}
                    </TouchableOpacity>
                </LinearGradient>
            )}
        >
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <FormSkeleton sections={2} fieldsPerSection={4} />
                ) : (
                    <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                        {/* Parents Information */}
                        <FormInput
                            label="Father's Name"
                            value={formData.fatherName}
                            onChangeText={(text) => updateField('fatherName', text)}
                            placeholder="Enter father's name"
                            error={errors.fatherName}
                        />

                        <FormInput
                            label="Father's Occupation"
                            value={formData.fatherOccupation}
                            onChangeText={(text) => updateField('fatherOccupation', text)}
                            placeholder="e.g., Business, Service, Retired"
                            error={errors.fatherOccupation}
                        />

                        <FormInput
                            label="Mother's Name"
                            value={formData.motherName}
                            onChangeText={(text) => updateField('motherName', text)}
                            placeholder="Enter mother's name"
                            error={errors.motherName}
                        />

                        <FormInput
                            label="Mother's Occupation"
                            value={formData.motherOccupation}
                            onChangeText={(text) => updateField('motherOccupation', text)}
                            placeholder="e.g., Housewife, Service, Business"
                            error={errors.motherOccupation}
                        />

                        <View style={styles.row}>
                            <View style={styles.halfWidth}>
                                <FormInput
                                    label="Brothers"
                                    value={formData.brothers}
                                    onChangeText={(text) => updateField('brothers', text.replace(/\D/g, ''))}
                                    placeholder="0"
                                    keyboardType="number-pad"
                                    error={errors.brothers}
                                />
                            </View>
                            <View style={styles.halfWidth}>
                                <FormInput
                                    label="Sisters"
                                    value={formData.sisters}
                                    onChangeText={(text) => updateField('sisters', text.replace(/\D/g, ''))}
                                    placeholder="0"
                                    keyboardType="number-pad"
                                    error={errors.sisters}
                                />
                            </View>
                        </View>

                        <DropdownPickerInput
                            label="Family Type"
                            value={formData.familyType}
                            onChange={(value) => updateField('familyType', value)}
                            placeholder="Select family type"
                            options={FAMILY_TYPE_OPTIONS}
                            error={errors.familyType}
                        />

                        <View style={{ height: 40 }} />
                    </View>
                )}
            </ScrollView>
        </CustomSafeAreaView>
    );
}
