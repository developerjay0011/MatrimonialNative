import Toast from "react-native-root-toast";

type ToastType = 'success' | 'error' | 'info' | 'warning';
type ToastPosition = 'top' | 'bottom' | 'center';

interface ToastOptions {
    type?: ToastType;
    duration?: number;
    position?: ToastPosition;
}

const getToastConfig = (type: ToastType) => {
    switch (type) {
        case 'success':
            return {
                backgroundColor: '#22c55e',
                textColor: '#ffffff',
                icon: '✓',
            };
        case 'error':
            return {
                backgroundColor: '#ef4444',
                textColor: '#ffffff',
                icon: '✕',
            };
        case 'info':
            return {
                backgroundColor: '#3b82f6',
                textColor: '#ffffff',
                icon: 'ℹ',
            };
        case 'warning':
            return {
                backgroundColor: '#f59e0b',
                textColor: '#ffffff',
                icon: '⚠',
            };
        default:
            return {
                backgroundColor: '#374151',
                textColor: '#ffffff',
                icon: '',
            };
    }
};

const getPositionValue = (position: ToastPosition) => {
    switch (position) {
        case 'top':
            return Toast.positions.TOP;
        case 'bottom':
            return Toast.positions.BOTTOM;
        case 'center':
            return Toast.positions.CENTER;
        default:
            return Toast.positions.TOP;
    }
};

export const showToast = (message: string, options?: ToastOptions) => {
    const type = options?.type || 'info';
    const duration = options?.duration || 3000;
    const position = options?.position || 'top';

    const config = getToastConfig(type);
    const displayMessage = config.icon ? `${config.icon}  ${message}` : message;
    if (!message) return
    Toast.show(displayMessage, {
        duration,
        position: getPositionValue(position),
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: config.backgroundColor,
        textColor: config.textColor,
        opacity: 1,
        textStyle: {
            fontSize: 15,
            fontWeight: '500',
        },
        containerStyle: {
            borderRadius: 8,
            paddingHorizontal: 20,
            paddingVertical: 12,
        },
    });
};
