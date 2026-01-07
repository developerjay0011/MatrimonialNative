import { getData, postData } from '../../api/apiRequest';
import { showToast } from '../../utils/toast';

const INTEREST_ENDPOINTS = {
    SEND_INTEREST: 'interests/send',
    GET_SENT: 'interests/sent',
    GET_RECEIVED: 'interests/received',
    ACCEPT: 'interests/',
    REJECT: 'interests/',
};

export const sendInterest = async (toUserId: string, message?: string) => {
    try {
        const response = await postData(INTEREST_ENDPOINTS.SEND_INTEREST, {
            data: { toUserId, message },
            showConsole: true,
        });

        if (response?.data?.success) {
            showToast(response.data.message || 'Interest sent successfully', { type: 'success' });
        }

        return response.data;
    } catch (error: any) {
        showToast(error?.message || 'Failed to send interest', { type: 'error' });
        throw error;
    }
};

export const getSentInterests = async () => {
    try {
        const response = await getData(INTEREST_ENDPOINTS.GET_SENT, { showConsole: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getReceivedInterests = async () => {
    try {
        const response = await getData(INTEREST_ENDPOINTS.GET_RECEIVED, { showConsole: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const acceptInterest = async (interestId: string) => {
    try {
        const response = await postData(`${INTEREST_ENDPOINTS.ACCEPT}${interestId}/accept`, {
            showConsole: true,
        });

        if (response?.data?.success) {
            showToast(response.data.message || 'Interest accepted', { type: 'success' });
        }

        return response.data;
    } catch (error: any) {
        showToast(error?.message || 'Failed to accept interest', { type: 'error' });
        throw error;
    }
};

export const rejectInterest = async (interestId: string) => {
    try {
        const response = await postData(`${INTEREST_ENDPOINTS.REJECT}${interestId}/reject`, {
            showConsole: true,
        });

        if (response?.data?.success) {
            showToast(response.data.message || 'Interest rejected', { type: 'success' });
        }

        return response.data;
    } catch (error: any) {
        showToast(error?.message || 'Failed to reject interest', { type: 'error' });
        throw error;
    }
};
