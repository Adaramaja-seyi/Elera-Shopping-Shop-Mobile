import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { PressableScale } from './PressableScale';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { ChevronRight } from 'lucide-react-native';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText,
  onActionPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        {subtitle && (
          <Text style={[typography.campaignLabel, styles.subtitle]}>
            {subtitle}
          </Text>
        )}
        <Text style={[typography.h2, styles.title]}>{title}</Text>
      </View>
      {actionText && onActionPress && (
        <PressableScale onPress={onActionPress} style={styles.actionButton}>
          <Text style={[typography.campaignLabel, styles.actionText]}>
            {actionText}
          </Text>
          <ChevronRight size={14} color={colors.midnightNavy} />
        </PressableScale>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.base,
    paddingHorizontal: spacing.base,
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    color: colors.dustyRose,
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.midnightNavy,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: spacing.xs,
  },
  actionText: {
    color: colors.midnightNavy,
    marginRight: 2,
  },
});
