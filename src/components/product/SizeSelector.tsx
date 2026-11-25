import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, spacing } from '../../theme/spacing';
import { PressableScale } from '../common/PressableScale';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[typography.campaignLabel, styles.headerLabel]}>
          SELECT SIZE
        </Text>
        <Text style={[typography.caption, styles.guideLabel]}>
          Size Guide
        </Text>
      </View>

      <View style={styles.sizesRow}>
        {sizes.map((size) => {
          const isSelected = size === selectedSize;
          return (
            <PressableScale
              key={size}
              onPress={() => onSelectSize(size)}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
              ]}
              scaleTo={0.94}
            >
              <Text
                style={[
                  typography.buttonLabel,
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                ]}
              >
                {size}
              </Text>
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerLabel: {
    color: colors.midnightNavy,
  },
  guideLabel: {
    color: colors.dustyRose,
    textDecorationLine: 'underline',
  },
  sizesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    minWidth: 54,
    height: 44,
    paddingHorizontal: spacing.md,
    borderRadius: layout.chipRadius,
    backgroundColor: colors.lightBlush,
    borderWidth: 1,
    borderColor: colors.blushBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: colors.midnightNavy,
    borderColor: colors.midnightNavy,
  },
  chipText: {
    color: colors.midnightNavy,
  },
  chipTextSelected: {
    color: colors.pureWhite,
  },
});
