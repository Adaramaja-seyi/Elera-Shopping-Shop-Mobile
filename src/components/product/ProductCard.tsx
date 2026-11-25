import React, { useState } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  FadeInDown,
} from 'react-native-reanimated';
import { Heart } from 'lucide-react-native';
import { Product } from '../../data/products';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, spacing } from '../../theme/spacing';
import { motion, getStaggerDelay } from '../../animation/motion';
import { PressableScale } from '../common/PressableScale';
import { Badge } from '../common/Badge';
import { useStore } from '../../store/useStore';
import * as Haptics from 'expo-haptics';

interface ProductCardProps {
  product: Product;
  index?: number;
  onPress: () => void;
  style?: ViewStyle;
  layoutMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  onPress,
  style,
  layoutMode = 'grid',
}) => {
  const { isWishlisted, toggleWishlist } = useStore();
  const wishlisted = isWishlisted(product.id);
  const [activeColorIdx, setActiveColorIdx] = useState(0);

  // Heart burst animation
  const heartScale = useSharedValue(1);

  const handleHeartPress = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {}
    heartScale.value = withSequence(
      withSpring(1.45, { damping: 10, stiffness: 300 }),
      withSpring(1, motion.spring.snappy)
    );
    toggleWishlist(product.id);
  };

  const handleColorDotPress = (colorIndex: number) => {
    try {
      Haptics.selectionAsync();
    } catch (e) {}
    setActiveColorIdx(colorIndex);
  };

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const isList = layoutMode === 'list';
  const displayImage = product.colors[activeColorIdx]?.image || product.colors[0]?.image;

  return (
    <Animated.View
      entering={FadeInDown.delay(getStaggerDelay(index)).duration(motion.durations.entrance)}
      style={[isList ? styles.listCard : styles.gridCard, style]}
    >
      <PressableScale onPress={onPress} style={isList ? styles.listInner : styles.gridInner} scaleTo={0.98}>
        {/* Product Image */}
        <View style={isList ? styles.listImageContainer : styles.imageContainer}>
          <Image
            source={{ uri: displayImage }}
            style={styles.image}
            contentFit="cover"
            transition={250}
            cachePolicy="memory-disk"
          />

          {/* Badges */}
          <View style={styles.badgeContainer}>
            {product.isNew && <Badge label="NEW" variant="new" />}
            {product.originalPrice && <Badge label="SALE" variant="sale" style={styles.subBadge} />}
            {product.isExclusive && !product.isNew && (
              <Badge label="EXCLUSIVE" variant="exclusive" />
            )}
          </View>

          {/* Wishlist Button */}
          <PressableScale
            onPress={handleHeartPress}
            style={styles.heartButton}
            scaleTo={0.88}
          >
            <Animated.View style={heartAnimatedStyle}>
              <Heart
                size={16}
                color={wishlisted ? colors.hotCoral : colors.midnightNavy}
                fill={wishlisted ? colors.hotCoral : 'transparent'}
                strokeWidth={1.8}
              />
            </Animated.View>
          </PressableScale>
        </View>

        {/* Content */}
        <View style={isList ? styles.listInfo : styles.info}>
          <Text style={[typography.campaignLabel, styles.brand]}>
            {product.brand}
          </Text>
          <Text
            numberOfLines={isList ? 2 : 1}
            style={[typography.h4, styles.name]}
          >
            {product.name}
          </Text>

          {/* Price & Swatches */}
          <View style={styles.bottomRow}>
            <View style={styles.priceRow}>
              <Text style={[typography.priceMedium, styles.price]}>
                ${product.price.toLocaleString()}
              </Text>
              {product.originalPrice && (
                <Text style={[typography.caption, styles.originalPrice]}>
                  ${product.originalPrice.toLocaleString()}
                </Text>
              )}
            </View>

            {/* Interactive Color swatches dots */}
            <View style={styles.swatchRow}>
              {product.colors.map((c, i) => (
                <PressableScale
                  key={i}
                  onPress={() => handleColorDotPress(i)}
                  style={[
                    styles.swatchDot,
                    { backgroundColor: c.hex },
                    i === activeColorIdx && styles.swatchDotActive,
                  ]}
                  scaleTo={0.85}
                />
              ))}
            </View>
          </View>
        </View>
      </PressableScale>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gridCard: {
    width: '48%',
    marginBottom: spacing.base,
    borderRadius: layout.cardRadius,
    backgroundColor: colors.pureWhite,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.blushBorder,
  },
  gridInner: {
    flex: 1,
  },
  listCard: {
    width: '100%',
    marginBottom: spacing.md,
    borderRadius: layout.cardRadius,
    backgroundColor: colors.pureWhite,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    overflow: 'hidden',
  },
  listInner: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 3 / 4,
    backgroundColor: colors.lightBlush,
    position: 'relative',
  },
  listImageContainer: {
    width: 115,
    height: 135,
    backgroundColor: colors.lightBlush,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    gap: spacing.xs,
    zIndex: 2,
  },
  subBadge: {
    marginTop: 4,
  },
  heartButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 248, 244, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  info: {
    padding: spacing.md,
  },
  listInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  brand: {
    color: colors.dustyRose,
    marginBottom: 3,
  },
  name: {
    color: colors.midnightNavy,
    marginBottom: spacing.xs,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  price: {
    color: colors.midnightNavy,
  },
  originalPrice: {
    color: colors.warmGrey,
    textDecorationLine: 'line-through',
  },
  swatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  swatchDot: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    borderWidth: 1,
    borderColor: colors.blushBorder,
  },
  swatchDotActive: {
    borderColor: colors.midnightNavy,
    borderWidth: 1.8,
  },
});
