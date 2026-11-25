import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Star } from 'lucide-react-native';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  style?: ViewStyle;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviewCount,
  size = 14,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((index) => {
          const isFilled = rating >= index;
          return (
            <Star
              key={index}
              size={size}
              color={colors.champagneGold}
              fill={isFilled ? colors.champagneGold : 'transparent'}
              strokeWidth={1.5}
              style={{ marginRight: 2 }}
            />
          );
        })}
      </View>
      <Text style={[typography.caption, styles.ratingText]}>
        {rating.toFixed(1)}
        {reviewCount !== undefined ? ` (${reviewCount})` : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.xs,
  },
  ratingText: {
    color: colors.mutedPlum,
  },
});
