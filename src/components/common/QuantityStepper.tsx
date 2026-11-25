import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PressableScale } from './PressableScale';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, spacing } from '../../theme/spacing';
import { Minus, Plus } from 'lucide-react-native';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  min = 1,
  max = 10,
}) => {
  return (
    <View style={styles.container}>
      <PressableScale
        onPress={onDecrement}
        disabled={quantity <= min}
        style={[styles.button, quantity <= min && styles.buttonDisabled]}
      >
        <Minus size={14} color={quantity <= min ? colors.warmGrey : colors.midnightNavy} />
      </PressableScale>

      <View style={styles.countContainer}>
        <Text style={[typography.h4, styles.countText]}>{quantity}</Text>
      </View>

      <PressableScale
        onPress={onIncrement}
        disabled={quantity >= max}
        style={[styles.button, quantity >= max && styles.buttonDisabled]}
      >
        <Plus size={14} color={quantity >= max ? colors.warmGrey : colors.midnightNavy} />
      </PressableScale>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlush,
    borderRadius: layout.chipRadius,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    padding: 3,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.pureWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
    backgroundColor: 'transparent',
  },
  countContainer: {
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
  },
  countText: {
    color: colors.midnightNavy,
  },
});
