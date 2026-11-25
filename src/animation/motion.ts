import { Easing } from 'react-native-reanimated';

export const motion = {
  spring: {
    soft: {
      damping: 18,
      stiffness: 140,
    },
    snappy: {
      damping: 20,
      stiffness: 260,
    },
    sheet: {
      damping: 22,
      stiffness: 180,
      mass: 0.9,
    },
    bouncy: {
      damping: 12,
      stiffness: 160,
    },
  },
  easing: {
    reveal: Easing.bezier(0.22, 1, 0.36, 1),
    transition: Easing.bezier(0.65, 0, 0.35, 1),
    inOut: Easing.inOut(Easing.ease),
  },
  durations: {
    micro: 150,
    standard: 320,
    cinematic: 900,
    entrance: 600,
  },
  press: {
    scale: 0.96,
  },
  stagger: {
    itemDelay: 50,
    maxCap: 350,
  },
};

export const getStaggerDelay = (index: number, step = motion.stagger.itemDelay, max = motion.stagger.maxCap): number => {
  return Math.min(index * step, max);
};
