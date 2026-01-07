import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Image, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Upload, Camera } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';

interface EditProfileScreenProps {
    onBack: () => void;
    currentUser: any;
}

export function EditProfileScreen({ onBack, currentUser }: EditProfileScreenProps) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        fullName: currentUser?.fullName || '',
        email: '',
        phone: '',
        dob: '',
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
        bio: '',
    });

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
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>{t('common.save')}</Text>
                    </TouchableOpacity>
                </LinearGradient>
            )}
        >
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Profile Photo */}
                <View style={styles.photoSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>U</Text>
                            <View style={styles.cameraIcon}>
                                <Camera size={16} color="#ffffff" />
                            </View>
                        </View>
                    </View>
                    <View style={styles.photoInfo}>
                        <Text style={styles.photoTitle}>{t('editProfile.profilePhoto')}</Text>
                        <Text style={styles.photoSubtitle}>{t('editProfile.changePhoto')}</Text>
                        <TouchableOpacity style={styles.uploadButton}>
                            <Upload size={16} color="#f97316" />
                            <Text style={styles.uploadText}>{t('editProfile.uploadPhoto')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Personal Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('editProfile.personalInformation')}</Text>

                    <Text style={styles.label}>{t('editProfile.fullName')}</Text>
                    <TextInput
                        style={styles.input}
                        value={formData.fullName}
                        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                        placeholder="Enter your full name"
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
                        value={formData.dob}
                        onChangeText={(text) => setFormData({ ...formData, dob: text })}
                        placeholder="dd/mm/yyyy"
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
                        value={formData.bio}
                        onChangeText={(text) => setFormData({ ...formData, bio: text })}
                        placeholder={t('editProfile.bioPlaceholder')}
                        placeholderTextColor="#9ca3af"
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </CustomSafeAreaView>
    );
}


