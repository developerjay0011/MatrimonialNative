import { styles } from './styles';
import { useAppDispatch } from '../../redux/hooks';
import { useMemo, useRef, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { registerUser } from '../../redux/actions/auth';
import { FormInput } from '../../components/common/FormInput';
import { StepHeader } from '../../components/common/StepHeader';
import { FormButton } from '../../components/common/FormButton';
import { ProgressBar } from '../../components/common/ProgressBar';
import { GenderSelector } from '../../components/common/GenderSelector';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { DatePickerInput } from '../../components/common/DatePickerInput';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { pickMultiplePhotos, pickSinglePhoto, UploadedPhoto } from '../../utils/photoUpload';
import { PermissionRequestModal, PermissionRequestModalRef } from '../../components/common/PermissionRequestModal';

interface RegistrationFlowProps {
  onBack: () => void;
}

export function RegistrationFlow({ onBack }: RegistrationFlowProps) {
  const maxPhotos = 6;
  const totalSteps = 3;
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "test10@gmail.com",
    phone: "1234567888",
    password: "Yash@123",
    fullName: "Yash",
    gender: "male",
    dateOfBirth: "2000-01-01",
    city: "Mumbai",
    currentState: "Maharashtra",
    occupation: "Student",
    age: "22",
    photos: [] as UploadedPhoto[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const permissionModalRef = useRef<PermissionRequestModalRef>(null);

  const remainingPhotoSlots = useMemo(() => maxPhotos - formData.photos.length, [formData.photos.length]);
  const updateField = (field: string, value: string) => { setFormData((prev) => ({ ...prev, [field]: value })) };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }

      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least 1 uppercase letter';
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        newErrors.password = 'Password must contain at least 1 special character';
      }

      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }

      if (!formData.gender) {
        newErrors.gender = 'Please select your gender';
      }

      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
      } else if (Number(formData.age) < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      } else if (Number(formData.age) > 100) {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }

      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }

      if (!formData.currentState.trim()) {
        newErrors.currentState = 'State is required';
      }
    }

    if (currentStep === 2) {
      if (!formData.occupation.trim()) {
        newErrors.occupation = 'Occupation is required';
      }
    }

    if (currentStep === 3) {
      if (formData.photos.length === 0) {
        newErrors.photos = 'Please add at least one photo';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < totalSteps) {
        setStep(step + 1);
        setErrors({});
      } else {
        setLoading(true);
        dispatch(registerUser({ ...formData, setLoading }));
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    } else {
      onBack();
    }
  };

  const pickPhotos = async (source: 'camera' | 'gallery') => {
    if (source === 'camera') {
      const photo = await pickSinglePhoto({
        source: 'camera',
        cropping: true,
        compressImageQuality: 0.8,
      });

      if (photo) {
        setFormData((prev) => ({
          ...prev,
          photos: prev.photos.length >= maxPhotos ? prev.photos : [...prev.photos, photo],
        }));
      }

      return;
    }

    const picked = await pickMultiplePhotos({
      source: 'gallery',
      cropping: true,
      compressImageQuality: 0.8,
      maxFiles: Math.max(0, remainingPhotoSlots),
    });

    if (picked.length) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...picked].slice(0, maxPhotos),
      }));
    }
  };

  const handlePickPress = async (source: 'camera' | 'gallery') => {
    if (Platform.OS === 'android') {
      const ok = await permissionModalRef.current?.ensureAndroidPermissions({
        permissions: ["android.permission.CAMERA"],
        title: 'Allow access',
        description: `We need access to your ${source === 'camera' ? 'camera' : 'photos'} to add profile pictures.`,
        explainerKey: `registration_${source}`,
      });

      if (!ok) return;
    }

    await pickPhotos(source);
  };

  const removePhoto = (index: number) => { setFormData((prev) => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index), })); };

  return (
    <CustomSafeAreaView
      barStyle="dark-content"
      style={styles.container}
      edges={['top', 'right', 'bottom', 'left']}
    >
      {/* Header */}
      <StepHeader currentStep={step} totalSteps={totalSteps} onBack={handleBack} />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <ProgressBar currentStep={step} totalSteps={totalSteps} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          key={step}
          entering={FadeInRight.duration(300)}
          exiting={FadeOutLeft.duration(200)}
        >
          {step === 1 && (
            <View>
              <Text style={styles.title}>Basic Details</Text>
              <Text style={styles.subtitle}>Let's start with your basic information</Text>

              <FormInput
                label="Full Name"
                required
                value={formData.fullName}
                onChangeText={(value) => {
                  updateField("fullName", value);
                  setErrors(prev => ({ ...prev, fullName: '' }));
                }}
                placeholder="Enter your full name"
                error={errors.fullName}
              />

              <FormInput
                label="Email"
                required
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(value) => {
                  updateField("email", value);
                  setErrors(prev => ({ ...prev, email: '' }));
                }}
                placeholder="Enter your email"
                error={errors.email}
              />

              <FormInput
                type="phone"
                label="Phone"
                required
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(value) => {
                  updateField("phone", value);
                  setErrors(prev => ({ ...prev, phone: '' }));
                }}
                placeholder="Enter your phone number"
                error={errors.phone}
              />

              <FormInput
                label="Password"
                required
                secureTextEntry
                value={formData.password}
                onChangeText={(value) => {
                  updateField("password", value);
                  setErrors(prev => ({ ...prev, password: '' }));
                }}
                placeholder="Create a password"
                error={errors.password}
              />


              <GenderSelector
                label="Gender"
                required
                value={formData.gender}
                onChange={(value) => {
                  updateField("gender", value);
                  setErrors(prev => ({ ...prev, gender: '' }));
                }}
              />
              {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

              <DatePickerInput
                label="Date of Birth"
                required
                value={formData.dateOfBirth}
                onChange={(date, age) => {
                  updateField('dateOfBirth', date);
                  updateField('age', age.toString());
                  setErrors(prev => ({ ...prev, dateOfBirth: '' }));
                }}
                placeholder="Select your date of birth"
                error={errors.dateOfBirth}
                minDate={new Date(1924, 0, 1)}
              />

              <FormInput
                label="City"
                required
                value={formData.city}
                onChangeText={(value) => {
                  updateField("city", value);
                  setErrors(prev => ({ ...prev, city: '' }));
                }}
                placeholder="Enter your city"
                error={errors.city}
              />

              <FormInput
                label="State"
                required
                value={formData.currentState}
                onChangeText={(value) => {
                  updateField("currentState", value);
                  setErrors(prev => ({ ...prev, currentState: '' }));
                }}
                placeholder="Enter your state"
                error={errors.currentState}
              />
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={styles.title}>Professional Details</Text>
              <Text style={styles.subtitle}>Tell us about your profession</Text>

              <FormInput
                label="Occupation"
                required
                value={formData.occupation}
                onChangeText={(value) => {
                  updateField("occupation", value);
                  setErrors(prev => ({ ...prev, occupation: '' }));
                }}
                placeholder="e.g., Software Engineer"
                error={errors.occupation}
              />
            </View>
          )}

          {step === 3 && (
            <View>
              <Text style={styles.title}>Add Photos</Text>
              <Text style={styles.subtitle}>Upload your profile photos</Text>

              <View style={styles.photoPickerCardsRow}>
                <TouchableOpacity
                  style={[styles.photoPickerCard, remainingPhotoSlots <= 0 && styles.photoPickerCardDisabled]}
                  disabled={remainingPhotoSlots <= 0}
                  onPress={() => handlePickPress('camera')}
                >
                  <Text style={styles.photoPickerIcon}>📷</Text>
                  <Text style={styles.photoPickerTitle}>Camera</Text>
                  <Text style={styles.photoPickerSubtitle}>Take a new photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.photoPickerCard, remainingPhotoSlots <= 0 && styles.photoPickerCardDisabled]}
                  disabled={remainingPhotoSlots <= 0}
                  onPress={() => handlePickPress('gallery')}
                >
                  <Text style={styles.photoPickerIcon}>🖼️</Text>
                  <Text style={styles.photoPickerTitle}>Gallery</Text>
                  <Text style={styles.photoPickerSubtitle}>Choose from photos</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.photoHint}>{formData.photos.length}/{maxPhotos} photos selected</Text>
              {errors.photos && <Text style={styles.errorText}>{errors.photos}</Text>}

              <View style={styles.photoGrid}>
                {formData.photos.map((p, idx) => (
                  <View key={`${p.uri}-${idx}`} style={styles.photoTile}>
                    <Image source={{ uri: p.uri }} style={styles.photoImage} />
                    <TouchableOpacity onPress={() => removePhoto(idx)} style={styles.removePhotoButton}>
                      <Text style={styles.removePhotoText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                {formData.photos.length === 0 && (
                  <View style={styles.photoEmpty}>
                    <Text style={styles.photoEmptyTitle}>Add at least 1 photo</Text>
                    <Text style={styles.photoEmptySubtitle}>You can add up to {maxPhotos} photos.</Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <FormButton
          title={step === totalSteps ? (loading ? "Registering..." : "✓ Complete Registration") : "Continue →"}
          onPress={handleNext}
          loading={loading}
        />
      </View>

      <PermissionRequestModal ref={permissionModalRef} />
    </CustomSafeAreaView>
  );
}


