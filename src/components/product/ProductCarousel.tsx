import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { Product } from '../../data/products';
import { ProductCard } from './ProductCard';
import { spacing } from '../../theme/spacing';

interface ProductCarouselProps {
  products: Product[];
  onProductPress: (product: Product) => void;
  style?: ViewStyle;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  onProductPress,
  style,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={[styles.container, style]}
    >
      {products.map((item, index) => (
        <Animated.View
          key={item.id}
          entering={FadeInRight.delay(index * 70).springify().damping(18)}
        >
          <ProductCard
            product={item}
            index={index}
            onPress={() => onProductPress(item)}
            style={styles.cardItem}
          />
        </Animated.View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: spacing.base,
    gap: spacing.md,
  },
  cardItem: {
    width: 200,
    marginBottom: 0,
  },
});
