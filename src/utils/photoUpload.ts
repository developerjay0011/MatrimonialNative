import ImagePicker, {
    Image as CropPickerImage,
    Options as CropPickerOptions,
} from 'react-native-image-crop-picker';

export type PhotoSource = 'camera' | 'gallery';

export type UploadedPhoto = {
    uri: string;
    name: string;
    type: string;
    size?: number;
    width?: number;
    height?: number;
};

export type PickPhotoOptions = {
    source: PhotoSource;
    cropping?: boolean;
    cropperCircleOverlay?: boolean;
    width?: number;
    height?: number;
    includeBase64?: boolean;
    compressImageQuality?: number;
    compressImageMaxWidth?: number;
    compressImageMaxHeight?: number;
    mediaType?: 'photo' | 'any';
};

export type PickMultiplePhotosOptions = Omit<PickPhotoOptions, 'source'> & {
    maxFiles?: number;
};

function getFileNameFromPath(path?: string, fallback = 'photo.jpg') {
    if (!path) return fallback;
    const parts = path.split('/');
    const last = parts[parts.length - 1];
    return last || fallback;
}

function normalizePickedImage(image: CropPickerImage): UploadedPhoto {
    const uri = image.path;
    const type = image.mime || 'image/jpeg';
    const name = getFileNameFromPath(image.filename || image.path);

    return {
        uri,
        name,
        type,
        size: image.size,
        width: image.width,
        height: image.height,
    };
}

function buildOptions(options: PickPhotoOptions): CropPickerOptions {
    return {
        mediaType: options.mediaType ?? 'photo',
        cropping: options.cropping ?? true,
        cropperCircleOverlay: options.cropperCircleOverlay ?? false,
        width: options.width,
        height: options.height,
        includeBase64: options.includeBase64 ?? false,
        compressImageQuality: options.compressImageQuality ?? 0.8,
        compressImageMaxWidth: options.compressImageMaxWidth,
        compressImageMaxHeight: options.compressImageMaxHeight,
        forceJpg: true,
    };
}

export async function pickSinglePhoto(options: PickPhotoOptions): Promise<UploadedPhoto | null> {
    const pickerOptions = buildOptions(options);
    try {
        const image =
            options.source === 'camera'
                ? await ImagePicker.openCamera(pickerOptions)
                : await ImagePicker.openPicker(pickerOptions);

        if (!image) return null;
        return normalizePickedImage(image);
    } catch (e: any) {
        const msg = String(e?.message ?? e);
        if (e?.code === 'E_PICKER_CANCELLED' || msg.toLowerCase().includes('cancel')) {
            return null;
        }
        // Handle Android "Activity doesn't exist" and other permission/linking errors
        if (msg.includes("Activity doesn't exist") || msg.includes('Permission') || e?.code === 'E_NO_CAMERA_PERMISSION' || e?.code === 'E_NO_LIBRARY_PERMISSION') {
            console.log('Photo picker error:', msg);
            return null;
        }
        throw e;
    }
}

export async function pickMultiplePhotos(
    options: PickMultiplePhotosOptions & { source: 'gallery' }
): Promise<UploadedPhoto[]> {
    const pickerOptions: CropPickerOptions = {
        ...buildOptions({ ...options, source: 'gallery' }),
        multiple: true,
        maxFiles: options.maxFiles,
    };

    try {
        const images = await ImagePicker.openPicker(pickerOptions);
        if (!images) return [];

        const arr = Array.isArray(images) ? images : [images];
        return arr.map(normalizePickedImage);
    } catch (e: any) {
        const msg = String(e?.message ?? e);
        if (e?.code === 'E_PICKER_CANCELLED' || msg.toLowerCase().includes('cancel')) {
            return [];
        }
        // Handle Android "Activity doesn't exist" and other permission/linking errors
        if (msg.includes("Activity doesn't exist") || msg.includes('Permission') || e?.code === 'E_NO_CAMERA_PERMISSION' || e?.code === 'E_NO_LIBRARY_PERMISSION') {
            console.log('Photo picker error:', msg);
            return [];
        }
        throw e;
    }
}

export async function cleanupTempImages() {
    try {
        await ImagePicker.clean();
    } catch {
        // ignore
    }
}
