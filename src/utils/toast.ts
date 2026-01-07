import { Toast } from 'toastify-react-native';

type ToastType = 'success' | 'error' | 'info' | 'warning';
type ToastPosition = 'top' | 'bottom' | 'center';

interface ToastOptions {
    type?: ToastType;
    duration?: number;
    position?: ToastPosition;
}

export const showToast = (message: string, options?: ToastOptions) => {
    if (options?.type === 'success') {
        Toast.success(message, options?.position || 'top');
    } else if (options?.type === 'error') {
        Toast.error(message, options?.position || 'top');
    } else if (options?.type === 'info') {
        Toast.info(message, options?.position || 'top');
    } else if (options?.type === 'warning') {
        Toast.warn(message, options?.position || 'top');
    }
};
