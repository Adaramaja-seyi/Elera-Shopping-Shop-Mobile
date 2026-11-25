import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { EmptyState } from '../components/common/EmptyState';
import { useStore } from '../store/useStore';

interface WishlistScreenProps {
  onSelectProduct: (product: Product) => void;
  onExplore: () => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  onSelectProduct,
  onExplore,
}) => {
  const insets = useSafeAreaInsets();
  const { wishlistIds } = useStore();

  const wishlistedProducts = PRODUCTS.filter((p) =>
    wishlistIds.includes(p.id)
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={[typography.campaignLabel, styles.headerSubtitle]}>
          PRIVATE ARCHIVE
        </Text>
        <Text style={[typography.h1, styles.headerTitle]}>
          Saved Wishlist ({wishlistedProducts.length})
        </Text>
      </View>

      {wishlistedProducts.length === 0 ? (
        <EmptyState
          icon={<Heart size={34} color={colors.dustyRose} />}
          title="Your Wishlist is Empty"
          description="Curate your personal seasonal archive by tapping the heart icon on pieces that inspire you."
          actionText="EXPLORE RUNWAY PIECES"
          onActionPress={onExplore}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.grid}>
            {wishlistedProducts.map((item, idx) => (
              <ProductCard
                key={item.id}
                product={item}
                index={idx}
                onPress={() => onSelectProduct(item)}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearlIvory,
  },
  header: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.blushBorder,
  },
  headerSubtitle: {
    color: colors.champagneGold,
    marginBottom: 2,
  },
  headerTitle: {
    color: colors.midnightNavy,
  },
  scrollContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: 110,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
