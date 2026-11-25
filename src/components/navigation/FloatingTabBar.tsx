import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Compass,
  ShoppingBag,
  Heart,
  User,
  Sparkles,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { motion } from '../../animation/motion';
import { PressableScale } from '../common/PressableScale';
import { useStore } from '../../store/useStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type TabKey = 'home' | 'discover' | 'wishlist' | 'bag' | 'profile';

interface TabItem {
  key: TabKey;
  label: string;
  icon: (props: { color: string; size: number }) => React.ReactNode;
}

const TABS: TabItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: ({ color, size }) => <Sparkles size={size} color={color} strokeWidth={1.8} />,
  },
  {
    key: 'discover',
    label: 'Discover',
    icon: ({ color, size }) => <Compass size={size} color={color} strokeWidth={1.8} />,
  },
  {
    key: 'wishlist',
    label: 'Wishlist',
    icon: ({ color, size }) => <Heart size={size} color={color} strokeWidth={1.8} />,
  },
  {
    key: 'bag',
    label: 'Bag',
    icon: ({ color, size }) => <ShoppingBag size={size} color={color} strokeWidth={1.8} />,
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: ({ color, size }) => <User size={size} color={color} strokeWidth={1.8} />,
  },
];

interface FloatingTabBarProps {
  currentTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

const TAB_BAR_WIDTH = Math.min(SCREEN_WIDTH - 36, 420);
const TAB_WIDTH = (TAB_BAR_WIDTH - 16) / TABS.length;

export const FloatingTabBar: React.FC<FloatingTabBarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const insets = useSafeAreaInsets();
  const { getCartCount, bagBounceTrigger, wishlistIds } = useStore();
  const cartCount = getCartCount();
  const wishlistCount = wishlistIds.length;

  const activeIndex = TABS.findIndex((t) => t.key === currentTab);
  const pillTranslateX = useSharedValue(activeIndex * TAB_WIDTH);

  // Bag badge bounce animation
  const badgeScale = useSharedValue(1);

  useEffect(() => {
    pillTranslateX.value = withSpring(
      activeIndex * TAB_WIDTH,
      motion.spring.snappy
    );
  }, [activeIndex]);

  useEffect(() => {
    if (bagBounceTrigger > 0) {
      badgeScale.value = withSequence(
        withSpring(1.4, { damping: 10, stiffness: 350 }),
        withSpring(1, motion.spring.soft)
      );
    }
  }, [bagBounceTrigger]);

  const pillAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pillTranslateX.value }],
  }));

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  return (
    <View style={[styles.wrapper, { bottom: Math.max(insets.bottom, 16) }]}>
      <View style={styles.container}>
        {/* Sliding active pill indicator */}
        <Animated.View style={[styles.activePill, pillAnimatedStyle]} />

        {/* Tab Buttons */}
        {TABS.map((tab) => {
          const isActive = tab.key === currentTab;
          const activeColor = colors.midnightNavy;
          const inactiveColor = colors.mutedPlum;

          return (
            <PressableScale
              key={tab.key}
              onPress={() => onSelectTab(tab.key)}
              style={styles.tabButton}
              scaleTo={0.92}
            >
              <View style={styles.iconContainer}>
                {tab.icon({
                  color: isActive ? activeColor : inactiveColor,
                  size: 20,
                })}

                {/* Badge for Bag */}
                {tab.key === 'bag' && cartCount > 0 && (
                  <Animated.View
                    style={[styles.badgeCircle, badgeAnimatedStyle]}
                  >
                    <Text style={styles.badgeText}>
                      {cartCount > 99 ? '99+' : cartCount}
                    </Text>
                  </Animated.View>
                )}

                {/* Dot for Wishlist */}
                {tab.key === 'wishlist' && wishlistCount > 0 && (
                  <View style={styles.wishlistDot} />
                )}
              </View>

              <Text
                style={[
                  typography.caption,
                  styles.tabLabel,
                  isActive && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 900,
  },
  container: {
    width: TAB_BAR_WIDTH,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.pearlIvory,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    shadowColor: colors.deepNavy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
    position: 'relative',
  },
  activePill: {
    position: 'absolute',
    left: 8,
    width: TAB_WIDTH,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.softBlush,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    zIndex: 0,
  },
  tabButton: {
    width: TAB_WIDTH,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    color: colors.mutedPlum,
    fontSize: 10,
    marginTop: 2,
  },
  tabLabelActive: {
    color: colors.midnightNavy,
    fontFamily: typography.h3.fontFamily,
  },
  badgeCircle: {
    position: 'absolute',
    top: -5,
    right: -10,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.electricViolet,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.pureWhite,
    fontSize: 9,
    fontFamily: typography.h3.fontFamily,
    lineHeight: 12,
  },
  wishlistDot: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.hotCoral,
  },
});
