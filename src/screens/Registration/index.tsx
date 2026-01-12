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
import { useTranslation } from 'react-i18next';

interface RegistrationFlowProps {
  onBack: () => void;
}

export function RegistrationFlow({ onBack }: RegistrationFlowProps) {
  const { t } = useTranslation();
  const maxPhotos = 6;
  const totalSteps = 3;
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    fullName: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    currentState: "",
    occupation: "",
    age: "",
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
        newErrors.email = t('registration.errors.emailRequired');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('registration.errors.emailInvalid');
      }

      if (!formData.phone.trim()) {
        newErrors.phone = t('registration.errors.phoneRequired');
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = t('registration.errors.phoneInvalid');
      }

      if (!formData.password.trim()) {
        newErrors.password = t('registration.errors.passwordRequired');
      } else if (formData.password.length < 8) {
        newErrors.password = t('registration.errors.passwordMinLength');
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = t('registration.errors.passwordUppercase');
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        newErrors.password = t('registration.errors.passwordSpecial');
      }

      if (!formData.fullName.trim()) {
        newErrors.fullName = t('registration.errors.fullNameRequired');
      }

      if (!formData.gender) {
        newErrors.gender = t('registration.errors.genderRequired');
      }

      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = t('registration.errors.dobRequired');
      } else if (Number(formData.age) < 18) {
        newErrors.dateOfBirth = t('registration.errors.dobMinAge');
      } else if (Number(formData.age) > 100) {
        newErrors.dateOfBirth = t('registration.errors.dobInvalid');
      }

      if (!formData.city.trim()) {
        newErrors.city = t('registration.errors.cityRequired');
      }

      if (!formData.currentState.trim()) {
        newErrors.currentState = t('registration.errors.stateRequired');
      }
    }

    if (currentStep === 2) {
      if (!formData.occupation.trim()) {
        newErrors.occupation = t('registration.errors.occupationRequired');
      }
    }

    if (currentStep === 3) {
      if (formData.photos.length === 0) {
        newErrors.photos = t('registration.errors.photosRequired');
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
        const trimmedData = {
          ...formData,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password.trim(),
          fullName: formData.fullName.trim(),
          gender: formData.gender.trim(),
          dateOfBirth: formData.dateOfBirth.trim(),
          city: formData.city.trim(),
          currentState: formData.currentState.trim(),
          occupation: formData.occupation.trim(),
          age: formData.age,
          setLoading,
        };
        dispatch(registerUser(trimmedData));
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
        title: t('permissions.allowAccessTitle'),
        description: t(source === 'camera' ? 'permissions.cameraDescription' : 'permissions.photosDescription'),
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
              <Text style={styles.title}>{t('registration.basicDetailsTitle')}</Text>
              <Text style={styles.subtitle}>{t('registration.basicDetailsSubtitle')}</Text>

              <FormInput
                label={t('registration.fullName')}
                required
                value={formData.fullName}
                onChangeText={(value) => {
                  updateField("fullName", value);
                  setErrors(prev => ({ ...prev, fullName: '' }));
                }}
                placeholder={t('registration.fullNamePlaceholder')}
                error={errors.fullName}
              />

              <FormInput
                label={t('registration.email')}
                required
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(value) => {
                  updateField("email", value);
                  setErrors(prev => ({ ...prev, email: '' }));
                }}
                placeholder={t('registration.emailPlaceholder')}
                error={errors.email}
              />

              <FormInput
                type="phone"
                label={t('registration.phone')}
                required
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(value) => {
                  updateField("phone", value);
                  setErrors(prev => ({ ...prev, phone: '' }));
                }}
                placeholder={t('registration.phonePlaceholder')}
                error={errors.phone}
              />

              <FormInput
                label={t('registration.password')}
                required
                secureTextEntry
                value={formData.password}
                onChangeText={(value) => {
                  updateField("password", value);
                  setErrors(prev => ({ ...prev, password: '' }));
                }}
                placeholder={t('registration.passwordPlaceholder')}
                error={errors.password}
              />


              <GenderSelector
                label={t('registration.gender')}
                required
                value={formData.gender}
                onChange={(value) => {
                  updateField("gender", value);
                  setErrors(prev => ({ ...prev, gender: '' }));
                }}
              />
              {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

              <DatePickerInput
                label={t('registration.dateOfBirth')}
                required
                value={formData.dateOfBirth}
                onChange={(date, age) => {
                  updateField('dateOfBirth', date);
                  updateField('age', age.toString());
                  setErrors(prev => ({ ...prev, dateOfBirth: '' }));
                }}
                placeholder={t('registration.dateOfBirthPlaceholder')}
                error={errors.dateOfBirth}
                minDate={new Date(1924, 0, 1)}
              />

              <FormInput
                label={t('registration.city')}
                required
                value={formData.city}
                onChangeText={(value) => {
                  updateField("city", value);
                  setErrors(prev => ({ ...prev, city: '' }));
                }}
                placeholder={t('registration.cityPlaceholder')}
                error={errors.city}
              />

              <FormInput
                label={t('registration.state')}
                required
                value={formData.currentState}
                onChangeText={(value) => {
                  updateField("currentState", value);
                  setErrors(prev => ({ ...prev, currentState: '' }));
                }}
                placeholder={t('registration.statePlaceholder')}
                error={errors.currentState}
              />
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={styles.title}>{t('registration.professionalDetailsTitle')}</Text>
              <Text style={styles.subtitle}>{t('registration.professionalDetailsSubtitle')}</Text>

              <FormInput
                label={t('registration.occupation')}
                required
                value={formData.occupation}
                onChangeText={(value) => {
                  updateField("occupation", value);
                  setErrors(prev => ({ ...prev, occupation: '' }));
                }}
                placeholder={t('registration.occupationPlaceholder')}
                error={errors.occupation}
              />
            </View>
          )}

          {step === 3 && (
            <View>
              <Text style={styles.title}>{t('registration.addPhotosTitle')}</Text>
              <Text style={styles.subtitle}>{t('registration.addPhotosSubtitle')}</Text>

              <View style={styles.photoPickerCardsRow}>
                <TouchableOpacity
                  style={[styles.photoPickerCard, remainingPhotoSlots <= 0 && styles.photoPickerCardDisabled]}
                  disabled={remainingPhotoSlots <= 0}
                  onPress={() => handlePickPress('camera')}
                >
                  <Text style={styles.photoPickerIcon}>📷</Text>
                  <Text style={styles.photoPickerTitle}>{t('registration.camera')}</Text>
                  <Text style={styles.photoPickerSubtitle}>{t('registration.takeNewPhoto')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.photoPickerCard, remainingPhotoSlots <= 0 && styles.photoPickerCardDisabled]}
                  disabled={remainingPhotoSlots <= 0}
                  onPress={() => handlePickPress('gallery')}
                >
                  <Text style={styles.photoPickerIcon}>🖼️</Text>
                  <Text style={styles.photoPickerTitle}>{t('registration.gallery')}</Text>
                  <Text style={styles.photoPickerSubtitle}>{t('registration.chooseFromPhotos')}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.photoHint}>{t('registration.photosSelected', { selected: formData.photos.length, max: maxPhotos })}</Text>
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
                    <Text style={styles.photoEmptyTitle}>{t('registration.photoEmptyTitle')}</Text>
                    <Text style={styles.photoEmptySubtitle}>{t('registration.photoEmptySubtitle', { max: maxPhotos })}</Text>
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
          title={step === totalSteps ? (loading ? t('registration.registering') : t('registration.completeRegistrationCta')) : t('registration.continue')}
          onPress={handleNext}
          loading={loading}
        />
      </View>

      <PermissionRequestModal ref={permissionModalRef} />
    </CustomSafeAreaView>
  );
}


