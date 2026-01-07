import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';
import { FormInput } from '../../components/common/FormInput';
import { FormButton } from '../../components/common/FormButton';
import { GenderSelector } from '../../components/common/GenderSelector';
import { ProgressBar } from '../../components/common/ProgressBar';
import { StepHeader } from '../../components/common/StepHeader';
import { styles } from './styles';

interface RegistrationFlowProps {
  onComplete: (userData: any) => void;
  onBack: () => void;
}

export function RegistrationFlow({ onComplete, onBack }: RegistrationFlowProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    city: "",
    occupation: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  return (
    <CustomSafeAreaView
      barStyle="dark-content"
      style={styles.container}
      edges={['top', 'right', 'bottom', 'left']}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        {/* Header */}
        <StepHeader currentStep={step} totalSteps={totalSteps} onBack={onBack} />

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
                  onChangeText={(value) => updateField("fullName", value)}
                  placeholder="Enter your full name"
                />

                <GenderSelector
                  label="Gender"
                  required
                  value={formData.gender}
                  onChange={(value) => updateField("gender", value)}
                />

                <FormInput
                  label="Age"
                  required
                  keyboardType="number-pad"
                  value={formData.age}
                  onChangeText={(value) => updateField("age", value)}
                  placeholder="Enter your age"
                />

                <FormInput
                  label="City"
                  required
                  value={formData.city}
                  onChangeText={(value) => updateField("city", value)}
                  placeholder="Enter your city"
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
                  onChangeText={(value) => updateField("occupation", value)}
                  placeholder="e.g., Software Engineer"
                />
              </View>
            )}

            {step === 3 && (
              <View>
                <Text style={styles.title}>Lifestyle Preferences</Text>
                <Text style={styles.subtitle}>Share your lifestyle choices</Text>

                <View style={styles.placeholderBox}>
                  <Text style={styles.placeholderText}>Step 3 content (simplified for demo)</Text>
                </View>
              </View>
            )}

            {step === 4 && (
              <View>
                <Text style={styles.title}>Add Photos</Text>
                <Text style={styles.subtitle}>Upload your profile photos</Text>

                <View style={styles.placeholderBox}>
                  <Text style={styles.placeholderText}>Step 4 content (simplified for demo)</Text>
                </View>
              </View>
            )}
          </Animated.View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.buttonContainer}>
          <FormButton
            title={step === totalSteps ? "✓ Complete Registration" : "Continue →"}
            onPress={handleNext}
          />
        </View>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
}


