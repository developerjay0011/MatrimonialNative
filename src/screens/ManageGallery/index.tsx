import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { styles } from './styles';
import { getMyPhotos, uploadPhoto, deletePhoto } from '../../redux/actions/photos';
import { showToast } from '../../utils/toast';
import { useIsFocused } from '@react-navigation/native';
import { pickSinglePhoto } from '../../utils/photoUpload';

interface ManageGalleryScreenProps {
    onBack: () => void;
}

export function ManageGalleryScreen({ onBack }: ManageGalleryScreenProps) {
    const { t } = useTranslation();
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [photos, setPhotos] = useState<any[]>([]);
    const maxPhotos = 6;

    useEffect(() => {
        if (isFocused) {
            fetchPhotos();
        }
    }, [isFocused]);

    const fetchPhotos = async () => {
        try {
            setLoading(true);
            const response = await getMyPhotos();
            if (response.success && response.data?.photos) {
                setPhotos(response.data.photos);
            } else {
                setPhotos([]);
            }
        } catch (error: any) {
            console.log('Error fetching photos:', error);
            setPhotos([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddPhoto = async () => {
        if (photos.length >= maxPhotos) {
            showToast(`You can only upload up to ${maxPhotos} photos`, { type: 'error' });
            return;
        }

        try {
            setUploading(true);
            const photo = await pickSinglePhoto({ source: 'gallery', cropping: true });
            if (photo) {
                const response = await uploadPhoto(photo, false);
                if (response.success && response.data) {
                    setPhotos([...photos, response.data]);
                    showToast('Photo uploaded successfully!', { type: 'success' });
                } else {
                    showToast(response.message || 'Failed to upload photo', { type: 'error' });
                }
            }
        } catch (error: any) {
            showToast(error?.message || 'Failed to upload photo', { type: 'error' });
        } finally {
            setUploading(false);
        }
    };

    const handleDeletePhoto = (photoId: string) => {
        Alert.alert(
            'Delete Photo',
            'Are you sure you want to delete this photo?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await deletePhoto(photoId);
                            if (response.success) {
                                setPhotos(photos.filter(p => p._id !== photoId && p.id !== photoId));
                                showToast('Photo deleted successfully!', { type: 'success' });
                            } else {
                                showToast(response.message || 'Failed to delete photo', { type: 'error' });
                            }
                        } catch (error: any) {
                            showToast(error?.message || 'Failed to delete photo', { type: 'error' });
                        }
                    },
                },
            ]
        );
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
                    <Text style={styles.headerTitle}>Manage Gallery</Text>
                    <View style={{ width: 40 }} />
                </LinearGradient>
            )}
        >
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <View style={{ padding: 40, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#f97316" />
                        <Text style={{ marginTop: 16, color: '#6b7280' }}>Loading photos...</Text>
                    </View>
                ) : (
                    <>
                        {/* Info Section */}
                        <View style={styles.infoSection}>
                            <Text style={styles.infoTitle}>Your Photo Gallery</Text>
                            <Text style={styles.infoText}>
                                You can upload up to {maxPhotos} photos. ({photos.length}/{maxPhotos} uploaded)
                            </Text>
                        </View>

                        {/* Photo Grid */}
                        <View style={styles.photoGrid}>
                            {photos.map((photo, index) => (
                                <View key={photo._id || photo.id || index} style={styles.photoCard}>
                                    <Image
                                        source={{ uri: photo.url }}
                                        style={styles.photoImage}
                                        resizeMode="cover"
                                    />
                                    {photo.isProfilePhoto && (
                                        <View style={styles.profileBadge}>
                                            <Text style={styles.profileBadgeText}>Profile</Text>
                                        </View>
                                    )}
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => handleDeletePhoto(photo._id || photo.id)}
                                    >
                                        <Trash2 size={18} color="#ffffff" />
                                    </TouchableOpacity>
                                </View>
                            ))}

                            {/* Add Photo Button */}
                            {photos.length < maxPhotos && (
                                <TouchableOpacity
                                    style={styles.addPhotoCard}
                                    onPress={handleAddPhoto}
                                    disabled={uploading}
                                >
                                    {uploading ? (
                                        <ActivityIndicator size="large" color="#f97316" />
                                    ) : (
                                        <>
                                            <View style={styles.addPhotoIcon}>
                                                <Plus size={32} color="#f97316" />
                                            </View>
                                            <Text style={styles.addPhotoText}>Add Photo</Text>
                                        </>
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Guidelines */}
                        <View style={styles.guidelinesSection}>
                            <Text style={styles.guidelinesTitle}>Photo Guidelines</Text>
                            <View style={styles.guidelineItem}>
                                <Text style={styles.guidelineBullet}>•</Text>
                                <Text style={styles.guidelineText}>Upload clear, recent photos</Text>
                            </View>
                            <View style={styles.guidelineItem}>
                                <Text style={styles.guidelineBullet}>•</Text>
                                <Text style={styles.guidelineText}>Avoid group photos or photos with filters</Text>
                            </View>
                            <View style={styles.guidelineItem}>
                                <Text style={styles.guidelineBullet}>•</Text>
                                <Text style={styles.guidelineText}>Photos should be appropriate and respectful</Text>
                            </View>
                            <View style={styles.guidelineItem}>
                                <Text style={styles.guidelineBullet}>•</Text>
                                <Text style={styles.guidelineText}>Maximum file size: 5MB per photo</Text>
                            </View>
                        </View>

                        <View style={{ height: 40 }} />
                    </>
                )}
            </ScrollView>
        </CustomSafeAreaView>
    );
}
