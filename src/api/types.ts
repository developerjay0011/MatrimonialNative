export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    phone: string;
    password: string;
    fullName: string;
    age: string;
    dateOfBirth: string;
    gender: string;
    city: string;
    occupation: string;
    currentState: string;
    photos?: any[];
}

export interface OTPRequest {
    phone: string;
}

export interface OTPVerifyRequest {
    phone: string;
    otp: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface User {
    id: string;
    email: string;
    phone: string;
    fullName: string;
    age: string;
    dateOfBirth: string;
    gender: string;
    city: string;
    occupation: string;
    currentState: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data: T;
}

export interface ProfileUpdateRequest {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: string;
    height?: number;
    weight?: number;
    complexion?: string;
    maritalStatus?: string;
    education?: string;
    occupation?: string;
    currentCity?: string;
    currentState?: string;
    aboutMe?: string;
}

export interface FamilyDetailsRequest {
    fatherName?: string;
    motherName?: string;
    fatherOccupation?: string;
    motherOccupation?: string;
    brothers?: number;
    sisters?: number;
    familyType?: string;
    familyValues?: string;
}

export interface PhotoUploadRequest {
    photo: any;
    isProfilePhoto?: boolean;
}

export interface MatchFilters {
    page?: number;
    limit?: number;
}

export interface SearchRequest {
    ageMin?: number;
    ageMax?: number;
    heightMin?: number;
    heightMax?: number;
    maritalStatus?: string[];
    education?: string[];
    location?: string[];
    page?: number;
    limit?: number;
}

export interface InterestRequest {
    toUserId: string;
    message?: string;
}

export interface MessageRequest {
    chatId: string;
    content: string;
    messageType: 'text' | 'image' | 'file';
}
