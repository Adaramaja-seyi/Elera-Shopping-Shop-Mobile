import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_700Bold_Italic,
} from '@expo-google-fonts/playfair-display';
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';

import { colors } from './src/theme/colors';
import { Product } from './src/data/products';
import { SplashScreen } from './src/screens/SplashScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { AuthScreen } from './src/screens/AuthScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { DiscoverScreen } from './src/screens/DiscoverScreen';
import { WishlistScreen } from './src/screens/WishlistScreen';
import { BagScreen } from './src/screens/BagScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { ProductDetailsScreen } from './src/screens/ProductDetailsScreen';
import { CheckoutScreen } from './src/screens/CheckoutScreen';
import { NotificationsScreen } from './src/screens/NotificationsScreen';
import { FloatingTabBar, TabKey } from './src/components/navigation/FloatingTabBar';
import { FlyingThumb } from './src/components/feedback/FlyingThumb';
import { useStore } from './src/store/useStore';

export default function App() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_700Bold_Italic,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  const { addRecentlyViewed } = useStore();

  // Navigation flow state
  const [isSplashDone, setIsSplashDone] = useState(false);
  const [isOnboardingDone, setIsOnboardingDone] = useState(false);
  const [isAuthDone, setIsAuthDone] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  // Modal / Detail views stack
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [discoverInitialCategory, setDiscoverInitialCategory] = useState('all');

  const handleSelectProduct = (product: Product) => {
    addRecentlyViewed(product.id);
    setSelectedProduct(product);
  };

  const handleNavigateToCategory = (catId: string) => {
    setDiscoverInitialCategory(catId);
    setActiveTab('discover');
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style={!isSplashDone || !isOnboardingDone ? 'light' : 'dark'} />

        {/* Global Flying Thumbnail animation for Add to Bag */}
        <FlyingThumb />

        {/* 1. Cinematic Splash Screen */}
        {!isSplashDone ? (
          <SplashScreen onFinish={() => setIsSplashDone(true)} />
        ) : !isOnboardingDone ? (
          /* 2. Editorial Onboarding */
          <OnboardingScreen onComplete={() => setIsOnboardingDone(true)} />
        ) : !isAuthDone ? (
          /* 3. Client Privilège Authentication */
          <AuthScreen onSuccess={() => setIsAuthDone(true)} />
        ) : (
          /* 4. Main Luxury Commerce Application */
          <View style={styles.appContainer}>
            {/* Active Tab Screen */}
            {activeTab === 'home' && (
              <HomeScreen
                onSelectProduct={handleSelectProduct}
                onNavigateToCategory={handleNavigateToCategory}
                onNavigateToBag={() => setActiveTab('bag')}
                onNavigateToNotifications={() => setIsNotificationsOpen(true)}
                onNavigateToSearch={() => setActiveTab('discover')}
              />
            )}

            {activeTab === 'discover' && (
              <DiscoverScreen
                initialCategory={discoverInitialCategory}
                onSelectProduct={handleSelectProduct}
              />
            )}

            {activeTab === 'wishlist' && (
              <WishlistScreen
                onSelectProduct={handleSelectProduct}
                onExplore={() => setActiveTab('discover')}
              />
            )}

            {activeTab === 'bag' && (
              <BagScreen
                onProceedToCheckout={() => setIsCheckoutOpen(true)}
                onExploreProducts={() => setActiveTab('discover')}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileScreen
                onLogout={() => setIsAuthDone(false)}
                onNavigateToNotifications={() => setIsNotificationsOpen(true)}
              />
            )}

            {/* Custom Floating Bottom Tab Navigation (hidden when in full screen details/checkout) */}
            {!selectedProduct && !isCheckoutOpen && !isNotificationsOpen && (
              <FloatingTabBar
                currentTab={activeTab}
                onSelectTab={(tab) => {
                  setActiveTab(tab);
                }}
              />
            )}

            {/* PRODUCT DETAILS OVERLAY */}
            {selectedProduct && (
              <View style={StyleSheet.absoluteFill}>
                <ProductDetailsScreen
                  product={selectedProduct}
                  onBack={() => setSelectedProduct(null)}
                  onNavigateToBag={() => {
                    setSelectedProduct(null);
                    setActiveTab('bag');
                  }}
                />
              </View>
            )}

            {/* CHECKOUT FLOW OVERLAY */}
            {isCheckoutOpen && (
              <View style={StyleSheet.absoluteFill}>
                <CheckoutScreen
                  onBack={() => setIsCheckoutOpen(false)}
                  onFinishOrder={() => {
                    setIsCheckoutOpen(false);
                    setActiveTab('home');
                  }}
                  onViewTracking={() => {
                    setIsCheckoutOpen(false);
                    setActiveTab('profile');
                  }}
                />
              </View>
            )}

            {/* NOTIFICATIONS SCREEN OVERLAY */}
            {isNotificationsOpen && (
              <View style={StyleSheet.absoluteFill}>
                <NotificationsScreen
                  onBack={() => setIsNotificationsOpen(false)}
                />
              </View>
            )}
          </View>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.pearlIvory,
  },
  appContainer: {
    flex: 1,
    backgroundColor: colors.pearlIvory,
    position: 'relative',
  },
});
