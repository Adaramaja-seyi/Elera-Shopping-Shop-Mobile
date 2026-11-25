import React from 'react';
import { StyleSheet, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { PressableScale } from './PressableScale';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, spacing } from '../../theme/spacing';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';
  const isDanger = variant === 'danger';

  const containerStyle: ViewStyle = {
    ...styles.base,
    backgroundColor: isPrimary
      ? colors.midnightNavy
      : isSecondary
      ? colors.softBlush
      : isDanger
      ? colors.hotCoral
      : 'transparent',
    borderWidth: isSecondary ? 1 : 0,
    borderColor: isSecondary ? colors.blushBorder : 'transparent',
    opacity: disabled ? 0.45 : 1,
    ...style,
  };

  const labelStyle: TextStyle = {
    ...typography.buttonLabel,
    color: isPrimary
      ? colors.pureWhite
      : isSecondary
      ? colors.midnightNavy
      : isDanger
      ? colors.pureWhite
      : colors.midnightNavy,
    ...textStyle,
  };

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled || loading}
      style={containerStyle}
      scaleTo={0.97}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isPrimary || isDanger ? colors.pureWhite : colors.midnightNavy}
        />
      ) : (
        <>
          {icon}
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[labelStyle, icon ? { marginLeft: spacing.sm } : null]}
          >
            {title}
          </Text>
        </>
      )}
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: layout.buttonRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
});
