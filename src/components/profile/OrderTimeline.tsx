import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Check } from 'lucide-react-native';

interface TimelineItem {
  title: string;
  description: string;
  time: string;
  completed: boolean;
  current?: boolean;
}

interface OrderTimelineProps {
  timeline: TimelineItem[];
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ timeline }) => {
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(1.3, {
        duration: 900,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: 2 - pulseScale.value,
  }));

  return (
    <View style={styles.container}>
      {timeline.map((step, idx) => {
        const isLast = idx === timeline.length - 1;

        return (
          <View key={step.title} style={styles.row}>
            {/* Indicator column */}
            <View style={styles.indicatorCol}>
              <View
                style={[
                  styles.nodeCircle,
                  step.completed && styles.nodeCompleted,
                  step.current && styles.nodeCurrent,
                ]}
              >
                {step.current && (
                  <Animated.View
                    style={[styles.pulseRing, pulseAnimatedStyle]}
                  />
                )}
                {step.completed && !step.current ? (
                  <Check size={11} color={colors.pureWhite} strokeWidth={2.5} />
                ) : (
                  <View
                    style={[
                      styles.innerDot,
                      step.current && { backgroundColor: colors.champagneGold },
                    ]}
                  />
                )}
              </View>

              {!isLast && (
                <View
                  style={[
                    styles.verticalLine,
                    step.completed && styles.verticalLineFilled,
                  ]}
                />
              )}
            </View>

            {/* Content column */}
            <View style={styles.contentCol}>
              <View style={styles.titleRow}>
                <Text
                  style={[
                    typography.h4,
                    styles.stepTitle,
                    step.current && { color: colors.midnightNavy },
                  ]}
                >
                  {step.title}
                </Text>
                <Text style={[typography.caption, styles.timeText]}>
                  {step.time}
                </Text>
              </View>
              <Text style={[typography.bodySmall, styles.stepDesc]}>
                {step.description}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  row: {
    flexDirection: 'row',
    minHeight: 64,
  },
  indicatorCol: {
    alignItems: 'center',
    width: 28,
    marginRight: spacing.md,
  },
  nodeCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.lightBlush,
    borderWidth: 1.5,
    borderColor: colors.blushBorder,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
  },
  nodeCompleted: {
    backgroundColor: colors.midnightNavy,
    borderColor: colors.midnightNavy,
  },
  nodeCurrent: {
    backgroundColor: colors.deepNavy,
    borderColor: colors.champagneGold,
    borderWidth: 2,
  },
  pulseRing: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(214, 185, 140, 0.4)',
    zIndex: -1,
  },
  innerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.mutedPlum,
  },
  verticalLine: {
    flex: 1,
    width: 2,
    backgroundColor: colors.blushBorder,
    marginVertical: 4,
  },
  verticalLineFilled: {
    backgroundColor: colors.midnightNavy,
  },
  contentCol: {
    flex: 1,
    paddingBottom: spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  stepTitle: {
    color: colors.midnightNavy,
    fontSize: 14,
  },
  timeText: {
    color: colors.mutedPlum,
  },
  stepDesc: {
    color: colors.mutedPlum,
  },
});
