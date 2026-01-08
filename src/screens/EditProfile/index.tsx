import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Upload, Camera } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';
import { getMyProfile, createOrUpdateProfile } from '../../redux/actions/profile';
import { uploadPhoto } from '../../redux/actions/photos';
import { showToast } from '../../utils/toast';
import { pickSinglePhoto } from '../../utils/photoUpload';
import { useIsFocused } from '@react-navigation/native';
import { DatePickerInput } from '../../components/common/DatePickerInput';
import { FormInput } from '../../components/common/FormInput';
import { DropdownPickerInput } from '../../components/common/DropdownPickerInput';
import { FormSkeleton } from '../../components/skeletons/FormSkeleton';
import { useAppDispatch } from '../../redux/hooks';

interface EditProfileScreenProps {
    onBack: () => void;
    currentUser: any;
}

const MARITAL_STATUS_OPTIONS = [
    { label: 'Never Married', value: 'never_married' },
    { label: 'Divorced', value: 'divorced' },
    { label: 'Widowed', value: 'widowed' },
];

export function EditProfileScreen({ onBack, currentUser }: EditProfileScreenProps) {
    const { t } = useTranslation();
    const isFocused = useIsFocused();
    const dispatch = useAppDispatch();
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        height: '',
        weight: '',
        maritalStatus: '',
        education: '',
        occupation: '',
        city: '',
        state: '',
        religion: '',
        motherTongue: '',
        aboutMe: '',
        gender: '',
        age: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }));
        }
    };

    useEffect(() => {
        if (isFocused) { fetchProfile() }
    }, [isFocused]);

    const fetchProfile = async () => {
        setLoading(true);
        dispatch(
            getMyProfile((response: any) => {
                setLoading(false);
                if (response?.success && response?.data) {
                    const profile = response.data?.profile;
                    setFormData({
                        email: response?.data?.email || '',
                        phone: response?.data?.phone?.replace('+91', '') || '',
                        fullName: profile?.fullName || '',
                        dateOfBirth: moment(profile?.dateOfBirth).format('YYYY-MM-DD') || '',
                        height: profile?.height?.toString() || '',
                        weight: profile?.weight?.toString() || '',
                        maritalStatus: profile?.maritalStatus || '',
                        education: profile?.education || '',
                        occupation: profile?.occupation || '',
                        city: profile?.currentCity || '',
                        state: profile?.currentState || '',
                        religion: profile.religion || '',
                        motherTongue: profile.motherTongue || '',
                        aboutMe: profile.aboutMe || '',
                        gender: profile.gender || '',
                        age: profile.age || '',
                    });
                    var profilePhoto = response?.data?.photos?.find((photo: any) => photo.isProfilePhoto);
                    setProfilePhoto(profilePhoto?.url || response?.data?.photos?.[0]?.url);
                }
            })
        );
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Full name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!formData.height) {
            newErrors.height = 'Height is required';
        }

        if (formData.height && (parseInt(formData.height) < 100 || parseInt(formData.height) > 250)) {
            newErrors.height = 'Please enter a valid height (100-250 cm)';
        }

        if (!formData.weight) {
            newErrors.weight = 'Weight is required';
        }

        if (formData.weight && (parseInt(formData.weight) < 30 || parseInt(formData.weight) > 200)) {
            newErrors.weight = 'Please enter a valid weight (30-200 kg)';
        }

        if (!formData.occupation.trim()) {
            newErrors.occupation = 'Occupation is required';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }

        if (!formData.state.trim()) {
            newErrors.state = 'State is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveProfile = async () => {
        if (!validateForm()) {
            showToast('Please fix the errors before saving', { type: 'error' });
            return;
        }
        setSaving(true);
        const profileData: any = {
            fullName: formData?.fullName?.trim(),
            email: formData?.email?.trim(),
            phone: `+91${formData?.phone?.trim()}`,
            dateOfBirth: formData?.dateOfBirth?.trim(),
            height: formData?.height?.trim(),
            weight: formData?.weight?.trim(),
            maritalStatus: formData?.maritalStatus?.trim(),
            education: formData?.education?.trim(),
            occupation: formData?.occupation?.trim(),
            currentCity: formData?.city?.trim(),
            currentState: formData?.state?.trim(),
            religion: formData?.religion?.trim(),
            motherTongue: formData?.motherTongue?.trim(),
            aboutMe: formData?.aboutMe?.trim(),
            gender: formData?.gender?.trim(),
            age: formData?.age,
        };
        dispatch(createOrUpdateProfile(profileData, (response: any) => {
            setSaving(false);
        }));
    };

    const handleUploadPhoto = async () => {
        try {
            const photo = await pickSinglePhoto({ source: 'gallery', cropping: true, cropperCircleOverlay: true });
            if (photo) {
                const response = await uploadPhoto(photo, true);
                if (response?.success) { fetchProfile() }
            }
        } catch (error: any) {
            showToast(error?.message || 'Failed to upload photo', { type: 'error' });
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
                    style={[styles.header, { paddingTop: insets.top + 30 }]}
                >
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <ArrowLeft size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t('editProfile.title')}</Text>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSaveProfile}
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
                    <FormSkeleton sections={4} fieldsPerSection={4} />
                ) : (
                    <>
                        {/* Profile Photo */}
                        <View style={styles.photoSection}>
                            <TouchableOpacity onPress={handleUploadPhoto} style={styles.avatarContainer}>
                                <View style={styles.avatar}>
                                    {profilePhoto ? (
                                        <Image source={{ uri: profilePhoto }} style={{ width: '100%', height: '100%', borderRadius: 50 }} />
                                    ) : (
                                        <Text style={styles.avatarText}>U</Text>
                                    )}
                                    <View style={styles.cameraIcon}>
                                        <Camera size={16} color="#ffffff" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.photoInfo}>
                                <Text style={styles.photoTitle}>{t('editProfile.profilePhoto')}</Text>
                                <Text style={styles.photoSubtitle}>{t('editProfile.changePhoto')}</Text>
                                <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPhoto}>
                                    <Upload size={16} color="#f97316" />
                                    <Text style={styles.uploadText}>{t('editProfile.uploadPhoto')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Personal Information */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('editProfile.personalInformation')}</Text>

                            <FormInput
                                label="Full Name"
                                value={formData.fullName}
                                onChangeText={(text) => updateField('fullName', text)}
                                placeholder="Enter your full name"
                                error={errors.fullName}
                            />

                            <FormInput
                                label={t('editProfile.emailAddress')}
                                value={formData.email}
                                onChangeText={(text) => updateField('email', text)}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                error={errors.email}
                                editable={false}
                            />

                            <FormInput
                                type="phone"
                                label={t('editProfile.phoneNumber')}
                                value={formData.phone}
                                onChangeText={(text) => updateField('phone', text)}
                                placeholder="Enter your phone number"
                                keyboardType="phone-pad"
                                error={errors.phone}
                                editable={false}
                            />

                            <DatePickerInput
                                label={t('editProfile.dateOfBirth')}
                                value={formData.dateOfBirth}
                                onChange={(text, age) => {
                                    updateField('dateOfBirth', text)
                                    updateField('age', age.toString())
                                }}
                                placeholder="YYYY-MM-DD"
                                error={errors.dateOfBirth}
                            />

                            <View style={styles.row}>
                                <View style={styles.halfWidth}>
                                    <FormInput
                                        label={t('profile.height')}
                                        value={formData.height}
                                        onChangeText={(text) => updateField('height', text.replace(/\D/g, ''))}
                                        placeholder="170 cm"
                                        keyboardType="number-pad"
                                        error={errors.height}
                                    />
                                </View>
                                <View style={styles.halfWidth}>
                                    <FormInput
                                        label={t('profile.weight')}
                                        value={formData.weight}
                                        onChangeText={(text) => updateField('weight', text.replace(/\D/g, ''))}
                                        placeholder="65 kg"
                                        keyboardType="number-pad"
                                        error={errors.weight}
                                    />
                                </View>
                            </View>

                            <DropdownPickerInput
                                label={t('profile.maritalStatus')}
                                value={formData.maritalStatus}
                                onChange={(value) => updateField('maritalStatus', value)}
                                placeholder="Select marital status"
                                options={MARITAL_STATUS_OPTIONS}
                                error={errors.maritalStatus}
                            />
                        </View>

                        {/* Education & Career */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('editProfile.educationCareer')}</Text>

                            <FormInput
                                label={t('profile.education')}
                                value={formData.education}
                                onChangeText={(text) => updateField('education', text)}
                                placeholder="e.g., B.Tech in Computer Science"
                                error={errors.education}
                            />

                            <FormInput
                                label={t('profile.occupation')}
                                value={formData.occupation}
                                onChangeText={(text) => updateField('occupation', text)}
                                placeholder="e.g., Software Engineer"
                                error={errors.occupation}
                            />
                        </View>

                        {/* Location */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('editProfile.location')}</Text>

                            <FormInput
                                label={t('profile.city')}
                                value={formData.city}
                                onChangeText={(text) => updateField('city', text)}
                                placeholder="Enter your city"
                                error={errors.city}
                            />

                            <FormInput
                                label={t('profile.state')}
                                value={formData.state}
                                onChangeText={(text) => updateField('state', text)}
                                placeholder="Enter your state"
                                error={errors.state}
                            />
                        </View>

                        {/* Lifestyle & Background */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('editProfile.lifestyleBackground')}</Text>

                            <FormInput
                                label={t('profile.religion')}
                                value={formData.religion}
                                onChangeText={(text) => updateField('religion', text)}
                                placeholder="Enter your religion"
                                error={errors.religion}
                            />

                            <FormInput
                                label={t('profile.motherTongue')}
                                value={formData.motherTongue}
                                onChangeText={(text) => updateField('motherTongue', text)}
                                placeholder="Enter your mother tongue"
                                error={errors.motherTongue}
                            />
                        </View>

                        {/* About Me */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('editProfile.aboutMe')}</Text>

                            <FormInput
                                multiline
                                label={t('profile.bio')}
                                value={formData.aboutMe}
                                onChangeText={(text) => updateField('aboutMe', text)}
                                placeholder={t('editProfile.bioPlaceholder')}
                                numberOfLines={4}
                                error={errors.aboutMe}
                            />
                        </View>

                        <View style={{ height: 40 }} />
                    </>
                )}
            </ScrollView>
        </CustomSafeAreaView >
    );
}


