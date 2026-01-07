import { getData, postData, deleteData } from '../../api/apiRequest';
import { showToast } from '../../utils/toast';

const CHAT_ENDPOINTS = {
    GET_ALL_CHATS: 'chats',
    GET_MESSAGES: 'chats/',
    SEND_MESSAGE: 'chats/messages',
    CREATE_CHAT: 'chats/create',
    DELETE_CHAT: 'chats/',
};

export const getAllChats = async () => {
    try {
        const response = await getData(CHAT_ENDPOINTS.GET_ALL_CHATS, { showConsole: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getChatMessages = async (chatId: string) => {
    try {
        const response = await getData(`${CHAT_ENDPOINTS.GET_MESSAGES}${chatId}/messages`, {
            showConsole: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendMessage = async (chatId: string, content: string, messageType: 'text' | 'image' | 'file' = 'text') => {
    try {
        const response = await postData(CHAT_ENDPOINTS.SEND_MESSAGE, {
            data: { chatId, content, messageType },
            showConsole: true,
        });
        return response.data;
    } catch (error: any) {
        showToast(error?.message || 'Failed to send message', { type: 'error' });
        throw error;
    }
};

export const createChat = async (userId: string) => {
    try {
        const response = await postData(CHAT_ENDPOINTS.CREATE_CHAT, {
            data: { userId },
            showConsole: true,
        });

        if (response?.data?.success) {
            showToast(response.data.message || 'Chat created', { type: 'success' });
        }

        return response.data;
    } catch (error: any) {
        showToast(error?.message || 'Failed to create chat', { type: 'error' });
        throw error;
    }
};

export const deleteChat = async (chatId: string) => {
    try {
        const response = await deleteData(`${CHAT_ENDPOINTS.DELETE_CHAT}${chatId}`, {
            showConsole: true,
        });

        if (response?.data?.success) {
            showToast(response.data.message || 'Chat deleted', { type: 'success' });
        }

        return response.data;
    } catch (error: any) {
        showToast(error?.message || 'Failed to delete chat', { type: 'error' });
        throw error;
    }
};
