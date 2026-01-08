import { styles } from './styles';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  withRepeat,
  FadeIn
} from 'react-native-reanimated';
import { getMyProfile } from '../../redux/actions';
import { useAppDispatch } from '../../redux/hooks';
import { StorageService } from '../../utils/storage';
import { replace } from '../../navigation/RootNavigation';
import LinearGradient from 'react-native-linear-gradient';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';

export function SplashScreen() {
  // Animation values
  const dispatch = useAppDispatch();
  const containerOpacity = useSharedValue(0);
  const containerScale = useSharedValue(0.5);

  const iconScale = useSharedValue(0);

  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(20);

  const subtitleOpacity = useSharedValue(0);

  const footerOpacity = useSharedValue(0);

  useEffect(() => {
    // Container entry
    containerOpacity.value = withTiming(1, { duration: 600 });
    containerScale.value = withTiming(1, { duration: 600 });

    // Icon entry
    iconScale.value = withDelay(200, withSpring(1, { stiffness: 200 }));

    // Title entry
    titleOpacity.value = withDelay(400, withTiming(1));
    titleY.value = withDelay(400, withTiming(0));

    // Subtitle entry
    subtitleOpacity.value = withDelay(600, withTiming(1));

    // Footer entry
    footerOpacity.value = withDelay(1000, withTiming(1));

    (async () => {
      const token = await StorageService.getAccessToken()
      dispatch(getMyProfile());
      console.log("token", token)
      setTimeout(() => {
        if (token) {
          replace('Home')
        } else {
          replace('Login')
        }
      }, 1000);
    })()
  }, []);

  // Styles
  const containerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{ scale: containerScale.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const footerStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
  }));

  return (
    <CustomSafeAreaView
      barColor="#f97316"
      barStyle="light-content"
      style={styles.safeArea}
      edges={['right', 'left']}
      headerComponent={(insets) => (
        <LinearGradient
          colors={['#f97316', '#ea580c']}
          style={[styles.headerGradient, { height: insets.top }]}
        />
      )}
    >
      <LinearGradient
        colors={['#f97316', '#ea580c']}
        style={styles.mainGradient}
      >
        <Animated.View style={[containerStyle, styles.container]}>
          {/* Logo Icon */}
          <Animated.View style={[iconStyle, styles.iconWrapper]}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>❤️</Text>
            </View>
          </Animated.View>

          {/* App Name */}
          <Animated.Text
            style={[titleStyle, styles.title]}
          >
            Dhimmar Samaj
          </Animated.Text>

          {/* Tagline */}
          <Animated.Text style={[subtitleStyle, styles.subtitle]}>
            Find Your Perfect Match
          </Animated.Text>

          {/* Loading Indicator */}
          <LoadingDots delay={800} />

        </Animated.View>

        {/* Bottom Text */}
        <Animated.View style={[footerStyle, styles.footer]}>
          <Text style={styles.footerText}>Connecting Hearts, Building Futures</Text>
        </Animated.View>
      </LinearGradient>
    </CustomSafeAreaView>
  );
}

function LoadingDots({ delay }: { delay: number }) {
  // Simple loading dots implementation
  return (
    <Animated.View
      entering={FadeIn.delay(delay)}
      style={styles.loadingDotsContainer}
    >
      {[0, 1, 2].map((i) => (
        <Dot key={i} index={i} />
      ))}
    </Animated.View>
  );
}

function Dot({ index }: { index: number }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    const duration = 1000;
    const delay = index * 200;

    scale.value = withDelay(delay, withRepeat(withSequence(withTiming(1.5, { duration: duration / 2 }), withTiming(1, { duration: duration / 2 })), -1, true));
    opacity.value = withDelay(delay, withRepeat(withSequence(withTiming(1, { duration: duration / 2 }), withTiming(0.5, { duration: duration / 2 })), -1, true));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }));

  return (
    <Animated.View style={[style, styles.dot]} />
  );
}
