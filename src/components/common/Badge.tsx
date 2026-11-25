import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, spacing } from '../../theme/spacing';

export type BadgeVariant = 'new' | 'sale' | 'exclusive' | 'bestseller' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'new',
  style,
}) => {
  let bg: string = colors.midnightNavy;
  let textCol: string = colors.pureWhite;

  switch (variant) {
    case 'new':
      bg = colors.electricViolet; // signature sharp hit for new
      textCol = colors.pureWhite;
      break;
    case 'sale':
      bg = colors.hotCoral; // signature sharp hit for sale
      textCol = colors.pureWhite;
      break;
    case 'exclusive':
      bg = colors.champagneGold;
      textCol = colors.deepNavy;
      break;
    case 'bestseller':
      bg = colors.midnightNavy;
      textCol = colors.pureWhite;
      break;
    case 'neutral':
      bg = colors.lightBlush;
      textCol = colors.mutedPlum;
      break;
  }

  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text style={[typography.campaignLabel, { color: textCol }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: layout.badgeRadius,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
