import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, StatusBar, ActivityIndicator } from 'react-native';
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
import { goBack } from '../../navigation/RootNavigation';

interface EditProfileScreenProps {
    onBack: () => void;
    currentUser: any;
}

export function EditProfileScreen({ onBack, currentUser }: EditProfileScreenProps) {
    const { t } = useTranslation();
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        height: '',
        weight: '',
        maritalStatus: '',
        education: '',
        occupation: '',
        income: '',
        city: '',
        state: '',
        diet: '',
        religion: '',
        motherTongue: '',
        aboutMe: '',
    });

    useEffect(() => {
        if (isFocused) {
            fetchProfile()
        }
    }, [isFocused]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await getMyProfile();
            if (response.success && response.data) {
                const profile = response.data;
                setFormData({
                    firstName: profile.firstName || '',
                    lastName: profile.lastName || '',
                    email: profile.email || '',
                    phone: profile.phone || '',
                    dateOfBirth: profile.dateOfBirth || '',
                    height: profile.height?.toString() || '',
                    weight: profile.weight?.toString() || '',
                    maritalStatus: profile.maritalStatus || '',
                    education: profile.education || '',
                    occupation: profile.occupation || '',
                    income: profile.income || '',
                    city: profile.city || '',
                    state: profile.state || '',
                    diet: profile.diet || '',
                    religion: profile.religion || '',
                    motherTongue: profile.motherTongue || '',
                    aboutMe: profile.aboutMe || '',
                });
                setProfilePhoto(profile.profilePhoto || profile.photos?.[0]?.url);
            }
        } catch (error: any) {
            goBack();
            showToast(error?.message || 'Failed to fetch profile', { type: 'error' });
            console.log('Error fetching profile');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProfile = async () => {
        try {
            setSaving(true);
            const profileData: any = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                height: formData.height ? parseInt(formData.height) : undefined,
                weight: formData.weight ? parseInt(formData.weight) : undefined,
                education: formData.education,
                occupation: formData.occupation,
                aboutMe: formData.aboutMe,
                maritalStatus: formData.maritalStatus,
                diet: formData.diet,
                religion: formData.religion,
                motherTongue: formData.motherTongue,
            };

            const response = await createOrUpdateProfile(profileData);
            if (response.success) {
                showToast('Profile updated successfully!', { type: 'success' });
                onBack();
            } else {
                showToast(response.message || 'Failed to update profile', { type: 'error' });
            }
        } catch (error: any) {
            showToast(error?.message || 'Failed to update profile', { type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleUploadPhoto = async () => {
        try {
            const photo = await pickSinglePhoto({ source: 'gallery', cropping: true, cropperCircleOverlay: true });
            if (photo) {
                const response = await uploadPhoto(photo, true);
                if (response.success && response.data) {
                    setProfilePhoto(response.data.url);
                    showToast('Photo uploaded successfully!', { type: 'success' });
                }
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
                    <View style={{ padding: 40, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#f97316" />
                        <Text style={{ marginTop: 16, color: '#6b7280' }}>Loading profile...</Text>
                    </View>
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

                            <Text style={styles.label}>First Name</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.firstName}
                                onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                                placeholder="Enter your first name"
                                placeholderTextColor="#9ca3af"
                            />

                            <Text style={styles.label}>Last Name</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.lastName}
                                onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                                placeholder="Enter your last name"
                                placeholderTextColor="#9ca3af"
                            />

                            <Text style={styles.label}>{t('editProfile.emailAddress')}</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                placeholder="Enter your email"
                                placeholderTextColor="#9ca3af"
                                keyboardType="email-address"
                            />

                            <Text style={styles.label}>{t('editProfile.phoneNumber')}</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.phone}
                                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                                placeholder="Enter your phone number"
                                placeholderTextColor="#9ca3af"
                                keyboardType="phone-pad"
                            />

                            <Text style={styles.label}>{t('editProfile.dateOfBirth')}</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.dateOfBirth}
                                onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#9ca3af"
                            />

                            <View style={styles.row}>
                                <View style={styles.halfWidth}>
                                    <Text style={styles.label}>{t('profile.height')}</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.height}
                                        onChangeText={(text) => setFormData({ ...formData, height: text })}
                                        placeholder="5'8&quot;"
                                        placeholderTextColor="#9ca3af"
                                    />
                                </View>
                                <View style={styles.halfWidth}>
                                    <Text style={styles.label}>{t('profile.weight')}</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.weight}
                                        onChangeText={(text) => setFormData({ ...formData, weight: text })}
                                        placeholder="65 kg"
                                        placeholderTextColor="#9ca3af"
                                    />
                                </View>
                            </View>

                            <Text style={styles.label}>{t('profile.maritalStatus')}</Text>
                            <View style={styles.selectContainer}>
                                <Text style={styles.selectText}>{t('editProfile.selectMaritalStatus')}</Text>
                            </View>
                        </View>

                        {/* Education & Career */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('editProfile.educationCareer')}</Text>

                            <Text style={styles.label}>{t('profile.education')}</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.education}
                                onChangeText={(text) => setFormData({ ...formData, education: text })}
                                placeholder="e.g., B.Tech in Computer Science"
                                placeholderTextColor="#9ca3af"
                            />

                            <Text style={styles.label}>{t('profile.occupation')}</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.occupation}
                                onChangeText={(text) => setFormData({ ...formData, occupation: text })}
                                placeholder="e.g., Software Engineer"
                                placeholderTextColor="#9ca3af"
                            />

                            <Text style={styles.label}>{t('editProfile.annualIncome')}</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.income}
                                onChangeText={(text) => setFormData({ ...formData, income: text })}
                                placeholder="e.g., ₹8-10 Lakhs"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        {/* Location */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('editProfile.location')}</Text>

                            <Text style={styles.label}>{t('profile.city')}</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.city}
                                onChangeText={(text) => setFormData({ ...formData, city: text })}
                                placeholder="Enter your city"
                                placeholderTextColor="#9ca3af"
                            />

                            <Text style={styles.label}>{t('profile.state')}</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.state}
                                onChangeText={(text) => setFormData({ ...formData, state: text })}
                                placeholder="Enter your state"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        {/* Lifestyle & Background */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('editProfile.lifestyleBackground')}</Text>

                            <Text style={styles.label}>{t('profile.diet')}</Text>
                            <View style={styles.selectContainer}>
                                <Text style={styles.selectText}>{t('editProfile.selectDiet')}</Text>
                            </View>

                            <Text style={styles.label}>{t('profile.religion')}</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.religion}
                                onChangeText={(text) => setFormData({ ...formData, religion: text })}
                                placeholder="Enter your religion"
                                placeholderTextColor="#9ca3af"
                            />

                            <Text style={styles.label}>{t('profile.motherTongue')}</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.motherTongue}
                                onChangeText={(text) => setFormData({ ...formData, motherTongue: text })}
                                placeholder="Enter your mother tongue"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        {/* About Me */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('editProfile.aboutMe')}</Text>

                            <Text style={styles.label}>{t('profile.bio')}</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={formData.aboutMe}
                                onChangeText={(text) => setFormData({ ...formData, aboutMe: text })}
                                placeholder={t('editProfile.bioPlaceholder')}
                                placeholderTextColor="#9ca3af"
                                multiline
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                        </View>

                        <View style={{ height: 40 }} />
                    </>
                )}
            </ScrollView>
        </CustomSafeAreaView>
    );
}


