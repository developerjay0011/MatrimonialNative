import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';
import { getMyProfile, updateFamilyDetails } from '../../redux/actions/profile';
import { showToast } from '../../utils/toast';
import { useIsFocused } from '@react-navigation/native';
import { goBack } from '../../navigation/RootNavigation';

interface FamilyInfoScreenProps {
    onBack: () => void;
}

export function FamilyInfoScreen({ onBack }: FamilyInfoScreenProps) {
    const { t } = useTranslation();
    const isFocused = useIsFocused();
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
        familyValues: '',
    });

    useEffect(() => {
        if (isFocused) {
            fetchFamilyInfo();
        }
    }, [isFocused]);

    const fetchFamilyInfo = async () => {
        try {
            setLoading(true);
            const response = await getMyProfile();
            if (response.success && response.data?.family) {
                const family = response.data.family;
                setFormData({
                    fatherName: family.fatherName || '',
                    motherName: family.motherName || '',
                    fatherOccupation: family.fatherOccupation || '',
                    motherOccupation: family.motherOccupation || '',
                    brothers: family.brothers?.toString() || '',
                    sisters: family.sisters?.toString() || '',
                    familyType: family.familyType || '',
                    familyValues: family.familyValues || '',
                });
            }
        } catch (error: any) {
            console.log('Error fetching family info:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            const familyData = {
                fatherName: formData.fatherName,
                motherName: formData.motherName,
                fatherOccupation: formData.fatherOccupation,
                motherOccupation: formData.motherOccupation,
                brothers: formData.brothers ? parseInt(formData.brothers) : 0,
                sisters: formData.sisters ? parseInt(formData.sisters) : 0,
                familyType: formData.familyType,
                familyValues: formData.familyValues,
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
                    <View style={{ padding: 40, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#f97316" />
                        <Text style={{ marginTop: 16, color: '#6b7280' }}>Loading family information...</Text>
                    </View>
                ) : (
                    <>
                        {/* Parents Information */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Parents Information</Text>

                            <Text style={styles.label}>Father's Name</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.fatherName}
                                onChangeText={(text) => setFormData({ ...formData, fatherName: text })}
                                placeholder="Enter father's name"
                                placeholderTextColor="#9ca3af"
                            />

                            <Text style={styles.label}>Father's Occupation</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.fatherOccupation}
                                onChangeText={(text) => setFormData({ ...formData, fatherOccupation: text })}
                                placeholder="e.g., Business, Service, Retired"
                                placeholderTextColor="#9ca3af"
                            />

                            <Text style={styles.label}>Mother's Name</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.motherName}
                                onChangeText={(text) => setFormData({ ...formData, motherName: text })}
                                placeholder="Enter mother's name"
                                placeholderTextColor="#9ca3af"
                            />

                            <Text style={styles.label}>Mother's Occupation</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.motherOccupation}
                                onChangeText={(text) => setFormData({ ...formData, motherOccupation: text })}
                                placeholder="e.g., Housewife, Service, Business"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        {/* Siblings Information */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Siblings</Text>

                            <View style={styles.row}>
                                <View style={styles.halfWidth}>
                                    <Text style={styles.label}>Brothers</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.brothers}
                                        onChangeText={(text) => setFormData({ ...formData, brothers: text })}
                                        placeholder="0"
                                        placeholderTextColor="#9ca3af"
                                        keyboardType="number-pad"
                                    />
                                </View>
                                <View style={styles.halfWidth}>
                                    <Text style={styles.label}>Sisters</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.sisters}
                                        onChangeText={(text) => setFormData({ ...formData, sisters: text })}
                                        placeholder="0"
                                        placeholderTextColor="#9ca3af"
                                        keyboardType="number-pad"
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Family Details */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Family Details</Text>

                            <Text style={styles.label}>Family Type</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.familyType}
                                onChangeText={(text) => setFormData({ ...formData, familyType: text })}
                                placeholder="e.g., Nuclear, Joint"
                                placeholderTextColor="#9ca3af"
                            />

                            <Text style={styles.label}>Family Values</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.familyValues}
                                onChangeText={(text) => setFormData({ ...formData, familyValues: text })}
                                placeholder="e.g., Traditional, Moderate, Liberal"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        <View style={{ height: 40 }} />
                    </>
                )}
            </ScrollView>
        </CustomSafeAreaView>
    );
}
