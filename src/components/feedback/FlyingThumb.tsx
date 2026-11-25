import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useStore } from '../../store/useStore';
import { colors } from '../../theme/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const FlyingThumb: React.FC = () => {
  const { flyingItem, clearFlyingItem } = useStore();

  const posX = useSharedValue(SCREEN_WIDTH / 2 - 30);
  const posY = useSharedValue(SCREEN_HEIGHT / 2);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (flyingItem && flyingItem.active) {
      // Reset starting coordinates
      posX.value = SCREEN_WIDTH / 2 - 30;
      posY.value = SCREEN_HEIGHT * 0.45;
      scale.value = 1.2;
      opacity.value = 1;

      // Animate downward curve into tab bar bag icon position
      const targetX = SCREEN_WIDTH * 0.7 - 20; // approximate bag tab location
      const targetY = SCREEN_HEIGHT - 60;

      posX.value = withTiming(targetX, {
        duration: 650,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      posY.value = withTiming(targetY, {
        duration: 650,
        easing: Easing.bezier(0.5, 0, 0.75, 0),
      });

      scale.value = withTiming(0.2, {
        duration: 650,
        easing: Easing.in(Easing.quad),
      });

      opacity.value = withTiming(0, { duration: 650 }, () => {
        runOnJS(clearFlyingItem)();
      });
    }
  }, [flyingItem]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: posX.value },
        { translateY: posY.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  if (!flyingItem || !flyingItem.active) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.floatingCard, animatedStyle]}
    >
      <Image
        source={{ uri: flyingItem.image }}
        style={styles.image}
        contentFit="cover"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  floatingCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 60,
    height: 75,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.champagneGold,
    overflow: 'hidden',
    zIndex: 9999,
    shadowColor: colors.deepNavy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 25,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
