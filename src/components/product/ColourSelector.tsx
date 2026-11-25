import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProductColor } from '../../data/products';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { PressableScale } from '../common/PressableScale';

interface ColourSelectorProps {
  colorsList: ProductColor[];
  selectedColor: ProductColor;
  onSelectColor: (color: ProductColor) => void;
}

export const ColourSelector: React.FC<ColourSelectorProps> = ({
  colorsList,
  selectedColor,
  onSelectColor,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[typography.campaignLabel, styles.headerLabel]}>
          COLOUR
        </Text>
        <Text style={[typography.bodyMedium, styles.colorName]}>
          {selectedColor.name}
        </Text>
      </View>

      <View style={styles.swatchRow}>
        {colorsList.map((item) => {
          const isSelected = item.name === selectedColor.name;
          return (
            <PressableScale
              key={item.name}
              onPress={() => onSelectColor(item)}
              style={[
                styles.swatchRing,
                isSelected && styles.swatchRingSelected,
              ]}
              scaleTo={0.92}
            >
              <View style={[styles.swatchCircle, { backgroundColor: item.hex }]} />
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  headerLabel: {
    color: colors.midnightNavy,
  },
  colorName: {
    color: colors.mutedPlum,
  },
  swatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  swatchRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  swatchRingSelected: {
    borderColor: colors.midnightNavy,
  },
  swatchCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.blushBorder,
  },
});
