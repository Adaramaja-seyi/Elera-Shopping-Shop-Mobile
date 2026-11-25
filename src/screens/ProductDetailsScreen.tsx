import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import {
  ChevronLeft,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout, spacing } from '../theme/spacing';
import { motion } from '../animation/motion';
import { Product, ProductColor } from '../data/products';
import { ProductGallery } from '../components/product/ProductGallery';
import { ColourSelector } from '../components/product/ColourSelector';
import { SizeSelector } from '../components/product/SizeSelector';
import { QuantityStepper } from '../components/common/QuantityStepper';
import { RatingStars } from '../components/common/RatingStars';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { PressableScale } from '../components/common/PressableScale';
import { BottomSheet } from '../components/common/BottomSheet';
import { useStore } from '../store/useStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ProductDetailsScreenProps {
  product: Product;
  onBack: () => void;
  onNavigateToBag: () => void;
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  product,
  onBack,
  onNavigateToBag,
}) => {
  const insets = useSafeAreaInsets();
  const { isWishlisted, toggleWishlist, addToCart, triggerFlyingItem } = useStore();
  const wishlisted = isWishlisted(product.id);

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [showAddedModal, setShowAddedModal] = useState(false);

  // Heart burst animation
  const heartScale = useSharedValue(1);

  const handleHeartPress = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {}
    heartScale.value = withSequence(
      withSpring(1.5, { damping: 8, stiffness: 350 }),
      withSpring(1, motion.spring.snappy)
    );
    toggleWishlist(product.id);
  };

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleAddToCart = () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {}

    // 1. Trigger Flying thumbnail into bottom tab bar
    triggerFlyingItem(selectedColor.image);

    // 2. Add to Zustand store (which also triggers bag icon bounce)
    addToCart(product, selectedSize, selectedColor, quantity);

    // 3. Slide up confirmation bottom sheet
    setTimeout(() => {
      setShowAddedModal(true);
    }, 450);
  };

  return (
    <View style={styles.container}>
      {/* Floating Top Navigation Header */}
      <View style={[styles.floatingHeader, { top: Math.max(insets.top, 12) }]}>
        <PressableScale onPress={onBack} style={styles.headerBtn}>
          <ChevronLeft size={22} color={colors.midnightNavy} />
        </PressableScale>

        <View style={styles.headerActions}>
          <PressableScale
            onPress={() => {
              try {
                Haptics.selectionAsync();
              } catch (e) {}
            }}
            style={styles.headerBtn}
          >
            <Share2 size={18} color={colors.midnightNavy} />
          </PressableScale>

          <PressableScale onPress={handleHeartPress} style={styles.headerBtn}>
            <Animated.View style={heartAnimatedStyle}>
              <Heart
                size={20}
                color={wishlisted ? colors.hotCoral : colors.midnightNavy}
                fill={wishlisted ? colors.hotCoral : 'transparent'}
                strokeWidth={1.8}
              />
            </Animated.View>
          </PressableScale>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Gallery with Double-Tap Zoom & Dots */}
        <ProductGallery images={selectedColor.gallery} />

        {/* Product Details Section */}
        <View style={styles.infoContainer}>
          {/* Brand & Badges */}
          <View style={styles.metaRow}>
            <Text style={[typography.campaignLabel, styles.brand]}>
              {product.brand}
            </Text>
            <View style={styles.badgeRow}>
              {product.isNew && <Badge label="NEW PIECE" variant="new" />}
              {product.isExclusive && <Badge label="EXCLUSIVE" variant="exclusive" />}
            </View>
          </View>

          {/* Product Title */}
          <Text style={[typography.h1, styles.name]}>{product.name}</Text>

          {/* Price & Rating */}
          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={[typography.priceLarge, styles.price]}>
                ${product.price.toLocaleString()}
              </Text>
              {product.originalPrice && (
                <Text style={[typography.bodyMedium, styles.originalPrice]}>
                  ${product.originalPrice.toLocaleString()}
                </Text>
              )}
            </View>
            <RatingStars
              rating={product.rating}
              reviewCount={product.reviewCount}
              size={15}
            />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Colour Swatches Selector */}
          <ColourSelector
            colorsList={product.colors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />

          {/* Size Selector */}
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />

          {/* Quantity Selector */}
          <View style={styles.qtyRow}>
            <Text style={[typography.campaignLabel, styles.qtyLabel]}>
              QUANTITY
            </Text>
            <QuantityStepper
              quantity={quantity}
              onIncrement={() => setQuantity((q) => Math.min(q + 1, 10))}
              onDecrement={() => setQuantity((q) => Math.max(q - 1, 1))}
            />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Editorial Description */}
          <Text style={[typography.campaignLabel, styles.sectionHeader]}>
            THE ATELIER CRAFT & SILHOUETTE
          </Text>
          <Text style={[typography.bodyMedium, styles.description]}>
            {product.description}
          </Text>

          {/* Craftsmanship Details */}
          <View style={styles.detailsList}>
            {product.details.map((detail, idx) => (
              <View key={idx} style={styles.detailItem}>
                <View style={styles.detailDot} />
                <Text style={[typography.bodySmall, styles.detailText]}>
                  {detail}
                </Text>
              </View>
            ))}
          </View>

          {/* Luxury Commitments Guarantee */}
          <View style={styles.guaranteeBox}>
            <View style={styles.guaranteeItem}>
              <ShieldCheck size={18} color={colors.champagneGold} />
              <View style={styles.guaranteeText}>
                <Text style={[typography.caption, styles.guaranteeTitle]}>
                  100% Guaranteed Authenticity
                </Text>
                <Text style={[typography.caption, styles.guaranteeSub]}>
                  Sealed with certificate and RFID digital chip
                </Text>
              </View>
            </View>

            <View style={styles.guaranteeItem}>
              <Truck size={18} color={colors.champagneGold} />
              <View style={styles.guaranteeText}>
                <Text style={[typography.caption, styles.guaranteeTitle]}>
                  Complimentary White Glove Courier
                </Text>
                <Text style={[typography.caption, styles.guaranteeSub]}>
                  Signature delivery in protective garment trunks
                </Text>
              </View>
            </View>

            <View style={styles.guaranteeItem}>
              <RotateCcw size={18} color={colors.champagneGold} />
              <View style={styles.guaranteeText}>
                <Text style={[typography.caption, styles.guaranteeTitle]}>
                  30-Day Atelier Returns
                </Text>
                <Text style={[typography.caption, styles.guaranteeSub]}>
                  Prepaid return concierge pickup at your residence
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 14) }]}>
        <View style={styles.bottomPriceCol}>
          <Text style={[typography.caption, styles.bottomTotalLabel]}>
            TOTAL ESTIMATE
          </Text>
          <Text style={[typography.priceLarge, styles.bottomTotalPrice]}>
            ${(product.price * quantity).toLocaleString()}
          </Text>
        </View>

        <Button
          title="ADD TO BAG"
          onPress={handleAddToCart}
          variant="primary"
          icon={<ShoppingBag size={18} color={colors.pureWhite} />}
          style={styles.addBagBtn}
        />
      </View>

      {/* Confirmation Bottom Sheet */}
      <BottomSheet
        visible={showAddedModal}
        onClose={() => setShowAddedModal(false)}
        title="PIECE ADDED TO BAG"
      >
        <View style={styles.modalContent}>
          <Text style={[typography.bodyMedium, styles.modalDesc]}>
            {product.name} ({selectedColor.name}, {selectedSize}) has been reserved in your private atelier bag.
          </Text>
          <View style={styles.modalActions}>
            <Button
              title="CONTINUE"
              onPress={() => setShowAddedModal(false)}
              variant="secondary"
              style={{ flex: 1, height: 46 }}
            />
            <Button
              title="VIEW BAG"
              onPress={() => {
                setShowAddedModal(false);
                onNavigateToBag();
              }}
              variant="primary"
              style={{ flex: 1, height: 46 }}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearlIvory,
  },
  floatingHeader: {
    position: 'absolute',
    left: spacing.base,
    right: spacing.base,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 248, 244, 0.92)',
    borderWidth: 1,
    borderColor: colors.blushBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  infoContainer: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  brand: {
    color: colors.dustyRose,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  name: {
    color: colors.midnightNavy,
    marginBottom: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  price: {
    color: colors.midnightNavy,
  },
  originalPrice: {
    color: colors.warmGrey,
    textDecorationLine: 'line-through',
  },
  divider: {
    height: 1,
    backgroundColor: colors.blushBorder,
    marginVertical: spacing.md,
  },
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  qtyLabel: {
    color: colors.midnightNavy,
  },
  sectionHeader: {
    color: colors.midnightNavy,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.textBody,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  detailsList: {
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.champagneGold,
  },
  detailText: {
    color: colors.mutedPlum,
  },
  guaranteeBox: {
    backgroundColor: colors.lightBlush,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    padding: spacing.base,
    gap: spacing.md,
    marginVertical: spacing.md,
  },
  guaranteeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  guaranteeText: {
    flex: 1,
  },
  guaranteeTitle: {
    color: colors.midnightNavy,
    fontFamily: typography.h4.fontFamily,
  },
  guaranteeSub: {
    color: colors.mutedPlum,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.pureWhite,
    borderTopWidth: 1,
    borderTopColor: colors.blushBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.md,
    shadowColor: colors.deepNavy,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 10,
  },
  bottomPriceCol: {
    justifyContent: 'center',
  },
  bottomTotalLabel: {
    color: colors.mutedPlum,
  },
  bottomTotalPrice: {
    color: colors.midnightNavy,
  },
  addBagBtn: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  modalContent: {
    paddingVertical: spacing.md,
  },
  modalDesc: {
    color: colors.midnightNavy,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
