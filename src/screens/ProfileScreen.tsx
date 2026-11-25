import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Package,
  MapPin,
  CreditCard,
  Bell,
  Headphones,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout, spacing } from '../theme/spacing';
import { OrderTimeline } from '../components/profile/OrderTimeline';
import { PressableScale } from '../components/common/PressableScale';
import { BottomSheet } from '../components/common/BottomSheet';
import { Badge } from '../components/common/Badge';
import { useStore, OrderItem } from '../store/useStore';

interface ProfileScreenProps {
  onLogout: () => void;
  onNavigateToNotifications: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onLogout,
  onNavigateToNotifications,
}) => {
  const insets = useSafeAreaInsets();
  const { user, orders, logout } = useStore();

  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [conciergeEnabled, setConciergeEnabled] = useState(true);

  const handleLogout = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {}
    logout();
    onLogout();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* VIP Client Card */}
        <View style={styles.vipCard}>
          <View style={styles.vipHeader}>
            <View>
              <Text style={[typography.campaignLabel, styles.tierLabel]}>
                {user?.tier || 'PLATINUM PRIVILÈGE'}
              </Text>
              <Text style={[typography.h1, styles.clientName]}>
                {user?.name || 'Alexandra de Valois'}
              </Text>
              <Text style={[typography.caption, styles.clientEmail]}>
                {user?.email || 'alexandra.valois@elera-atelier.com'}
              </Text>
            </View>
            <View style={styles.vipBadge}>
              <Sparkles size={18} color={colors.champagneGold} />
            </View>
          </View>

          <View style={styles.vipFooter}>
            <Text style={[typography.caption, styles.vipNumberLabel]}>
              CLIENTÉLE ARCHIVE
            </Text>
            <Text style={[typography.caption, styles.vipNumber]}>
              {user?.vipNumber || 'ELR-7889-VIP'}
            </Text>
          </View>
        </View>

        {/* ORDER HISTORY */}
        <View style={styles.section}>
          <Text style={[typography.campaignLabel, styles.sectionTitle]}>
            ATELIER ORDERS ({orders.length})
          </Text>

          {orders.map((ord) => (
            <PressableScale
              key={ord.id}
              onPress={() => setSelectedOrder(ord)}
              style={styles.orderCard}
            >
              <View style={styles.orderTopRow}>
                <View style={styles.orderIdGroup}>
                  <Package size={18} color={colors.midnightNavy} />
                  <Text style={[typography.h4, styles.orderNumber]}>
                    {ord.orderNumber}
                  </Text>
                </View>
                <Badge
                  label={ord.status}
                  variant={ord.status === 'Delivered' ? 'bestseller' : 'new'}
                />
              </View>

              <Text style={[typography.caption, styles.orderDate]}>
                Placed on {ord.date} · {ord.items.length} creation(s)
              </Text>

              <View style={styles.orderBottomRow}>
                <Text style={[typography.priceMedium, styles.orderTotal]}>
                  ${ord.total.toLocaleString()}
                </Text>

                <View style={styles.trackLink}>
                  <Text style={[typography.caption, styles.trackText]}>
                    View Tracking Timeline
                  </Text>
                  <ChevronRight size={14} color={colors.dustyRose} />
                </View>
              </View>
            </PressableScale>
          ))}
        </View>

        {/* PREFERENCES & CONCIERGE */}
        <View style={styles.section}>
          <Text style={[typography.campaignLabel, styles.sectionTitle]}>
            PRIVILÈGE CONCIERGE & SALONS
          </Text>

          <View style={styles.menuCard}>
            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Headphones size={18} color={colors.midnightNavy} />
                <View>
                  <Text style={[typography.bodyMedium, styles.menuTitle]}>
                    Personal Atelier Stylist
                  </Text>
                  <Text style={[typography.caption, styles.menuSub]}>
                    Direct priority line to Paris couture desk
                  </Text>
                </View>
              </View>
              <Switch
                value={conciergeEnabled}
                onValueChange={setConciergeEnabled}
                trackColor={{ false: colors.blushBorder, true: colors.midnightNavy }}
                thumbColor={colors.pureWhite}
              />
            </View>

            <View style={styles.menuDivider} />

            <View style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Bell size={18} color={colors.midnightNavy} />
                <View>
                  <Text style={[typography.bodyMedium, styles.menuTitle]}>
                    Runway Drop & VIP Invitations
                  </Text>
                  <Text style={[typography.caption, styles.menuSub]}>
                    Early allocations 24 hours prior to public release
                  </Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.blushBorder, true: colors.midnightNavy }}
                thumbColor={colors.pureWhite}
              />
            </View>
          </View>
        </View>

        {/* SETTINGS & ARCHIVES */}
        <View style={styles.section}>
          <Text style={[typography.campaignLabel, styles.sectionTitle]}>
            CLIENT PROFILE SETTINGS
          </Text>

          <View style={styles.menuCard}>
            <PressableScale
              onPress={onNavigateToNotifications}
              style={styles.menuLink}
            >
              <View style={styles.menuLeft}>
                <Bell size={18} color={colors.midnightNavy} />
                <Text style={[typography.bodyMedium, styles.menuTitle]}>
                  Atelier Dispatch Notifications
                </Text>
              </View>
              <ChevronRight size={16} color={colors.mutedPlum} />
            </PressableScale>

            <View style={styles.menuDivider} />

            <PressableScale style={styles.menuLink}>
              <View style={styles.menuLeft}>
                <MapPin size={18} color={colors.midnightNavy} />
                <Text style={[typography.bodyMedium, styles.menuTitle]}>
                  Saved Luxury Residences
                </Text>
              </View>
              <ChevronRight size={16} color={colors.mutedPlum} />
            </PressableScale>

            <View style={styles.menuDivider} />

            <PressableScale style={styles.menuLink}>
              <View style={styles.menuLeft}>
                <CreditCard size={18} color={colors.midnightNavy} />
                <Text style={[typography.bodyMedium, styles.menuTitle]}>
                  Payment Cards & Line of Credit
                </Text>
              </View>
              <ChevronRight size={16} color={colors.mutedPlum} />
            </PressableScale>

            <View style={styles.menuDivider} />

            <PressableScale onPress={handleLogout} style={styles.menuLink}>
              <View style={styles.menuLeft}>
                <LogOut size={18} color={colors.hotCoral} />
                <Text style={[typography.bodyMedium, { color: colors.hotCoral }]}>
                  Exit Confidential Session
                </Text>
              </View>
              <ChevronRight size={16} color={colors.hotCoral} />
            </PressableScale>
          </View>
        </View>
      </ScrollView>

      {/* TRACKING BOTTOM SHEET */}
      <BottomSheet
        visible={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `TRACKING ${selectedOrder.orderNumber}` : ''}
      >
        {selectedOrder && (
          <View style={styles.trackingContent}>
            <View style={styles.trackingHeader}>
              <Text style={[typography.caption, { color: colors.champagneGold }]}>
                STATUS: {selectedOrder.status.toUpperCase()}
              </Text>
              <Text style={[typography.bodySmall, { color: colors.mutedPlum }]}>
                Destination: {selectedOrder.shippingAddress}
              </Text>
            </View>

            <OrderTimeline timeline={selectedOrder.timeline} />
          </View>
        )}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pearlIvory,
  },
  scrollContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: 110,
  },
  vipCard: {
    backgroundColor: colors.midnightNavy,
    borderRadius: layout.cardRadius,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    shadowColor: colors.deepNavy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 8,
  },
  vipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  tierLabel: {
    color: colors.champagneGold,
    marginBottom: 4,
  },
  clientName: {
    color: colors.pureWhite,
    marginBottom: 2,
  },
  clientEmail: {
    color: colors.softBlush,
    opacity: 0.8,
  },
  vipBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.deepNavy,
    borderWidth: 1,
    borderColor: colors.champagneGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vipFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.midnightBorder,
    paddingTop: spacing.md,
  },
  vipNumberLabel: {
    color: colors.champagneGold,
  },
  vipNumber: {
    color: colors.softBlush,
    fontFamily: typography.h4.fontFamily,
    letterSpacing: 2,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.champagneGold,
    marginBottom: spacing.sm,
  },
  orderCard: {
    backgroundColor: colors.pureWhite,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    padding: spacing.base,
    marginBottom: spacing.sm,
  },
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  orderIdGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  orderNumber: {
    color: colors.midnightNavy,
  },
  orderDate: {
    color: colors.mutedPlum,
    marginBottom: spacing.sm,
  },
  orderBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.lightBlush,
    paddingTop: spacing.sm,
  },
  orderTotal: {
    color: colors.midnightNavy,
  },
  trackLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  trackText: {
    color: colors.dustyRose,
  },
  menuCard: {
    backgroundColor: colors.pureWhite,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.base,
  },
  menuLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.base,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  menuTitle: {
    color: colors.midnightNavy,
  },
  menuSub: {
    color: colors.mutedPlum,
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.lightBlush,
  },
  trackingContent: {
    paddingVertical: spacing.sm,
  },
  trackingHeader: {
    marginBottom: spacing.md,
    gap: 4,
  },
});
