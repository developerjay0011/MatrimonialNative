import { getData, postData, putData } from '../../api/apiRequest';
import { showToast } from '../../utils/toast';

const PROFILE_ENDPOINTS = {
    GET_MY_PROFILE: 'profile/me',
    GET_USER_PROFILE: 'profile/',
    CREATE_UPDATE_PROFILE: 'profile/create',
    UPDATE_FAMILY: 'profile/family',
};

export const getMyProfile = async () => {
    try {
        const response = await getData(PROFILE_ENDPOINTS.GET_MY_PROFILE, { showConsole: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserProfile = async (userId: string) => {
    try {
        const response = await getData(`${PROFILE_ENDPOINTS.GET_USER_PROFILE}${userId}`, { showConsole: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createOrUpdateProfile = async (profileData: any) => {
    try {
        const response = await postData(PROFILE_ENDPOINTS.CREATE_UPDATE_PROFILE, {
            data: profileData,
            showConsole: true,
        });

        if (response?.data?.success) {
            showToast(response.data.message, { type: 'success' });
        }

        return response.data;
    } catch (error: any) {
        showToast(error?.message || 'Failed to update profile', { type: 'error' });
        throw error;
    }
};

export const updateFamilyDetails = async (familyData: any) => {
    try {
        const response = await putData(PROFILE_ENDPOINTS.UPDATE_FAMILY, {
            data: familyData,
            showConsole: true,
        });

        if (response?.data?.success) {
            showToast(response.data.message, { type: 'success' });
        }

        return response.data;
    } catch (error: any) {
        showToast(error?.message || 'Failed to update family details', { type: 'error' });
        throw error;
    }
};
