import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { Button } from '../components/common/Button';
import { PressableScale } from '../components/common/PressableScale';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  season: string;
  title: string;
  subtitle: string;
  image: string;
}

const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    season: 'AUTUMN / WINTER 2026',
    title: 'THE ARCHITECTURAL\nSILHOUETTE',
    subtitle: 'Noble virgin wools, sculpted Italian shoulders, and uncompromising craftsmanship.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    season: 'LEATHER GOODS',
    title: 'TIMELESS\nTUSCAN CRAFT',
    subtitle: 'Full-grain calfskin hand-assembled in Florence with brushed Champagne Gold hardware.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    season: 'HAUTE HORLOGERIE & JOAILLERIE',
    title: 'PRIVATE ATELIER\nPRIVILÈGE',
    subtitle: 'White glove express delivery, bespoke monogramming, and personal stylist consultations.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (idx !== currentIndex && idx >= 0 && idx < ONBOARDING_SLIDES.length) {
      setCurrentIndex(idx);
    }
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
            <LinearGradient
              colors={[
                'rgba(18, 20, 47, 0.25)',
                'rgba(18, 20, 47, 0.65)',
                'rgba(18, 20, 47, 0.96)',
              ]}
              style={styles.gradient}
            />

            <View style={styles.content}>
              <Text style={[typography.campaignLabel, styles.season]}>
                {item.season}
              </Text>
              <Text style={[typography.displayMedium, styles.title]}>
                {item.title}
              </Text>
              <Text style={[typography.bodyLarge, styles.subtitle]}>
                {item.subtitle}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Top Header with Skip */}
      <View style={styles.topHeader}>
        <Text style={[typography.campaignLabel, styles.logoMark]}>
          É L E R A
        </Text>
        <PressableScale onPress={onComplete} style={styles.skipBtn}>
          <Text style={[typography.campaignLabel, styles.skipText]}>
            SKIP
          </Text>
        </PressableScale>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        {/* Pagination Dots */}
        <View style={styles.dotsRow}>
          {ONBOARDING_SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <Button
          title={
            currentIndex === ONBOARDING_SLIDES.length - 1
              ? 'ENTER THE ATELIER'
              : 'CONTINUE'
          }
          onPress={handleNext}
          variant="secondary"
          style={styles.actionBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.deepNavy,
  },
  slide: {
    width: SCREEN_WIDTH,
    height: '100%',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 150,
  },
  season: {
    color: colors.champagneGold,
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.pureWhite,
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.softBlush,
    lineHeight: 24,
    opacity: 0.9,
  },
  topHeader: {
    position: 'absolute',
    top: 56,
    left: spacing.base,
    right: spacing.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  logoMark: {
    color: colors.pureWhite,
    letterSpacing: 4,
  },
  skipBtn: {
    padding: spacing.sm,
  },
  skipText: {
    color: colors.champagneGold,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 44,
    left: spacing.base,
    right: spacing.base,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.lg,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  dotActive: {
    width: 28,
    backgroundColor: colors.champagneGold,
  },
  dotInactive: {
    width: 8,
    backgroundColor: 'rgba(255, 248, 244, 0.3)',
  },
  actionBtn: {
    height: 54,
  },
});
