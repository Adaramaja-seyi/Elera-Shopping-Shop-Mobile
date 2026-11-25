import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  Easing,
  FadeInDown,
  FadeIn,
} from 'react-native-reanimated';
import {
  ChevronLeft,
  CheckCircle,
  MapPin,
  Truck,
  CreditCard,
  Gift,
  ShieldCheck,
  Sparkles,
  Lock,
  ArrowRight,
  Check,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout, spacing } from '../theme/spacing';
import { motion } from '../animation/motion';
import { StepProgress } from '../components/checkout/StepProgress';
import { Button } from '../components/common/Button';
import { PressableScale } from '../components/common/PressableScale';
import { useStore, OrderItem } from '../store/useStore';

interface CheckoutScreenProps {
  onBack: () => void;
  onFinishOrder: () => void;
  onViewTracking: () => void;
}

const CHECKOUT_STEPS = ['Address', 'Shipping', 'Payment', 'Review'];

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  onBack,
  onFinishOrder,
  onViewTracking,
}) => {
  const insets = useSafeAreaInsets();
  const { cart, getCartTotal, clearCart, addOrder } = useStore();
  const [currentStep, setCurrentStep] = useState(0);

  // Form selections
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [giftNote, setGiftNote] = useState('With fondest compliments & admiration.');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authStageText, setAuthStageText] = useState('Authorizing 256-Bit Vault...');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState('');

  // Confirmation animations
  const checkmarkScale = useSharedValue(0);
  const confettiOpacity = useSharedValue(0);
  const sparkleRotation = useSharedValue(0);

  const addresses = [
    {
      title: 'Hôtel Particulier · Primary Residence',
      name: 'Countess Alexandra de Valois',
      street: '42 Avenue Montaigne',
      city: '75008 Paris, France',
      phone: '+33 1 42 68 55 00',
    },
    {
      title: 'Manhattan Penthouse',
      name: 'Alexandra de Valois',
      street: '740 Park Avenue, Apt 18B',
      city: 'New York, NY 10021, USA',
      phone: '+1 (212) 555-0198',
    },
  ];

  const shippingOptions = [
    {
      title: 'White Glove Express Courier',
      eta: 'Next Day Evening (18:00 - 21:00)',
      desc: 'Climate-controlled trunk delivery with personal attendant inspection.',
      price: 'Complimentary',
    },
    {
      title: 'Boutique Collection · Salons Privés',
      eta: 'Ready Today within 2 Hours',
      desc: 'Collect at 30 Avenue Montaigne with Champagne reception.',
      price: 'Complimentary',
    },
    {
      title: 'Air Charter Priority Express',
      eta: 'Same Day International Delivery',
      desc: 'Dedicated courier accompaniment on priority transatlantic routes.',
      price: '$450',
    },
  ];

  const paymentMethods = [
    {
      title: 'Centurion Black Card',
      subtitle: 'American Express · Ending in 0088',
      type: 'card',
    },
    {
      title: 'Apple Pay · Privilège Wallet',
      subtitle: 'Instant biometrics authentication',
      type: 'apple',
    },
    {
      title: 'Atelier Line of Credit',
      subtitle: 'Pre-approved $50,000 seasonal credit account',
      type: 'credit',
    },
  ];

  const handleNextStep = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Step 3: Trigger Payment Authorization
      handleAuthorizePayment();
    }
  };

  const handleAuthorizePayment = () => {
    setIsAuthorizing(true);
    setAuthStageText('Authorizing Private Client Vault...');

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (e) {}

    // Multi-stage authorization simulation
    setTimeout(() => {
      setAuthStageText('Verifying VIP Biometric Token...');
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch (e) {}
    }, 400);

    setTimeout(() => {
      setAuthStageText('Generating Bespoke Paris Atelier Receipt...');
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (e) {}
    }, 800);

    setTimeout(() => {
      const orderId = `ELR-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: OrderItem = {
        id: `ord-${Date.now()}`,
        orderNumber: orderId,
        date: '23 Nov 2026',
        items: [...cart],
        total: getCartTotal(),
        status: 'Order Placed',
        timeline: [
          {
            title: 'Order Confirmed',
            description: 'Payment authorized & bespoke atelier receipt issued',
            time: 'Today, Just Now',
            completed: true,
            current: true,
          },
          {
            title: 'Atelier Inspection & Gift Wrapping',
            description: 'Garments hand-steamed & boxed in monogrammed archival trunks',
            time: 'Est. Tomorrow Morning',
            completed: false,
          },
          {
            title: 'Dispatched via White Glove Courier',
            description: 'Dispatched with climate-controlled security seal & tracking',
            time: 'Est. In 2 Days',
            completed: false,
          },
          {
            title: 'Delivered to Residence',
            description: 'Personal attendant delivery & signature required',
            time: 'Est. In 3 Days',
            completed: false,
          },
        ],
        shippingAddress: `${addresses[selectedAddress].street}, ${addresses[selectedAddress].city}`,
      };

      addOrder(newOrder);
      setPlacedOrderNumber(orderId);
      clearCart();
      setIsAuthorizing(false);
      setIsOrderPlaced(true);

      // Trigger grand celebration spring animations
      checkmarkScale.value = withSpring(1, motion.spring.bouncy);
      confettiOpacity.value = withDelay(
        200,
        withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) })
      );
      sparkleRotation.value = withSequence(
        withTiming(180, { duration: 900, easing: motion.easing.reveal }),
        withTiming(360, { duration: 900, easing: motion.easing.reveal })
      );
    }, 1200);
  };

  const checkmarkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkmarkScale.value }],
  }));

  const confettiAnimatedStyle = useAnimatedStyle(() => ({
    opacity: confettiOpacity.value,
    transform: [{ rotate: `${sparkleRotation.value}deg` }],
  }));

  // ORDER SUCCESS & CONFIRMATION SCREEN
  if (isOrderPlaced) {
    return (
      <View style={[styles.container, styles.successContainer, { paddingTop: insets.top }]}>
        {/* Animated Gold particle glow */}
        <Animated.View style={[styles.confettiGlow, confettiAnimatedStyle]}>
          <Sparkles size={84} color={colors.champagneGold} />
        </Animated.View>

        <Animated.View style={[styles.checkCircleWrapper, checkmarkAnimatedStyle]}>
          <CheckCircle size={68} color={colors.champagneGold} strokeWidth={1.5} />
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.delay(150).duration(400)}
          style={[typography.campaignLabel, styles.successPre]}
        >
          COMMANDE CONFIRMÉE · PARIS ATELIER
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(250).duration(500)}
          style={[typography.displayMedium, styles.successTitle]}
        >
          Thank You, Countess.
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(350).duration(500)}
          style={[typography.bodyMedium, styles.successDesc]}
        >
          Your acquisition #{placedOrderNumber} has been received by our Rue du Faubourg Saint-Honoré atelier. Our master tailors have begun preparing your selection.
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.delay(450).duration(500)}
          style={styles.successSummaryBox}
        >
          <View style={styles.successRow}>
            <Text style={[typography.caption, styles.successLabel]}>ORDER NUMBER</Text>
            <Text
              style={[
                typography.bodySmall,
                { color: colors.midnightNavy, fontFamily: typography.h4.fontFamily, fontWeight: '700' },
              ]}
            >
              #{placedOrderNumber}
            </Text>
          </View>
          <View style={styles.successRow}>
            <Text style={[typography.caption, styles.successLabel]}>DESTINATION</Text>
            <Text style={[typography.bodySmall, styles.successVal]}>
              {addresses[selectedAddress].street}, {addresses[selectedAddress].city}
            </Text>
          </View>
          <View style={styles.successRow}>
            <Text style={[typography.caption, styles.successLabel]}>DISPATCH METHOD</Text>
            <Text style={[typography.bodySmall, styles.successVal]}>
              {shippingOptions[selectedShipping].title}
            </Text>
          </View>
          <View style={styles.successRow}>
            <Text style={[typography.caption, styles.successLabel]}>ESTIMATED DELIVERY</Text>
            <Text style={[typography.bodySmall, styles.successVal]}>
              {shippingOptions[selectedShipping].eta}
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(550).duration(500)}
          style={styles.successActions}
        >
          <Button
            title="TRACK ATELIER ORDER"
            onPress={onViewTracking}
            variant="primary"
            icon={<Truck size={16} color={colors.pureWhite} />}
            style={{ width: '100%', marginBottom: spacing.md }}
          />
          <Button
            title="RETURN TO ATELIER"
            onPress={onFinishOrder}
            variant="secondary"
            style={{ width: '100%' }}
          />
        </Animated.View>
      </View>
    );
  }

  const getButtonTitle = () => {
    if (isAuthorizing) return authStageText.toUpperCase();
    if (currentStep === 0) return 'PROCEED TO SHIPPING METHOD';
    if (currentStep === 1) return 'PROCEED TO PAYMENT METHOD';
    if (currentStep === 2) return 'REVIEW ORDER & VALUATION';
    return `AUTHORIZE & PLACE ORDER · $${getCartTotal().toLocaleString()}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header */}
      <View style={styles.header}>
        <PressableScale
          onPress={() => {
            if (currentStep > 0) setCurrentStep(currentStep - 1);
            else onBack();
          }}
          style={styles.backBtn}
        >
          <ChevronLeft size={22} color={colors.midnightNavy} />
        </PressableScale>
        <Text style={[typography.h3, styles.headerTitle]}>CHECKOUT</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Multi-step progress bar with tap support */}
      <StepProgress
        steps={CHECKOUT_STEPS}
        currentStep={currentStep}
        onStepPress={(stepIdx) => setCurrentStep(stepIdx)}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* STEP 1: DELIVERY ADDRESS */}
        {currentStep === 0 && (
          <View style={styles.stepContainer}>
            <Text style={[typography.campaignLabel, styles.stepTitle]}>
              SELECT DELIVERY RESIDENCE
            </Text>
            {addresses.map((addr, idx) => {
              const isSelected = selectedAddress === idx;
              return (
                <PressableScale
                  key={idx}
                  onPress={() => setSelectedAddress(idx)}
                  style={[styles.choiceCard, isSelected && styles.choiceCardSelected]}
                >
                  <View style={styles.choiceHeader}>
                    <View style={styles.choiceRadio}>
                      {isSelected && <View style={styles.choiceRadioInner} />}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[typography.h4, styles.choiceTitle]}>
                        {addr.title}
                      </Text>
                      <Text style={[typography.caption, styles.choiceSub]}>
                        {addr.name}
                      </Text>
                    </View>
                    <MapPin
                      size={18}
                      color={isSelected ? colors.midnightNavy : colors.mutedPlum}
                    />
                  </View>
                  <View style={styles.choiceBody}>
                    <Text style={[typography.bodyMedium, styles.addrText]}>
                      {addr.street}
                    </Text>
                    <Text style={[typography.bodyMedium, styles.addrText]}>
                      {addr.city}
                    </Text>
                    <Text style={[typography.caption, styles.phoneText]}>
                      {addr.phone}
                    </Text>
                  </View>
                </PressableScale>
              );
            })}
          </View>
        )}

        {/* STEP 2: SHIPPING METHOD */}
        {currentStep === 1 && (
          <View style={styles.stepContainer}>
            <Text style={[typography.campaignLabel, styles.stepTitle]}>
              WHITE GLOVE SERVICE & COURIER
            </Text>
            {shippingOptions.map((opt, idx) => {
              const isSelected = selectedShipping === idx;
              return (
                <PressableScale
                  key={idx}
                  onPress={() => setSelectedShipping(idx)}
                  style={[styles.choiceCard, isSelected && styles.choiceCardSelected]}
                >
                  <View style={styles.choiceHeader}>
                    <View style={styles.choiceRadio}>
                      {isSelected && <View style={styles.choiceRadioInner} />}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[typography.h4, styles.choiceTitle]}>
                        {opt.title}
                      </Text>
                      <Text style={[typography.caption, styles.choiceEta]}>
                        {opt.eta}
                      </Text>
                    </View>
                    <Text style={[typography.h4, styles.shippingPrice]}>
                      {opt.price}
                    </Text>
                  </View>
                  <Text style={[typography.bodySmall, styles.shippingDesc]}>
                    {opt.desc}
                  </Text>
                </PressableScale>
              );
            })}
          </View>
        )}

        {/* STEP 3: PAYMENT METHOD */}
        {currentStep === 2 && (
          <View style={styles.stepContainer}>
            <Text style={[typography.campaignLabel, styles.stepTitle]}>
              CONFIDENTIAL PAYMENT METHOD
            </Text>
            {paymentMethods.map((pm, idx) => {
              const isSelected = selectedPayment === idx;
              return (
                <PressableScale
                  key={idx}
                  onPress={() => setSelectedPayment(idx)}
                  style={[styles.choiceCard, isSelected && styles.choiceCardSelected]}
                >
                  <View style={styles.choiceHeader}>
                    <View style={styles.choiceRadio}>
                      {isSelected && <View style={styles.choiceRadioInner} />}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[typography.h4, styles.choiceTitle]}>
                        {pm.title}
                      </Text>
                      <Text style={[typography.caption, styles.choiceSub]}>
                        {pm.subtitle}
                      </Text>
                    </View>
                    <CreditCard
                      size={18}
                      color={isSelected ? colors.midnightNavy : colors.mutedPlum}
                    />
                  </View>
                </PressableScale>
              );
            })}

            <View style={styles.giftNoteBox}>
              <View style={styles.giftNoteHeader}>
                <Gift size={16} color={colors.champagneGold} />
                <Text style={[typography.campaignLabel, { color: colors.midnightNavy }]}>
                  ATELIER GIFT NOTE & EMBOSSED CALLIGRAPHY
                </Text>
              </View>
              <TextInput
                value={giftNote}
                onChangeText={setGiftNote}
                multiline
                placeholder="Write your personal gift inscription..."
                placeholderTextColor={colors.warmGrey}
                style={styles.giftInput}
              />
            </View>

            <View style={styles.securityBox}>
              <Lock size={15} color={colors.champagneGold} />
              <Text style={styles.securityText}>
                256-Bit SSL Encrypted Payment Vault · Private Client Confidentiality Guaranteed
              </Text>
            </View>
          </View>
        )}

        {/* STEP 4: ORDER REVIEW */}
        {currentStep === 3 && (
          <View style={styles.stepContainer}>
            <Text style={[typography.campaignLabel, styles.stepTitle]}>
              REVIEW RESERVATION & VALUATION
            </Text>

            <View style={styles.reviewCard}>
              <Text style={[typography.caption, styles.reviewSectionLabel]}>
                DELIVERING TO
              </Text>
              <Text style={[typography.h4, styles.reviewText]}>
                {addresses[selectedAddress].title}
              </Text>
              <Text style={[typography.bodySmall, styles.reviewSubText]}>
                {addresses[selectedAddress].street}, {addresses[selectedAddress].city}
              </Text>

              <View style={styles.divider} />

              <Text style={[typography.caption, styles.reviewSectionLabel]}>
                SERVICE METHOD
              </Text>
              <Text style={[typography.h4, styles.reviewText]}>
                {shippingOptions[selectedShipping].title}
              </Text>
              <Text style={[typography.bodySmall, styles.reviewSubText]}>
                {shippingOptions[selectedShipping].eta}
              </Text>

              <View style={styles.divider} />

              <Text style={[typography.caption, styles.reviewSectionLabel]}>
                PAYMENT ARCHIVE
              </Text>
              <Text style={[typography.h4, styles.reviewText]}>
                {paymentMethods[selectedPayment].title}
              </Text>

              <View style={styles.divider} />

              <View style={styles.finalTotalRow}>
                <Text style={[typography.h2, { color: colors.midnightNavy }]}>
                  Total Investment
                </Text>
                <Text style={[typography.priceLarge, { color: colors.midnightNavy }]}>
                  ${getCartTotal().toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Action */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <Button
          title={getButtonTitle()}
          onPress={handleNextStep}
          disabled={isAuthorizing}
          loading={isAuthorizing}
          variant="primary"
          style={styles.nextBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearlIvory,
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
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: colors.midnightNavy,
    letterSpacing: 2,
    fontSize: 14,
  },
  scrollContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: 120,
  },
  stepContainer: {
    gap: spacing.md,
  },
  stepTitle: {
    color: colors.champagneGold,
    marginBottom: spacing.xs,
  },
  choiceCard: {
    backgroundColor: colors.pureWhite,
    borderRadius: layout.cardRadius,
    borderWidth: 1.2,
    borderColor: colors.blushBorder,
    padding: spacing.base,
    gap: spacing.sm,
  },
  choiceCardSelected: {
    borderColor: colors.midnightNavy,
    backgroundColor: 'rgba(246, 223, 220, 0.15)',
  },
  choiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  choiceRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.midnightNavy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceRadioInner: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: colors.midnightNavy,
  },
  choiceTitle: {
    color: colors.midnightNavy,
  },
  choiceSub: {
    color: colors.mutedPlum,
    marginTop: 2,
  },
  choiceEta: {
    color: colors.dustyRose,
    marginTop: 2,
  },
  choiceBody: {
    paddingLeft: 26,
    gap: 2,
  },
  addrText: {
    color: colors.softBlack,
    fontSize: 13,
  },
  phoneText: {
    color: colors.warmGrey,
    marginTop: 4,
  },
  shippingPrice: {
    color: colors.midnightNavy,
  },
  shippingDesc: {
    color: colors.mutedPlum,
    paddingLeft: 26,
  },
  giftNoteBox: {
    backgroundColor: colors.pureWhite,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    padding: spacing.base,
    marginTop: spacing.sm,
  },
  giftNoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  giftInput: {
    height: 60,
    backgroundColor: colors.lightBlush,
    borderRadius: 8,
    padding: spacing.sm,
    color: colors.midnightNavy,
    fontFamily: typography.bodyMedium.fontFamily,
    fontSize: 12.5,
    textAlignVertical: 'top',
  },
  securityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.xs,
    marginTop: spacing.xs,
  },
  securityText: {
    color: colors.mutedPlum,
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
  },
  reviewCard: {
    backgroundColor: colors.pureWhite,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    padding: spacing.lg,
  },
  reviewSectionLabel: {
    color: colors.mutedPlum,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  reviewText: {
    color: colors.midnightNavy,
    marginBottom: 2,
  },
  reviewSubText: {
    color: colors.warmGrey,
  },
  divider: {
    height: 1,
    backgroundColor: colors.blushBorder,
    marginVertical: spacing.md,
  },
  finalTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.pearlIvory,
    borderTopWidth: 1,
    borderTopColor: colors.blushBorder,
    paddingHorizontal: spacing.base,
    paddingTop: spacing.sm,
  },
  nextBtn: {
    width: '100%',
    height: 48,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  confettiGlow: {
    position: 'absolute',
    top: '18%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleWrapper: {
    marginBottom: spacing.lg,
  },
  successPre: {
    color: colors.champagneGold,
    letterSpacing: 2.2,
    marginBottom: spacing.xs,
  },
  successTitle: {
    color: colors.midnightNavy,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  successDesc: {
    color: colors.mutedPlum,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: spacing.xl,
  },
  successSummaryBox: {
    width: '100%',
    backgroundColor: colors.pureWhite,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    padding: spacing.base,
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  successRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  successLabel: {
    color: colors.mutedPlum,
  },
  successVal: {
    color: colors.softBlack,
  },
  successActions: {
    width: '100%',
  },
});
