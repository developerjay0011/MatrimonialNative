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

export function FamilyInfoScreen({ onBack }: FamilyInfoScreenProps) {
    const { t } = useTranslation();
    const isFocused = useIsFocused();
    const dispatch = useAppDispatch();
    const FAMILY_TYPE_OPTIONS = [
        { label: t('familyInfo.nuclearFamily'), value: 'nuclear' },
        { label: t('familyInfo.jointFamily'), value: 'joint' },
    ];
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
            newErrors.fatherName = t('familyInfo.errors.fatherNameRequired');
        } else if (formData.fatherName.trim().length < 2) {
            newErrors.fatherName = t('familyInfo.errors.fatherNameMin');
        }

        if (!formData.motherName.trim()) {
            newErrors.motherName = t('familyInfo.errors.motherNameRequired');
        } else if (formData.motherName.trim().length < 2) {
            newErrors.motherName = t('familyInfo.errors.motherNameMin');
        }

        if (!formData.fatherOccupation.trim()) {
            newErrors.fatherOccupation = t('familyInfo.errors.fatherOccupationRequired');
        }

        if (!formData.motherOccupation.trim()) {
            newErrors.motherOccupation = t('familyInfo.errors.motherOccupationRequired');
        }

        if (!formData.brothers.trim()) {
            newErrors.brothers = t('familyInfo.errors.brothersRequired');
        } else if (parseInt(formData.brothers) < 0 || parseInt(formData.brothers) > 20) {
            newErrors.brothers = t('familyInfo.errors.brothersInvalid');
        }

        if (!formData.sisters.trim()) {
            newErrors.sisters = t('familyInfo.errors.sistersRequired');
        } else if (parseInt(formData.sisters) < 0 || parseInt(formData.sisters) > 20) {
            newErrors.sisters = t('familyInfo.errors.sistersInvalid');
        }

        if (!formData.familyType) {
            newErrors.familyType = t('familyInfo.errors.familyTypeRequired');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            showToast(t('familyInfo.errors.fixErrorsBeforeSaving'), { type: 'error' });
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
                showToast(t('familyInfo.updatedSuccess'), { type: 'success' });
                onBack();
            } else {
                showToast(response.message || t('familyInfo.updateFailed'), { type: 'error' });
            }
        } catch (error: any) {
            showToast(error?.response?.data?.message || t('familyInfo.updateFailed'), { type: 'error' });
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
                    <Text style={styles.headerTitle}>{t('familyInfo.title')}</Text>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSave}
                        disabled={saving}
                    >
                        {saving ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                            <Text style={styles.saveButtonText}>{t('common.save')}</Text>
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
                            label={t('familyInfo.fatherNameLabel')}
                            value={formData.fatherName}
                            onChangeText={(text) => updateField('fatherName', text)}
                            placeholder={t('familyInfo.fatherNamePlaceholder')}
                            error={errors.fatherName}
                        />

                        <FormInput
                            label={t('familyInfo.fatherOccupationLabel')}
                            value={formData.fatherOccupation}
                            onChangeText={(text) => updateField('fatherOccupation', text)}
                            placeholder={t('familyInfo.fatherOccupationPlaceholder')}
                            error={errors.fatherOccupation}
                        />

                        <FormInput
                            label={t('familyInfo.motherNameLabel')}
                            value={formData.motherName}
                            onChangeText={(text) => updateField('motherName', text)}
                            placeholder={t('familyInfo.motherNamePlaceholder')}
                            error={errors.motherName}
                        />

                        <FormInput
                            label={t('familyInfo.motherOccupationLabel')}
                            value={formData.motherOccupation}
                            onChangeText={(text) => updateField('motherOccupation', text)}
                            placeholder={t('familyInfo.motherOccupationPlaceholder')}
                            error={errors.motherOccupation}
                        />

                        <View style={styles.row}>
                            <View style={styles.halfWidth}>
                                <FormInput
                                    label={t('familyInfo.brothersLabel')}
                                    value={formData.brothers}
                                    onChangeText={(text) => updateField('brothers', text.replace(/\D/g, ''))}
                                    placeholder="0"
                                    keyboardType="number-pad"
                                    error={errors.brothers}
                                />
                            </View>
                            <View style={styles.halfWidth}>
                                <FormInput
                                    label={t('familyInfo.sistersLabel')}
                                    value={formData.sisters}
                                    onChangeText={(text) => updateField('sisters', text.replace(/\D/g, ''))}
                                    placeholder="0"
                                    keyboardType="number-pad"
                                    error={errors.sisters}
                                />
                            </View>
                        </View>

                        <DropdownPickerInput
                            label={t('familyInfo.familyTypeLabel')}
                            value={formData.familyType}
                            onChange={(value) => updateField('familyType', value)}
                            placeholder={t('familyInfo.familyTypePlaceholder')}
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
