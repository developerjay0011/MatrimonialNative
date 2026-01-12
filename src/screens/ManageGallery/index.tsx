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
import { useTranslation } from 'react-i18next';

interface ManageGalleryScreenProps {
    onBack: () => void;
}

export function ManageGalleryScreen({ onBack }: ManageGalleryScreenProps) {
    const { t } = useTranslation();
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
            showToast(t('gallery.maxPhotosError', { max: maxPhotos }), { type: 'error' });
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
                    <Text style={styles.headerTitle}>{t('gallery.title')}</Text>
                    <View style={{ width: 40 }} />
                </LinearGradient>
            )}
        >
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Info Section */}
                <View style={styles.infoSection}>
                    <Text style={styles.infoTitle}>{t('gallery.yourPhotoGallery')}</Text>
                    <Text style={styles.infoText}>
                        {t('gallery.uploadInfo', { max: maxPhotos, current: photos.length })}
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
                                    <Text style={styles.profileBadgeText}>{t('gallery.profileBadge')}</Text>
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
                                    <Text style={styles.addPhotoText}>{t('gallery.addPhoto')}</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    )}
                </View>

                {/* Guidelines */}
                <View style={styles.guidelinesSection}>
                    <Text style={styles.guidelinesTitle}>{t('gallery.guidelinesTitle')}</Text>
                    <View style={styles.guidelineItem}>
                        <Text style={styles.guidelineBullet}>•</Text>
                        <Text style={styles.guidelineText}>{t('gallery.guideline1')}</Text>
                    </View>
                    <View style={styles.guidelineItem}>
                        <Text style={styles.guidelineBullet}>•</Text>
                        <Text style={styles.guidelineText}>{t('gallery.guideline2')}</Text>
                    </View>
                    <View style={styles.guidelineItem}>
                        <Text style={styles.guidelineBullet}>•</Text>
                        <Text style={styles.guidelineText}>{t('gallery.guideline3')}</Text>
                    </View>
                    <View style={styles.guidelineItem}>
                        <Text style={styles.guidelineBullet}>•</Text>
                        <Text style={styles.guidelineText}>{t('gallery.guideline4')}</Text>
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            <ConfirmationModal
                visible={deleteModalVisible}
                title={t('gallery.deletePhotoTitle')}
                message={t('gallery.deletePhotoMessage')}
                type="delete"
                confirmText={t('gallery.deleteConfirm')}
                cancelText={t('common.cancel')}
                onConfirm={confirmDeletePhoto}
                onCancel={() => {
                    setDeleteModalVisible(false);
                    setPhotoToDelete(null);
                }}
            />
        </CustomSafeAreaView>
    );
}
