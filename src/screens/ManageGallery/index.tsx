import { styles } from './styles';
import { showToast } from '../../utils/toast';
import { getMyProfile } from '../../redux/actions';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { pickSinglePhoto } from '../../utils/photoUpload';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { uploadPhoto, deletePhoto } from '../../redux/actions/photos';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';

interface ManageGalleryScreenProps {
    onBack: () => void;
}

export function ManageGalleryScreen({ onBack }: ManageGalleryScreenProps) {
    const maxPhotos = 6;
    const isFocused = useIsFocused();
    const dispatch = useAppDispatch();
    const [photos, setPhotos] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);
    const { profileDetails } = useAppSelector((state: any) => state.user);

    useEffect(() => {
        if (isFocused) { setPhotos(profileDetails?.photos || []) }
    }, [isFocused, profileDetails?.photos?.length]);

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
                if (response.success) { dispatch(getMyProfile()) }
            }
        } finally {
            setUploading(false);
        }
    };

    const handleDeletePhoto = (photoId: string) => {
        setPhotoToDelete(photoId);
        setDeleteModalVisible(true);
    };

    const confirmDeletePhoto = async () => {
        if (!photoToDelete) return;
        await deletePhoto(photoToDelete);
        setDeleteModalVisible(false);
        dispatch(getMyProfile());
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
            </ScrollView>

            <ConfirmationModal
                visible={deleteModalVisible}
                title="Delete Photo"
                message="Are you sure you want to delete this photo? This action cannot be undone."
                type="delete"
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={confirmDeletePhoto}
                onCancel={() => {
                    setDeleteModalVisible(false);
                    setPhotoToDelete(null);
                }}
            />
        </CustomSafeAreaView>
    );
}
