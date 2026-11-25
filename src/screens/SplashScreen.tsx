import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import Svg, {
  Path,
  Rect,
  Defs,
  RadialGradient,
  Stop,
} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withDelay,
  withSpring,
  withRepeat,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { typography, fontFamilies } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { motion } from '../animation/motion';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface SplashScreenProps {
  onFinish: () => void;
}

const BRAND_LETTERS = ['É', 'L', 'E', 'R', 'A'];

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // Master container dissolve
  const containerScale = useSharedValue(1);
  const containerOpacity = useSharedValue(1);

  // Ethereal Violet glow pulse
  const glowScale = useSharedValue(0.8);
  const glowOpacity = useSharedValue(0);

  // SVG Stroke draw
  const strokeProgress = useSharedValue(1); // 1 = fully hidden, 0 = fully drawn

  // Monogram scale & fade
  const logoScale = useSharedValue(0.9);
  const logoOpacity = useSharedValue(0);

  // Individual letter animations: 5 letters
  const letterY0 = useSharedValue(22);
  const letterOp0 = useSharedValue(0);
  const letterY1 = useSharedValue(22);
  const letterOp1 = useSharedValue(0);
  const letterY2 = useSharedValue(22);
  const letterOp2 = useSharedValue(0);
  const letterY3 = useSharedValue(22);
  const letterOp3 = useSharedValue(0);
  const letterY4 = useSharedValue(22);
  const letterOp4 = useSharedValue(0);

  // Gold rule sweep
  const goldLineWidth = useSharedValue(0);
  const goldLineOpacity = useSharedValue(0);

  // Subtitle reveal
  const subtitleOpacity = useSharedValue(0);
  const subtitleY = useSharedValue(8);

  useEffect(() => {
    // 1. Soft atmospheric violet glow fade & breathe
    glowOpacity.value = withTiming(0.85, { duration: 900 });
    glowScale.value = withRepeat(
      withSequence(
        withTiming(1.18, { duration: 1600, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.95, { duration: 1600, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // 2. SVG Monogram stroke draw
    logoOpacity.value = withTiming(1, { duration: 600 });
    logoScale.value = withSpring(1, motion.spring.soft);
    strokeProgress.value = withTiming(0, {
      duration: 1100,
      easing: motion.easing.reveal,
    });

    // 3. Staggered letter-by-letter reveal
    const letters = [
      { y: letterY0, op: letterOp0 },
      { y: letterY1, op: letterOp1 },
      { y: letterY2, op: letterOp2 },
      { y: letterY3, op: letterOp3 },
      { y: letterY4, op: letterOp4 },
    ];

    letters.forEach((item, index) => {
      const delay = 450 + index * 75;
      item.y.value = withDelay(
        delay,
        withTiming(0, { duration: 500, easing: motion.easing.reveal })
      );
      item.op.value = withDelay(delay, withTiming(1, { duration: 450 }));
    });

    // 4. Champagne gold line sweep
    goldLineWidth.value = withDelay(
      950,
      withTiming(90, { duration: 700, easing: motion.easing.reveal })
    );
    goldLineOpacity.value = withDelay(950, withTiming(1, { duration: 400 }));

    // 5. Editorial subtitle floating in
    subtitleY.value = withDelay(
      1150,
      withTiming(0, { duration: 600, easing: motion.easing.reveal })
    );
    subtitleOpacity.value = withDelay(1150, withTiming(0.9, { duration: 600 }));

    // 6. Smooth dissolve into application
    const exitTimer = setTimeout(() => {
      containerScale.value = withTiming(1.05, {
        duration: 480,
        easing: Easing.inOut(Easing.ease),
      });
      containerOpacity.value = withTiming(0, { duration: 480 }, () => {
        runOnJS(onFinish)();
      });
    }, 2800);

    return () => clearTimeout(exitTimer);
  }, []);

  // Animated styles
  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: containerScale.value }],
    opacity: containerOpacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: glowOpacity.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const goldLineStyle = useAnimatedStyle(() => ({
    width: goldLineWidth.value,
    opacity: goldLineOpacity.value,
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: subtitleY.value }],
    opacity: subtitleOpacity.value,
  }));

  const letterStyles = [
    useAnimatedStyle(() => ({
      transform: [{ translateY: letterY0.value }],
      opacity: letterOp0.value,
    })),
    useAnimatedStyle(() => ({
      transform: [{ translateY: letterY1.value }],
      opacity: letterOp1.value,
    })),
    useAnimatedStyle(() => ({
      transform: [{ translateY: letterY2.value }],
      opacity: letterOp2.value,
    })),
    useAnimatedStyle(() => ({
      transform: [{ translateY: letterY3.value }],
      opacity: letterOp3.value,
    })),
    useAnimatedStyle(() => ({
      transform: [{ translateY: letterY4.value }],
      opacity: letterOp4.value,
    })),
  ];

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {/* Tap anywhere to dismiss splash early */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onFinish}>
        {/* Background gradient */}
        <LinearGradient
          colors={['#0F1128', '#1B1D47', '#12142F']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
        />

        {/* Ethereal Violet Radial Glow Aura */}
        <Animated.View style={[styles.glowWrapper, glowStyle]} pointerEvents="none">
          <Svg width={360} height={360} viewBox="0 0 360 360">
            <Defs>
              <RadialGradient id="violetGlow" cx="50%" cy="50%" rx="50%" ry="50%">
                <Stop offset="0%" stopColor="#7545FF" stopOpacity="0.4" />
                <Stop offset="45%" stopColor="#7545FF" stopOpacity="0.12" />
                <Stop offset="100%" stopColor="#7545FF" stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width="360" height="360" fill="url(#violetGlow)" />
          </Svg>
        </Animated.View>

        {/* Center Stage Content */}
        <View style={styles.centerStage} pointerEvents="none">
          {/* Architectural SVG Monogram Mark */}
          <Animated.View style={[styles.logoContainer, logoStyle]}>
            <Svg width={64} height={64} viewBox="0 0 100 100">
              {/* Outer Champagne Gold Diamond */}
              <Rect
                x="24"
                y="24"
                width="52"
                height="52"
                stroke={colors.champagneGold}
                strokeWidth="1.2"
                fill="none"
                transform="rotate(45 50 50)"
              />
              {/* Inner Soft Blush Geometric Monogram Lines */}
              <Path
                d="M40 35 H60 M40 35 V65 M40 50 H55 M40 65 H60"
                stroke={colors.softBlush}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </Animated.View>

          {/* Letter-By-Letter Brand Name Reveal */}
          <View style={styles.lettersRow}>
            {BRAND_LETTERS.map((letter, idx) => (
              <Animated.View key={idx} style={[styles.letterBox, letterStyles[idx]]}>
                <Text style={styles.letterText}>{letter}</Text>
              </Animated.View>
            ))}
          </View>

          {/* Sweeping Champagne Gold Rule */}
          <Animated.View style={[styles.goldLine, goldLineStyle]} />

          {/* Editorial Subtitle */}
          <Animated.View style={subtitleStyle}>
            <Text style={styles.tagline}>
              HAUTE COUTURE & ATELIER · PARIS
            </Text>
          </Animated.View>
        </View>

        {/* Footnote */}
        <Animated.View style={[styles.footer, subtitleStyle]} pointerEvents="none">
          <Text style={styles.footerText}>
            COLLECTION AUTOMNE / HIVER 2026
          </Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0F1128',
    zIndex: 99999,
  },
  glowWrapper: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 2 - 180,
    left: SCREEN_WIDTH / 2 - 180,
    width: 360,
    height: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerStage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  lettersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 36,
    paddingHorizontal: spacing.md,
  },
  letterBox: {
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  letterText: {
    fontFamily: fontFamilies.serifBold,
    fontSize: 22,
    color: colors.pearlIvory,
    letterSpacing: 2,
    textAlign: 'center',
  },
  goldLine: {
    height: 1,
    backgroundColor: colors.champagneGold,
    marginVertical: spacing.md,
  },
  tagline: {
    fontFamily: fontFamilies.sansBold,
    color: colors.softBlush,
    letterSpacing: 2.8,
    fontSize: 8.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    opacity: 0.9,
  },
  footer: {
    position: 'absolute',
    bottom: 38,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: fontFamilies.sansRegular,
    color: colors.champagneGold,
    letterSpacing: 1.8,
    fontSize: 8.5,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
});
