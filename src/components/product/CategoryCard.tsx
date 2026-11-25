import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Category } from '../../data/categories';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { layout, spacing } from '../../theme/spacing';
import { PressableScale } from '../common/PressableScale';

interface CategoryCardProps {
  category: Category;
  isSelected?: boolean;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected = false,
  onPress,
}) => {
  return (
    <PressableScale onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.imageWrapper,
          isSelected && styles.imageWrapperSelected,
        ]}
      >
        <Image
          source={{ uri: category.image }}
          style={styles.image}
          contentFit="cover"
          transition={250}
          cachePolicy="memory-disk"
        />
      </View>
      <Text
        style={[
          typography.campaignLabel,
          styles.label,
          isSelected && styles.labelSelected,
        ]}
        numberOfLines={1}
      >
        {category.name}
      </Text>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  imageWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: colors.blushBorder,
    overflow: 'hidden',
    backgroundColor: colors.lightBlush,
    padding: 2,
  },
  imageWrapperSelected: {
    borderColor: colors.midnightNavy,
    borderWidth: 2.5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  label: {
    marginTop: spacing.xs,
    color: colors.mutedPlum,
    textAlign: 'center',
  },
  labelSelected: {
    color: colors.midnightNavy,
    fontFamily: typography.campaignLabel.fontFamily,
  },
});
