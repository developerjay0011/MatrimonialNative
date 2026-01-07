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
import LinearGradient from 'react-native-linear-gradient';
import { CustomSafeAreaView } from '../../components/CustomSafeAreaView';

export function SplashScreen() {
  // Animation values
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
      style={{ flex: 1 }}
      edges={['right', 'left']}
      headerComponent={(insets) => (
        <LinearGradient
          colors={['#f97316', '#ea580c']}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: insets.top }}
        />
      )}
    >
      <LinearGradient
        colors={['#f97316', '#ea580c']}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Animated.View style={[containerStyle, { alignItems: 'center' }]}>
          {/* Logo Icon */}
          <Animated.View style={[iconStyle, { marginBottom: 24 }]}>
            <View className="w-24 h-24 bg-white rounded-full items-center justify-center shadow-2xl">
              <Text style={{ fontSize: 48 }}>❤️</Text>
            </View>
          </Animated.View>

          {/* App Name */}
          <Animated.Text
            style={[titleStyle, { fontSize: 36, fontWeight: '600', color: 'white', marginBottom: 8 }]}
          >
            Dhimmar Samaj
          </Animated.Text>

          <Animated.Text
            style={[subtitleStyle, { color: 'rgba(255,255,255,0.9)', fontSize: 16 }]}
          >
            Find Your Perfect Match
          </Animated.Text>

          {/* Loading Indicator */}
          <LoadingDots delay={800} />

        </Animated.View>

        {/* Bottom Text */}
        <Animated.View style={[footerStyle, { position: 'absolute', bottom: 32 }]}>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>Connecting Hearts, Building Futures</Text>
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
      className="mt-12 flex-row gap-2"
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
    <Animated.View style={[style, { width: 8, height: 8, backgroundColor: 'white', borderRadius: 4, marginHorizontal: 2 }]} />
  );
}
