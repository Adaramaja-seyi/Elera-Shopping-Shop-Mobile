import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Animated, {
  FadeInDown,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Sparkles,
  ChevronRight,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout, spacing } from '../theme/spacing';
import { motion } from '../animation/motion';
import { QuantityStepper } from '../components/common/QuantityStepper';
import { Button } from '../components/common/Button';
import { PressableScale } from '../components/common/PressableScale';
import { EmptyState } from '../components/common/EmptyState';
import { useStore, CartItem } from '../store/useStore';

interface BagScreenProps {
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export const BagScreen: React.FC<BagScreenProps> = ({
  onProceedToCheckout,
  onExploreProducts,
}) => {
  const insets = useSafeAreaInsets();
  const { cart, removeFromCart, updateCartQuantity, getCartSubtotal } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const subtotal = getCartSubtotal();
  const shippingFee = subtotal > 1500 || subtotal === 0 ? 0 : 75;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  // Discount badge bounce
  const badgeScale = useSharedValue(1);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase() || 'ATELIER';
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {}

    // Apply a generous $250 Privilège Courtesy Discount for any entered code
    setDiscountAmount(250);
    setPromoApplied(true);
    setPromoCode(code);

    badgeScale.value = withSequence(
      withSpring(1.2, { damping: 8, stiffness: 300 }),
      withSpring(1, motion.spring.snappy)
    );
  };

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  const handleRemove = (id: string) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {}
    removeFromCart(id);
  };

  const totalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Editorial Header */}
      <View style={styles.header}>
        <View>
          <Text style={[typography.campaignLabel, styles.headerSubtitle]}>
            YOUR SELECTION
          </Text>
          <Text style={[typography.h1, styles.headerTitle]}>
            Atelier Bag ({totalQuantity})
          </Text>
        </View>

        {cart.length > 0 && (
          <Button
            title="CHECKOUT"
            onPress={onProceedToCheckout}
            variant="primary"
            style={styles.headerCheckoutBtn}
          />
        )}
      </View>

      {cart.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={34} color={colors.dustyRose} />}
          title="Your Bag is Empty"
          description="You have not reserved any atelier creations yet. Discover our latest runway collection and seasonal capsules."
          actionText="START EXPLORING"
          onActionPress={onExploreProducts}
        />
      ) : (
        <View style={styles.contentWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Cart Items List */}
            <View style={styles.itemsList}>
              {cart.map((item: CartItem, index: number) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(index * 60).duration(400)}
                  style={styles.cartCard}
                >
                  <View style={styles.cardImageContainer}>
                    <Image
                      source={{ uri: item.selectedColor.image }}
                      style={styles.cardImage}
                      contentFit="cover"
                      cachePolicy="memory-disk"
                    />
                  </View>

                  <View style={styles.cardInfo}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={[typography.campaignLabel, styles.itemBrand]}>
                        {item.product.brand}
                      </Text>
                      <PressableScale
                        onPress={() => handleRemove(item.id)}
                        style={styles.deleteBtn}
                      >
                        <Trash2 size={15} color={colors.mutedPlum} />
                      </PressableScale>
                    </View>

                    <Text numberOfLines={1} style={[typography.h4, styles.itemName]}>
                      {item.product.name}
                    </Text>

                    <Text style={[typography.caption, styles.itemSpecs]}>
                      Colour: {item.selectedColor.name} · Size: {item.selectedSize}
                    </Text>

                    <View style={styles.cardBottomRow}>
                      <Text style={[typography.priceMedium, styles.itemPrice]}>
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </Text>

                      <QuantityStepper
                        quantity={item.quantity}
                        onIncrement={() => updateCartQuantity(item.id, 1)}
                        onDecrement={() => updateCartQuantity(item.id, -1)}
                      />
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>

            {/* Promo Code Box */}
            <View style={styles.promoBox}>
              <View style={styles.promoInputRow}>
                <Tag size={16} color={colors.champagneGold} />
                <TextInput
                  value={promoCode}
                  onChangeText={setPromoCode}
                  placeholder="Enter promo code (e.g. TNSOA, ATELIER)"
                  placeholderTextColor={colors.warmGrey}
                  autoCapitalize="characters"
                  editable={!promoApplied}
                  style={styles.promoInput}
                />
                <Button
                  title={promoApplied ? 'APPLIED' : 'APPLY'}
                  onPress={handleApplyPromo}
                  disabled={promoApplied}
                  variant={promoApplied ? 'secondary' : 'primary'}
                  style={styles.promoApplyBtn}
                  icon={promoApplied ? <Check size={13} color={colors.midnightNavy} /> : undefined}
                />
              </View>

              {promoApplied ? (
                <Animated.View
                  entering={FadeIn.duration(300)}
                  style={[styles.promoSuccessRow, badgeAnimatedStyle]}
                >
                  <Sparkles size={13} color={colors.champagneGold} />
                  <Text style={styles.promoSuccessText}>
                    Privilège Code Applied: $250.00 Courtesy Discount Credited
                  </Text>
                </Animated.View>
              ) : (
                <Text style={styles.promoHintText}>
                  Enter code or tap APPLY to receive complimentary $250 Privilège credit
                </Text>
              )}

              {/* Direct Quick Checkout CTA right in the promo box when code is applied */}
              {promoApplied && (
                <PressableScale
                  onPress={onProceedToCheckout}
                  style={styles.promoCheckoutShortcut}
                >
                  <Text style={styles.promoShortcutText}>
                    Discount Active · Proceed to Payment (${total.toLocaleString()})
                  </Text>
                  <ChevronRight size={15} color={colors.pureWhite} />
                </PressableScale>
              )}
            </View>

            {/* Price Breakdown Valuation Card */}
            <View style={styles.summaryCard}>
              <Text style={[typography.campaignLabel, styles.summaryTitle]}>
                ORDER VALUATION
              </Text>

              <View style={styles.summaryRow}>
                <Text style={[typography.bodyMedium, styles.summaryLabel]}>
                  Subtotal
                </Text>
                <Text style={[typography.bodyMedium, styles.summaryValue]}>
                  ${subtotal.toLocaleString()}
                </Text>
              </View>

              {discountAmount > 0 && (
                <View style={styles.summaryRow}>
                  <Text style={[typography.bodyMedium, { color: colors.dustyRose }]}>
                    Privilège Courtesy Discount
                  </Text>
                  <Text
                    style={[
                      typography.bodyMedium,
                      { color: colors.dustyRose, fontFamily: typography.h4.fontFamily },
                    ]}
                  >
                    -${discountAmount.toLocaleString()}
                  </Text>
                </View>
              )}

              <View style={styles.summaryRow}>
                <Text style={[typography.bodyMedium, styles.summaryLabel]}>
                  White Glove Courier
                </Text>
                <Text style={[typography.bodyMedium, styles.summaryValue]}>
                  {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                </Text>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.totalRow}>
                <Text style={[typography.h3, styles.totalLabel]}>Total</Text>
                <Text style={[typography.priceLarge, styles.totalValue]}>
                  ${total.toLocaleString()}
                </Text>
              </View>

              <View style={styles.securityRow}>
                <ShieldCheck size={13} color={colors.champagneGold} />
                <Text style={[typography.caption, styles.securityText]}>
                  Insured VIP shipment with signature delivery requirement
                </Text>
              </View>

              {/* In-Card Checkout CTA */}
              <Button
                title={`PROCEED TO CHECKOUT · $${total.toLocaleString()}`}
                onPress={onProceedToCheckout}
                variant="primary"
                icon={<ArrowRight size={15} color={colors.pureWhite} />}
                style={styles.cardCheckoutBtn}
              />
            </View>
          </ScrollView>

          {/* PERSISTENT FLOATING STICKY CHECKOUT BAR (Always visible above bottom tab bar) */}
          <View style={styles.stickyBottomBar}>
            <View style={styles.stickyPriceCol}>
              <Text style={[typography.caption, styles.stickyPriceLabel]}>
                VALUATION TOTAL
              </Text>
              <Text style={[typography.priceLarge, styles.stickyPriceValue]}>
                ${total.toLocaleString()}
              </Text>
            </View>

            <Button
              title="CHECKOUT NOW"
              onPress={onProceedToCheckout}
              variant="primary"
              icon={<ArrowRight size={15} color={colors.pureWhite} />}
              style={styles.stickyCheckoutBtn}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearlIvory,
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
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
  headerCheckoutBtn: {
    height: 38,
    paddingHorizontal: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: 170, // Leaves ample room for both sticky bar and floating tab bar
  },
  itemsList: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: colors.pureWhite,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    overflow: 'hidden',
  },
  cardImageContainer: {
    width: 105,
    height: 130,
    backgroundColor: colors.lightBlush,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemBrand: {
    color: colors.dustyRose,
  },
  deleteBtn: {
    padding: 4,
  },
  itemName: {
    color: colors.midnightNavy,
  },
  itemSpecs: {
    color: colors.mutedPlum,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    color: colors.midnightNavy,
  },
  promoBox: {
    backgroundColor: colors.pureWhite,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    padding: spacing.sm,
    marginBottom: spacing.lg,
  },
  promoInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingLeft: spacing.sm,
  },
  promoInput: {
    flex: 1,
    height: 40,
    fontFamily: typography.bodyMedium.fontFamily,
    fontSize: 12.5,
    color: colors.midnightNavy,
  },
  promoApplyBtn: {
    height: 36,
    paddingHorizontal: spacing.md,
  },
  promoSuccessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  promoSuccessText: {
    fontFamily: typography.caption.fontFamily,
    fontSize: 10.5,
    color: colors.midnightNavy,
    fontWeight: '600',
  },
  promoHintText: {
    fontFamily: typography.caption.fontFamily,
    fontSize: 10,
    color: colors.mutedPlum,
    marginTop: 4,
    paddingHorizontal: spacing.sm,
  },
  promoCheckoutShortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.midnightNavy,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    marginTop: spacing.sm,
  },
  promoShortcutText: {
    color: colors.pureWhite,
    fontFamily: typography.buttonLabel.fontFamily,
    fontSize: 11,
    letterSpacing: 0.8,
  },
  summaryCard: {
    backgroundColor: colors.pureWhite,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    padding: spacing.base,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    color: colors.midnightNavy,
    marginBottom: spacing.xs,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    color: colors.mutedPlum,
  },
  summaryValue: {
    color: colors.midnightNavy,
    fontFamily: typography.h4.fontFamily,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: colors.blushBorder,
    marginVertical: spacing.xs,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  totalLabel: {
    color: colors.midnightNavy,
  },
  totalValue: {
    color: colors.midnightNavy,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  securityText: {
    color: colors.mutedPlum,
    fontSize: 10.5,
  },
  cardCheckoutBtn: {
    marginTop: spacing.sm,
    height: 48,
    width: '100%',
  },
  stickyBottomBar: {
    position: 'absolute',
    bottom: 84, // Sits comfortably right above the FloatingTabBar
    left: spacing.base,
    right: spacing.base,
    backgroundColor: colors.pureWhite,
    borderRadius: layout.cardRadius,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.blushBorder,
    shadowColor: colors.midnightNavy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  stickyPriceCol: {
    justifyContent: 'center',
  },
  stickyPriceLabel: {
    color: colors.mutedPlum,
    fontSize: 9.5,
  },
  stickyPriceValue: {
    color: colors.midnightNavy,
    fontSize: 18,
  },
  stickyCheckoutBtn: {
    height: 44,
    paddingHorizontal: spacing.lg,
  },
});
