import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  Check,
} from 'lucide-react-native';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout, spacing } from '../theme/spacing';
import { PRODUCTS, Product } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/product/ProductCard';
import { PressableScale } from '../components/common/PressableScale';
import { Button } from '../components/common/Button';
import { BottomSheet } from '../components/common/BottomSheet';
import { EmptyState } from '../components/common/EmptyState';
import { useStore } from '../store/useStore';

interface DiscoverScreenProps {
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  initialCategory = 'all',
  onSelectProduct,
}) => {
  const insets = useSafeAreaInsets();
  const { filters, setFilters, resetFilters } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Temporary local filter state for bottom sheet
  const [tempSortBy, setTempSortBy] = useState(filters.sortBy);
  const [tempGender, setTempGender] = useState(filters.gender);
  const [tempMaxPrice, setTempMaxPrice] = useState(filters.maxPrice);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'men' || selectedCategory === 'women') {
          if (item.gender !== selectedCategory && item.gender !== 'unisex') return false;
        } else if (item.category !== selectedCategory) {
          return false;
        }
      }

      // Gender filter
      if (filters.gender !== 'all') {
        if (item.gender !== filters.gender && item.gender !== 'unisex') return false;
      }

      // Price filter
      if (item.price > filters.maxPrice) return false;

      // Search query
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesTag = item.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesTag) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured
    });
  }, [selectedCategory, filters, searchQuery]);

  const handleApplyFilters = () => {
    setFilters({
      sortBy: tempSortBy,
      gender: tempGender,
      maxPrice: tempMaxPrice,
    });
    setIsFilterSheetOpen(false);
  };

  const handleResetFilters = () => {
    resetFilters();
    setTempSortBy('featured');
    setTempGender('all');
    setTempMaxPrice(3000);
    setIsFilterSheetOpen(false);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Search and Action Bar */}
      <View style={styles.topBar}>
        <View style={styles.searchBar}>
          <Search size={18} color={colors.mutedPlum} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search coat, bag, sneaker, silk..."
            placeholderTextColor={colors.warmGrey}
            style={styles.searchInput}
          />
          {searchQuery.length > 0 && (
            <PressableScale onPress={() => setSearchQuery('')}>
              <X size={16} color={colors.midnightNavy} />
            </PressableScale>
          )}
        </View>

        <PressableScale
          onPress={() => setIsFilterSheetOpen(true)}
          style={styles.filterBtn}
        >
          <SlidersHorizontal size={18} color={colors.midnightNavy} />
        </PressableScale>

        <PressableScale
          onPress={() => setLayoutMode(layoutMode === 'grid' ? 'list' : 'grid')}
          style={styles.layoutBtn}
        >
          {layoutMode === 'grid' ? (
            <List size={18} color={colors.midnightNavy} />
          ) : (
            <LayoutGrid size={18} color={colors.midnightNavy} />
          )}
        </PressableScale>
      </View>

      {/* Category Pills Slider */}
      <View style={styles.categoryPills}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsScroll}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <PressableScale
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                style={[
                  styles.pill,
                  isSelected && styles.pillSelected,
                ]}
              >
                <Text
                  style={[
                    typography.buttonLabel,
                    styles.pillText,
                    isSelected && styles.pillTextSelected,
                  ]}
                >
                  {cat.name}
                </Text>
              </PressableScale>
            );
          })}
        </ScrollView>
      </View>

      {/* Results Count & Sort Summary */}
      <View style={styles.summaryBar}>
        <Text style={[typography.caption, styles.resultsCount]}>
          SHOWING {filteredProducts.length} PIECES
        </Text>
        <Text style={[typography.caption, styles.sortLabel]}>
          SORT: {filters.sortBy.toUpperCase()}
        </Text>
      </View>

      {/* Products Stream */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.productsScroll,
          layoutMode === 'grid' ? styles.gridWrap : styles.listWrap,
        ]}
      >
        {filteredProducts.length === 0 ? (
          <EmptyState
            icon={<Search size={32} color={colors.dustyRose} />}
            title="No Atelier Creations Found"
            description="We could not find items matching your search criteria. Try adjusting filters or browsing all collections."
            actionText="CLEAR FILTERS"
            onActionPress={handleResetFilters}
          />
        ) : (
          filteredProducts.map((item, index) => (
            <ProductCard
              key={item.id}
              product={item}
              index={index}
              layoutMode={layoutMode}
              onPress={() => onSelectProduct(item)}
            />
          ))
        )}
      </ScrollView>

      {/* FILTER BOTTOM SHEET */}
      <BottomSheet
        visible={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        title="REFINE CURATION"
      >
        <ScrollView style={styles.filterBody} showsVerticalScrollIndicator={false}>
          {/* Sort By Section */}
          <Text style={[typography.campaignLabel, styles.filterSectionTitle]}>
            SORT BY
          </Text>
          <View style={styles.chipsRow}>
            {(['featured', 'newest', 'price-asc', 'price-desc'] as const).map((opt) => {
              const isSelected = tempSortBy === opt;
              const labels: Record<string, string> = {
                featured: 'Featured',
                newest: 'Newest Arrivals',
                'price-asc': 'Price: Low to High',
                'price-desc': 'Price: High to Low',
              };
              return (
                <PressableScale
                  key={opt}
                  onPress={() => setTempSortBy(opt)}
                  style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                >
                  <Text
                    style={[
                      typography.caption,
                      styles.filterChipText,
                      isSelected && styles.filterChipTextSelected,
                    ]}
                  >
                    {labels[opt]}
                  </Text>
                </PressableScale>
              );
            })}
          </View>

          {/* Gender Filter */}
          <Text style={[typography.campaignLabel, styles.filterSectionTitle]}>
            GENDER
          </Text>
          <View style={styles.chipsRow}>
            {(['all', 'women', 'men'] as const).map((g) => {
              const isSelected = tempGender === g;
              return (
                <PressableScale
                  key={g}
                  onPress={() => setTempGender(g)}
                  style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                >
                  <Text
                    style={[
                      typography.caption,
                      styles.filterChipText,
                      isSelected && styles.filterChipTextSelected,
                    ]}
                  >
                    {g.toUpperCase()}
                  </Text>
                </PressableScale>
              );
            })}
          </View>

          {/* Maximum Price Filter */}
          <Text style={[typography.campaignLabel, styles.filterSectionTitle]}>
            MAXIMUM PRICE: ${tempMaxPrice.toLocaleString()}
          </Text>
          <View style={styles.priceTiersRow}>
            {[800, 1500, 2500, 3000].map((priceTier) => {
              const isSelected = tempMaxPrice === priceTier;
              return (
                <PressableScale
                  key={priceTier}
                  onPress={() => setTempMaxPrice(priceTier)}
                  style={[
                    styles.priceTierChip,
                    isSelected && styles.filterChipSelected,
                  ]}
                >
                  <Text
                    style={[
                      typography.caption,
                      styles.filterChipText,
                      isSelected && styles.filterChipTextSelected,
                    ]}
                  >
                    Up to ${priceTier}
                  </Text>
                </PressableScale>
              );
            })}
          </View>

          {/* Action buttons */}
          <View style={styles.filterActions}>
            <Button
              title="RESET"
              onPress={handleResetFilters}
              variant="secondary"
              style={{ flex: 1 }}
            />
            <Button
              title="APPLY FILTERS"
              onPress={handleApplyFilters}
              variant="primary"
              style={{ flex: 1 }}
            />
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearlIvory,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  searchBar: {
    flex: 1,
    height: 44,
    backgroundColor: colors.pureWhite,
    borderRadius: layout.buttonRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: typography.bodyMedium.fontFamily,
    fontSize: 14,
    color: colors.midnightNavy,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: layout.buttonRadius,
    backgroundColor: colors.lightBlush,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  layoutBtn: {
    width: 44,
    height: 44,
    borderRadius: layout.buttonRadius,
    backgroundColor: colors.lightBlush,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryPills: {
    paddingVertical: spacing.xs,
  },
  pillsScroll: {
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  pill: {
    height: 36,
    paddingHorizontal: spacing.md,
    borderRadius: layout.chipRadius,
    backgroundColor: colors.softBlush,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillSelected: {
    backgroundColor: colors.midnightNavy,
  },
  pillText: {
    color: colors.midnightNavy,
    fontSize: 11,
  },
  pillTextSelected: {
    color: colors.pureWhite,
  },
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.xs,
  },
  resultsCount: {
    color: colors.mutedPlum,
  },
  sortLabel: {
    color: colors.dustyRose,
  },
  productsScroll: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
    paddingBottom: 110,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  listWrap: {
    flexDirection: 'column',
  },
  filterBody: {
    maxHeight: 460,
  },
  filterSectionTitle: {
    color: colors.midnightNavy,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  priceTiersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: layout.chipRadius,
    backgroundColor: colors.lightBlush,
    borderWidth: 1,
    borderColor: colors.blushBorder,
  },
  priceTierChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: layout.chipRadius,
    backgroundColor: colors.lightBlush,
    borderWidth: 1,
    borderColor: colors.blushBorder,
  },
  filterChipSelected: {
    backgroundColor: colors.midnightNavy,
    borderColor: colors.midnightNavy,
  },
  filterChipText: {
    color: colors.midnightNavy,
  },
  filterChipTextSelected: {
    color: colors.pureWhite,
  },
  filterActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
});
