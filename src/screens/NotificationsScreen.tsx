import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Bell, Sparkles, Package, ShieldCheck } from 'lucide-react-native';

import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { layout, spacing } from '../theme/spacing';
import { PressableScale } from '../components/common/PressableScale';

interface NotificationsScreenProps {
  onBack: () => void;
}

const NOTIFICATIONS = [
  {
    id: 'notif-1',
    icon: <Sparkles size={18} color={colors.electricViolet} />,
    title: 'Autumn / Winter 2026 Runway Capsule',
    message: 'Your early VIP allocation for Sovereign Double-Breasted Wool Coats is now accessible.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 'notif-2',
    icon: <Package size={18} color={colors.champagneGold} />,
    title: 'Atelier Tailoring Progress',
    message: 'Order #ELR-2026-9812 has completed hand-inspection in Florence and is dispatched.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 'notif-3',
    icon: <ShieldCheck size={18} color={colors.dustyRose} />,
    title: 'Platinum Privilège Verified',
    message: 'Your complimentary white-glove trunk courier has been renewed for the fiscal season.',
    time: '3 days ago',
    unread: false,
  },
];

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <PressableScale onPress={onBack} style={styles.backBtn}>
          <ChevronLeft size={22} color={colors.midnightNavy} />
        </PressableScale>
        <Text style={[typography.h3, styles.headerTitle]}>NOTIFICATIONS</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[typography.campaignLabel, styles.sectionTitle]}>
          ATELIER DISPATCHES & PRIVILEGE FEEDS
        </Text>

        <View style={styles.list}>
          {NOTIFICATIONS.map((item) => (
            <View
              key={item.id}
              style={[styles.card, item.unread && styles.cardUnread]}
            >
              <View style={styles.iconCircle}>{item.icon}</View>
              <View style={styles.textCol}>
                <View style={styles.titleRow}>
                  <Text style={[typography.h4, styles.title]}>{item.title}</Text>
                  {item.unread && <View style={styles.unreadDot} />}
                </View>
                <Text style={[typography.bodySmall, styles.message]}>
                  {item.message}
                </Text>
                <Text style={[typography.caption, styles.time]}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.blushBorder,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightBlush,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: colors.midnightNavy,
  },
  scrollContent: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    paddingBottom: 40,
  },
  sectionTitle: {
    color: colors.champagneGold,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.pureWhite,
    borderRadius: layout.cardRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    padding: spacing.base,
    gap: spacing.md,
  },
  cardUnread: {
    borderColor: colors.champagneGold,
    backgroundColor: colors.lightBlush,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.pureWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.blushBorder,
  },
  textCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    color: colors.midnightNavy,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.hotCoral,
  },
  message: {
    color: colors.mutedPlum,
    lineHeight: 18,
    marginBottom: 6,
  },
  time: {
    color: colors.champagneGold,
  },
});
