import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
    ACCESS_TOKEN: '@matrimonial_access_token',
    REFRESH_TOKEN: '@matrimonial_refresh_token',
    USER_DATA: '@matrimonial_user_data',
};

export const StorageService = {
    async setAccessToken(token: string): Promise<void> {
        await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    },

    async getAccessToken(): Promise<string | null> {
        return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    },

    async setRefreshToken(token: string): Promise<void> {
        await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    },

    async getRefreshToken(): Promise<string | null> {
        return await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    },

    async setUserData(userData: any): Promise<void> {
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    },

    async getUserData(): Promise<any | null> {
        const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
        return data ? JSON.parse(data) : null;
    },

    async clearAuth(): Promise<void> {
        await AsyncStorage.multiRemove([
            STORAGE_KEYS.ACCESS_TOKEN,
            STORAGE_KEYS.REFRESH_TOKEN,
            STORAGE_KEYS.USER_DATA,
        ]);
    },
};
