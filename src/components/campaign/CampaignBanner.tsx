import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Campaign } from '../../data/campaigns';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, spacing } from '../../theme/spacing';
import { PressableScale } from '../common/PressableScale';
import { Badge } from '../common/Badge';
import { ChevronRight } from 'lucide-react-native';

interface CampaignBannerProps {
  campaign: Campaign;
  onPress: () => void;
  style?: ViewStyle;
}

export const CampaignBanner: React.FC<CampaignBannerProps> = ({
  campaign,
  onPress,
  style,
}) => {
  return (
    <Animated.View entering={FadeInDown.duration(600)}>
      <PressableScale onPress={onPress} style={[styles.container, style]} scaleTo={0.98}>
        <Image
          source={{ uri: campaign.image }}
          style={styles.backgroundImage}
          contentFit="cover"
          transition={350}
          cachePolicy="memory-disk"
        />
        <LinearGradient
          colors={[
            'rgba(27, 29, 71, 0.15)',
            'rgba(27, 29, 71, 0.65)',
            'rgba(18, 20, 47, 0.94)',
          ]}
          style={styles.gradientOverlay}
        />

        <View style={styles.content}>
          {campaign.badge && (
            <Badge
              label={campaign.badge}
              variant={campaign.badge.includes('VIOLET') ? 'new' : 'exclusive'}
              style={styles.badge}
            />
          )}
          <Text style={[typography.campaignLabel, styles.season]}>
            {campaign.season}
          </Text>
          <Text style={[typography.h2, styles.headline]}>
            {campaign.headline}
          </Text>
          <Text
            numberOfLines={2}
            style={[typography.bodyMedium, styles.subheadline]}
          >
            {campaign.subheadline}
          </Text>

          <View style={styles.ctaRow}>
            <Text style={[typography.buttonLabel, styles.ctaText]}>
              {campaign.ctaText}
            </Text>
            <ChevronRight size={14} color={colors.pureWhite} />
          </View>
        </View>
      </PressableScale>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.base,
    height: 270,
    borderRadius: layout.cardRadius,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.midnightNavy,
    marginBottom: spacing.xl,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  badge: {
    alignSelf: 'flex-start',
    marginBottom: spacing.xs,
  },
  season: {
    color: colors.champagneGold,
    marginBottom: spacing.xs,
  },
  headline: {
    color: colors.pureWhite,
    marginBottom: spacing.xs,
  },
  subheadline: {
    color: colors.softBlush,
    marginBottom: spacing.md,
    opacity: 0.9,
    lineHeight: 18,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ctaText: {
    color: colors.pureWhite,
  },
});
