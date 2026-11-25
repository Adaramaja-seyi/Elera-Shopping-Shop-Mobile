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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, spacing } from '../../theme/spacing';
import { motion } from '../../animation/motion';
import { PressableScale } from '../common/PressableScale';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GALLERY_HEIGHT = SCREEN_WIDTH * 1.25;

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const zoomScale = useSharedValue(1);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
    );
    if (slide !== activeIndex && slide >= 0 && slide < images.length) {
      setActiveIndex(slide);
    }
  };

  const handleDoubleTap = () => {
    if (zoomScale.value > 1) {
      zoomScale.value = withSpring(1, motion.spring.snappy);
    } else {
      zoomScale.value = withSequence(
        withSpring(1.5, motion.spring.snappy),
        withSpring(1.35, motion.spring.soft)
      );
    }
  };

  const handleSelectImage = (index: number) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const zoomAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: zoomScale.value }],
  }));

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <PressableScale
            onPress={handleDoubleTap}
            style={styles.slide}
            scaleTo={0.99}
          >
            <Animated.View style={[styles.imageWrapper, zoomAnimatedStyle]}>
              <Image
                source={{ uri: item }}
                style={styles.image}
                contentFit="cover"
                transition={300}
                cachePolicy="memory-disk"
              />
            </Animated.View>
          </PressableScale>
        )}
      />

      {/* Image Counter Badge */}
      <View style={styles.counterBadge}>
        <Text style={styles.counterText}>
          {activeIndex + 1} / {images.length}
        </Text>
      </View>

      {/* Interactive Pagination indicators */}
      <View style={styles.pagination}>
        {images.map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <PressableScale
              key={idx}
              onPress={() => handleSelectImage(idx)}
              style={[
                styles.dot,
                isActive ? styles.dotActive : styles.dotInactive,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: GALLERY_HEIGHT,
    backgroundColor: colors.lightBlush,
    position: 'relative',
  },
  slide: {
    width: SCREEN_WIDTH,
    height: GALLERY_HEIGHT,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: SCREEN_WIDTH,
    height: GALLERY_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  counterBadge: {
    position: 'absolute',
    bottom: spacing.lg + 16,
    right: spacing.base,
    backgroundColor: 'rgba(27, 29, 71, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: layout.badgeRadius,
  },
  counterText: {
    fontFamily: typography.caption.fontFamily,
    fontSize: 9.5,
    color: colors.pureWhite,
    letterSpacing: 0.5,
  },
  pagination: {
    position: 'absolute',
    bottom: spacing.base,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    height: 5,
    borderRadius: 2.5,
  },
  dotActive: {
    width: 22,
    backgroundColor: colors.midnightNavy,
  },
  dotInactive: {
    width: 6,
    backgroundColor: 'rgba(27, 29, 71, 0.22)',
  },
});
