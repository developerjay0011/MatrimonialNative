import { getData, postFormData, deleteData } from '../../api/apiRequest';
import { showToast } from '../../utils/toast';

const PHOTO_ENDPOINTS = {
    UPLOAD_PHOTO: 'photos/upload',
    GET_MY_PHOTOS: 'photos/my-photos',
    GET_USER_PHOTOS: 'photos/',
    DELETE_PHOTO: 'photos/',
};

export const uploadPhoto = async (photo: any, isProfilePhoto: boolean = false) => {
    try {
        const formData = new FormData();
        formData.append('photo', {
            uri: photo.uri,
            type: photo.type || 'image/jpeg',
            name: photo.name || 'photo.jpg',
        });
        formData.append('isProfilePhoto', isProfilePhoto.toString());

        const response = await postFormData(PHOTO_ENDPOINTS.UPLOAD_PHOTO, {
            data: formData,
            showConsole: true,
        });
        showToast(response?.data?.message, { type: response?.data?.success ? 'success' : 'error' });
        return response.data;
    } catch (error: any) {
        showToast(error?.message || 'Failed to upload photo', { type: 'error' });
        throw error;
    }
};

export const getUserPhotos = async (userId: string) => {
    try {
        const response = await getData(`${PHOTO_ENDPOINTS.GET_USER_PHOTOS}${userId}`, { showConsole: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deletePhoto = async (photoId: string) => {
    try {
        const response = await deleteData(`${PHOTO_ENDPOINTS.DELETE_PHOTO}${photoId}`, { showConsole: true });
        if (response?.data) {
            showToast(response.data.message, { type: response.data.success ? 'success' : 'error' });
            return response.data;
        }
        return { success: false, message: 'No response from server' };
    } catch (error: any) {
        showToast(error?.message || 'Failed to delete photo', { type: 'error' });
        throw error;
    }
};
