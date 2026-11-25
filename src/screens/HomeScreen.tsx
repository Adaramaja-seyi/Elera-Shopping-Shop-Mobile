import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  FadeInDown,
  FadeInRight,
  FadeInLeft,
  FadeIn,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Bell, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react-native';

import { colors, gradients } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout, spacing } from '../theme/spacing';
import { PRODUCTS, Product } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { HERO_CAMPAIGN, FEATURED_STORIES } from '../data/campaigns';
import { ProductCarousel } from '../components/product/ProductCarousel';
import { ProductCard } from '../components/product/ProductCard';
import { CategoryCard } from '../components/product/CategoryCard';
import { CampaignBanner } from '../components/campaign/CampaignBanner';
import { SectionHeader } from '../components/common/SectionHeader';
import { PressableScale } from '../components/common/PressableScale';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useStore } from '../store/useStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_WIDTH * 1.35;

interface HomeScreenProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToCategory: (categoryId: string) => void;
  onNavigateToBag: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToSearch: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectProduct,
  onNavigateToCategory,
  onNavigateToBag,
  onNavigateToNotifications,
  onNavigateToSearch,
}) => {
  const insets = useSafeAreaInsets();
  const { getCartCount, recentlyViewedIds } = useStore();
  const cartCount = getCartCount();
  const [selectedCatId, setSelectedCatId] = useState('all');

  const scrollY = useSharedValue(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  // Header background & border animation on scroll
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const bgOpacity = interpolate(
      scrollY.value,
      [0, 140],
      [0, 0.98],
      Extrapolation.CLAMP
    );
    const borderOpacity = interpolate(
      scrollY.value,
      [80, 160],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      backgroundColor: `rgba(255, 248, 244, ${bgOpacity})`,
      borderBottomColor: `rgba(234, 213, 209, ${borderOpacity})`,
    };
  });

  // Logo shrink and shift on scroll
  const logoAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [0, 150],
      [1.12, 0.94],
      Extrapolation.CLAMP
    );
    const letterSpacing = interpolate(
      scrollY.value,
      [0, 150],
      [5, 3],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
      letterSpacing,
    };
  });

  // Hero parallax image scaling and translation on scroll
  const heroImageAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-150, 0, 300],
      [1.3, 1, 0.92],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [0, 300],
      [0, 100],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  // Hero text multi-plane 3D parallax on scroll
  const heroTextAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 250],
      [0, 60],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollY.value,
      [0, 220],
      [1, 0],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  // Curated lists
  const newArrivals = PRODUCTS.filter((p) => p.isNew);
  const trendingNow = PRODUCTS.filter((p) => p.isTrending || p.isBestseller);
  const exclusiveCapsule = PRODUCTS.filter((p) => p.isExclusive);
  const recentlyViewed = PRODUCTS.filter((p) =>
    recentlyViewedIds.includes(p.id)
  );

  return (
    <View style={styles.container}>
      {/* Floating Collapsing Header with Animated Blur & Logo Shrink */}
      <Animated.View
        style={[
          styles.header,
          { paddingTop: Math.max(insets.top, 14) },
          headerAnimatedStyle,
        ]}
      >
        <View style={styles.headerRow}>
          <Animated.Text style={[typography.h2, styles.brandLogo, logoAnimatedStyle]}>
            É L E R A
          </Animated.Text>

          <View style={styles.headerActions}>
            <PressableScale
              onPress={onNavigateToSearch}
              style={styles.headerIconBtn}
            >
              <Search size={19} color={colors.midnightNavy} />
            </PressableScale>

            <PressableScale
              onPress={onNavigateToNotifications}
              style={styles.headerIconBtn}
            >
              <Bell size={19} color={colors.midnightNavy} />
              <View style={styles.notifDot} />
            </PressableScale>

            <PressableScale
              onPress={onNavigateToBag}
              style={styles.headerIconBtn}
            >
              <ShoppingBag size={19} color={colors.midnightNavy} />
              {cartCount > 0 && (
                <View style={styles.bagBadge}>
                  <Text style={styles.bagBadgeText}>{cartCount}</Text>
                </View>
              )}
            </PressableScale>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* PARALLAX HERO CAMPAIGN WITH KINETIC REVEAL */}
        <View style={styles.heroContainer}>
          <Animated.View
            style={[styles.heroImageWrapper, heroImageAnimatedStyle]}
          >
            <Image
              source={{ uri: HERO_CAMPAIGN.image }}
              style={styles.heroImage}
              contentFit="cover"
              priority="high"
              transition={400}
            />
            <LinearGradient
              colors={[
                'rgba(18, 20, 47, 0.15)',
                'rgba(18, 20, 47, 0.4)',
                'rgba(18, 20, 47, 0.95)',
              ]}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>

          {/* Hero Content with Staggered Entrance and Scroll Parallax */}
          <Animated.View style={[styles.heroContent, heroTextAnimatedStyle]}>
            <Animated.View entering={FadeInDown.delay(150).duration(600)}>
              <Badge
                label={HERO_CAMPAIGN.badge || 'NEW SEASON'}
                variant="new"
                style={styles.heroBadge}
              />
            </Animated.View>

            <Animated.Text
              entering={FadeInDown.delay(260).duration(600)}
              style={[typography.campaignLabel, styles.heroSeason]}
            >
              {HERO_CAMPAIGN.season}
            </Animated.Text>

            {/* Dramatic Masked Headline Reveal */}
            <Animated.View
              entering={FadeInDown.delay(380).springify().damping(18)}
              style={styles.headlineMask}
            >
              <Text style={[typography.displayLarge, styles.heroHeadline]}>
                THE ARCHITECTURAL{'\n'}SILHOUETTE
              </Text>
            </Animated.View>

            <Animated.Text
              entering={FadeInDown.delay(520).duration(650)}
              style={[typography.bodyLarge, styles.heroSubhead]}
            >
              {HERO_CAMPAIGN.subheadline}
            </Animated.Text>

            <Animated.View entering={FadeInDown.delay(650).springify().damping(16)}>
              <Button
                title="EXPLORE RUNWAY CAMPAIGN"
                onPress={() => onNavigateToCategory('clothing')}
                variant="secondary"
                style={styles.heroCta}
              />
            </Animated.View>
          </Animated.View>
        </View>

        {/* KINETIC CATEGORY SELECTOR CHIPS */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(500)}
          style={styles.categoriesSection}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {CATEGORIES.map((cat, idx) => (
              <Animated.View
                key={cat.id}
                entering={FadeInRight.delay(idx * 45).springify().damping(16)}
              >
                <CategoryCard
                  category={cat}
                  isSelected={cat.id === selectedCatId}
                  onPress={() => {
                    setSelectedCatId(cat.id);
                    onNavigateToCategory(cat.id);
                  }}
                />
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* NEW ARRIVALS CAROUSEL */}
        <Animated.View entering={FadeIn.delay(200).duration(600)} style={styles.section}>
          <SectionHeader
            title="New Arrivals"
            subtitle="AUTUMN / WINTER 2026"
            actionText="VIEW ALL"
            onActionPress={() => onNavigateToCategory('all')}
          />
          <ProductCarousel
            products={newArrivals}
            onProductPress={onSelectProduct}
          />
        </Animated.View>

        {/* EDITORIAL CAMPAIGN BANNER 01 */}
        <Animated.View entering={FadeInDown.delay(250).duration(600)}>
          <CampaignBanner
            campaign={FEATURED_STORIES[0]}
            onPress={() => onNavigateToCategory('bags')}
          />
        </Animated.View>

        {/* TRENDING NOW (2-COLUMN GRID WITH STAGGERED REVEAL) */}
        <View style={styles.section}>
          <SectionHeader
            title="Trending Now"
            subtitle="GLOBAL EDITORIAL PICKS"
            actionText="SEE MORE"
            onActionPress={() => onNavigateToCategory('all')}
          />
          <View style={styles.gridContainer}>
            {trendingNow.map((item, idx) => (
              <ProductCard
                key={item.id}
                product={item}
                index={idx}
                onPress={() => onSelectProduct(item)}
              />
            ))}
          </View>
        </View>

        {/* EXCLUSIVE CAPSULE BANNER 02 */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <CampaignBanner
            campaign={FEATURED_STORIES[1]}
            onPress={() => onNavigateToCategory('shoes')}
          />
        </Animated.View>

        {/* EXCLUSIVE COLLECTIONS CAROUSEL */}
        <View style={styles.section}>
          <SectionHeader
            title="Exclusive Capsule"
            subtitle="LIMITED ATELIER PRODUCTION"
            actionText="DISCOVER"
            onActionPress={() => onNavigateToCategory('clothing')}
          />
          <ProductCarousel
            products={exclusiveCapsule}
            onProductPress={onSelectProduct}
          />
        </View>

        {/* PROMO BANNER MOMENT WITH VIOLET GLOW */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(600)}
          style={styles.promoBanner}
        >
          <LinearGradient
            colors={[...gradients.violetMidnight]}
            style={styles.promoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.promoContent}>
              <View style={styles.promoHeaderRow}>
                <Badge label="PRIVATE ACCESS" variant="exclusive" />
                <Sparkles size={16} color={colors.champagneGold} />
              </View>
              <Text style={[typography.h2, styles.promoTitle]}>
                Complimentary White Glove Delivery & Bespoke Monogramming
              </Text>
              <Text style={[typography.bodyMedium, styles.promoDesc]}>
                Receive personal atelier packaging, wax seal authenticity certificate, and climate-controlled courier service on orders over $1,500.
              </Text>
              <PressableScale
                onPress={() => onNavigateToCategory('all')}
                style={styles.promoBtn}
              >
                <Text style={[typography.buttonLabel, styles.promoBtnText]}>
                  ENTER PRIVILÈGE
                </Text>
                <ArrowRight size={13} color={colors.pureWhite} />
              </PressableScale>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* RECENTLY VIEWED */}
        {recentlyViewed.length > 0 && (
          <View style={[styles.section, { marginBottom: 120 }]}>
            <SectionHeader
              title="Recently Viewed"
              subtitle="YOUR ARCHIVE"
            />
            <ProductCarousel
              products={recentlyViewed}
              onProductPress={onSelectProduct}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearlIvory,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    height: layout.headerHeight,
  },
  brandLogo: {
    color: colors.midnightNavy,
    letterSpacing: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(246, 223, 220, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6.5,
    height: 6.5,
    borderRadius: 3.5,
    backgroundColor: colors.hotCoral,
  },
  bagBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.electricViolet,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  bagBadgeText: {
    color: colors.pureWhite,
    fontSize: 9,
    fontFamily: typography.h3.fontFamily,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroContainer: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
    position: 'relative',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  heroImageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    zIndex: 2,
  },
  heroBadge: {
    marginBottom: spacing.xs,
  },
  heroSeason: {
    color: colors.champagneGold,
    marginBottom: spacing.xs,
  },
  headlineMask: {
    overflow: 'hidden',
    paddingBottom: 2,
  },
  heroHeadline: {
    color: colors.pureWhite,
    marginBottom: spacing.xs,
    lineHeight: 36,
  },
  heroSubhead: {
    color: colors.softBlush,
    marginBottom: spacing.lg,
    opacity: 0.9,
    lineHeight: 20,
  },
  heroCta: {
    alignSelf: 'flex-start',
    minWidth: 180,
    height: 48,
  },
  categoriesSection: {
    paddingVertical: spacing.lg,
    backgroundColor: colors.pearlIvory,
  },
  categoriesScroll: {
    paddingHorizontal: spacing.base,
  },
  section: {
    marginTop: spacing.lg,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
  },
  promoBanner: {
    marginHorizontal: spacing.base,
    marginVertical: spacing.xl,
    borderRadius: layout.cardRadius,
    overflow: 'hidden',
  },
  promoGradient: {
    padding: spacing.xl,
  },
  promoContent: {
    gap: spacing.sm,
  },
  promoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoTitle: {
    color: colors.pureWhite,
    marginTop: spacing.xs,
  },
  promoDesc: {
    color: colors.softBlush,
    lineHeight: 19,
    opacity: 0.9,
  },
  promoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  promoBtnText: {
    color: colors.pureWhite,
  },
});
