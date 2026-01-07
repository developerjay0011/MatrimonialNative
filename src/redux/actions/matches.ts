import { getData, postData, deleteData } from '../../api/apiRequest';
import { showToast } from '../../utils/toast';

const MATCH_ENDPOINTS = {
    GET_SUGGESTIONS: 'matches/suggestions',
    GET_NEARBY: 'matches/nearby',
    SHORTLIST: 'matches/',
    GET_SHORTLISTED: 'matches/shortlisted',
};

export const getMatchSuggestions = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await getData(MATCH_ENDPOINTS.GET_SUGGESTIONS, {
            params: { page, limit },
            showConsole: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getNearbyMatches = async () => {
    try {
        const response = await getData(MATCH_ENDPOINTS.GET_NEARBY, { showConsole: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const shortlistMatch = async (userId: string) => {
    try {
        const response = await postData(`${MATCH_ENDPOINTS.SHORTLIST}${userId}/shortlist`, {
            showConsole: true,
        });

        if (response?.data?.success) {
            showToast(response.data.message || 'Profile shortlisted', { type: 'success' });
        }

        return response.data;
    } catch (error: any) {
        showToast(error?.message || 'Failed to shortlist profile', { type: 'error' });
        throw error;
    }
};

export const removeShortlist = async (userId: string) => {
    try {
        const response = await deleteData(`${MATCH_ENDPOINTS.SHORTLIST}${userId}/shortlist`, {
            showConsole: true,
        });

        if (response?.data?.success) {
            showToast(response.data.message || 'Removed from shortlist', { type: 'success' });
        }

        return response.data;
    } catch (error: any) {
        showToast(error?.message || 'Failed to remove from shortlist', { type: 'error' });
        throw error;
    }
};

export const getShortlistedProfiles = async () => {
    try {
        const response = await getData(MATCH_ENDPOINTS.GET_SHORTLISTED, { showConsole: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};
