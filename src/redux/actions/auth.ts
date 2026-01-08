import { showToast } from '../../utils/toast';
import { postData, postFormData } from '../../api/apiRequest';
import { navigate, reset } from '../../navigation/RootNavigation';
import { StorageService } from '../../utils/storage';

const AUTH_ENDPOINTS = {
    REGISTER: 'auth/register',
    LOGIN: 'auth/login',
    SEND_OTP: 'auth/otp/send',
    VERIFY_OTP: 'auth/otp/verify',
    REFRESH_TOKEN: 'auth/refresh-token',
    LOGOUT: 'auth/logout',
};

export const registerUser = (userData: any) => {
    return async (dispatch: any) => {
        try {
            const formData = new FormData();

            formData.append('email', userData.email);
            formData.append('phone', `+91${userData.phone}`);
            formData.append('password', userData.password);
            formData.append('fullName', userData.fullName);
            formData.append('age', userData.age);
            formData.append('dateOfBirth', userData.dateOfBirth);
            formData.append('gender', userData.gender);
            formData.append('city', userData.city);
            formData.append('occupation', userData.occupation);
            formData.append('currentState', userData.currentState);

            if (userData.photos && Array.isArray(userData.photos)) {
                userData.photos.forEach((photo: any) => {
                    if (photo.uri) {
                        formData.append('photos', {
                            uri: photo.uri,
                            type: photo.type || 'image/jpeg',
                            name: photo.name || 'photo.jpg',
                        });
                    }
                });
            }

            const response = await postFormData(AUTH_ENDPOINTS.REGISTER, { data: formData, showConsole: true });
            showToast(response?.data?.message, { type: response?.data?.success ? 'success' : 'error' });
            userData?.setLoading(false);

            if (response?.data?.success) { navigate('Login') }
        } catch (error: any) {
            userData?.setLoading(false);
            showToast(error?.message, { type: 'error' });
            throw error;
        }
    };
};

export const loginUser = (credentials: { email: string; password: string }, setLoading: (loading: boolean) => void) => {
    return async (dispatch: any) => {
        try {
            const response = await postData(AUTH_ENDPOINTS.LOGIN, {
                data: credentials,
                showConsole: true,
            });

            if (response?.data?.success && response?.data?.data) {
                await StorageService.setAccessToken(response?.data?.data?.accessToken);
                await StorageService.setRefreshToken(response?.data?.data?.refreshToken);
                await StorageService.setUserData(response?.data?.data?.user);
                navigate('Home');
            }
            showToast(response?.data?.message, { type: response?.data?.success ? 'success' : 'error' });
            setLoading(false);
            return response?.data;
        } catch (error: any) {
            showToast(error?.response?.data?.message || 'Login failed', { type: 'error' });
            setLoading(false);
            throw error;
        }
    };
};

export const sendOTP = (phone: string, callback: (loading: boolean) => void) => {
    return async (dispatch: any) => {
        try {
            const response = await postData(AUTH_ENDPOINTS.SEND_OTP, {
                data: { phone },
                showConsole: true,
            });
            showToast(response?.data?.message, { type: response?.data?.success ? 'success' : 'error' });
            callback(response?.data);
            return response?.data;
        } catch (error: any) {
            showToast(error?.response?.data?.message || 'Failed to send OTP', { type: 'error' });
            callback(error);
            throw error;
        }
    };
};

export const verifyOTP = (phone: string, otp: string, callback: (loading: boolean) => void) => {
    return async (dispatch: any) => {
        try {
            const response = await postData(AUTH_ENDPOINTS.VERIFY_OTP, {
                data: { phone, otp },
                showConsole: true,
            });
            if (response?.data?.success && response?.data?.data) {
                await StorageService.setAccessToken(response?.data?.data?.tokens?.accessToken);
                await StorageService.setRefreshToken(response?.data?.data?.tokens?.refreshToken);
                await StorageService.setUserData(response?.data?.data?.user);
                navigate('Home');
            }
            callback(response?.data);
            showToast(response?.data?.message, { type: response?.data?.success ? 'success' : 'error' });
            return response?.data;
        } catch (error: any) {
            showToast(error?.response?.data?.message || 'OTP verification failed', { type: 'error' });
            callback(error);
            throw error;
        }
    };
};

export const refreshToken = async () => {
    try {
        const refreshToken = await StorageService.getRefreshToken();
        const response = await postData(AUTH_ENDPOINTS.REFRESH_TOKEN, {
            data: { refreshToken },
            showConsole: true,
        });

        if (response?.data?.success && response?.data?.data) {
            await StorageService.setAccessToken(response?.data?.data?.accessToken);
            await StorageService.setRefreshToken(response?.data?.data?.refreshToken);
        }

        return response?.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const refreshToken = await StorageService.getRefreshToken();
        const response = await postData(AUTH_ENDPOINTS.LOGOUT, {
            data: { refreshToken },
            showConsole: true,
        });

        await StorageService.clearAuth();
        reset('Login' as never);

        return response?.data;
    } catch (error) {
        await StorageService.clearAuth();
        reset('Login' as never);
        throw error;
    }
};


export const deactivateUser = async () => {
    try {
        const refreshToken = await StorageService.getRefreshToken();
        const response = await postData(AUTH_ENDPOINTS.LOGOUT, {
            data: { refreshToken },
            showConsole: true,
        });

        await StorageService.clearAuth();
        reset('Login' as never);

        return response?.data;
    } catch (error) {
        await StorageService.clearAuth();
        reset('Login' as never);
        throw error;
    }
};
