import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface StepProgressProps {
  steps: string[];
  currentStep: number; // 0-indexed
  onStepPress?: (stepIndex: number) => void;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  currentStep,
  onStepPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.stepsRow}>
        {steps.map((label, idx) => {
          const isPassed = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <React.Fragment key={label}>
              <Pressable
                onPress={() => {
                  if (onStepPress) {
                    try {
                      Haptics.selectionAsync();
                    } catch (e) {}
                    onStepPress(idx);
                  }
                }}
                style={styles.stepNode}
              >
                <View
                  style={[
                    styles.circle,
                    isPassed && styles.circlePassed,
                    isCurrent && styles.circleCurrent,
                  ]}
                >
                  {isPassed ? (
                    <Check size={11} color={colors.pureWhite} strokeWidth={2.5} />
                  ) : (
                    <Text
                      style={[
                        typography.caption,
                        styles.circleNumber,
                        isCurrent && styles.circleNumberCurrent,
                      ]}
                    >
                      {idx + 1}
                    </Text>
                  )}
                </View>
                <Text
                  numberOfLines={1}
                  style={[
                    typography.caption,
                    styles.stepLabel,
                    (isCurrent || isPassed) && styles.stepLabelActive,
                  ]}
                >
                  {label}
                </Text>
              </Pressable>

              {idx < steps.length - 1 && (
                <View style={styles.lineContainer}>
                  <View
                    style={[
                      styles.line,
                      isPassed && styles.lineFilled,
                    ]}
                  />
                </View>
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.pearlIvory,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepNode: {
    alignItems: 'center',
    minWidth: 50,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.lightBlush,
    borderWidth: 1.5,
    borderColor: colors.blushBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  circlePassed: {
    backgroundColor: colors.midnightNavy,
    borderColor: colors.midnightNavy,
  },
  circleCurrent: {
    backgroundColor: colors.pureWhite,
    borderColor: colors.champagneGold,
    borderWidth: 2,
  },
  circleNumber: {
    color: colors.mutedPlum,
    fontSize: 9.5,
  },
  circleNumberCurrent: {
    color: colors.midnightNavy,
    fontFamily: typography.h3.fontFamily,
  },
  stepLabel: {
    color: colors.mutedPlum,
    fontSize: 9.5,
    textAlign: 'center',
  },
  stepLabelActive: {
    color: colors.midnightNavy,
    fontFamily: typography.h4.fontFamily,
  },
  lineContainer: {
    flex: 1,
    height: 2,
    marginHorizontal: 3,
    marginBottom: 14,
  },
  line: {
    height: 2,
    backgroundColor: colors.blushBorder,
    borderRadius: 1,
  },
  lineFilled: {
    backgroundColor: colors.midnightNavy,
  },
});
