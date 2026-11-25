import { TextStyle } from 'react-native';

export const fontFamilies = {
  serifRegular: 'PlayfairDisplay_400Regular',
  serifMedium: 'PlayfairDisplay_500Medium',
  serifSemiBold: 'PlayfairDisplay_600SemiBold',
  serifBold: 'PlayfairDisplay_700Bold',
  serifItalic: 'PlayfairDisplay_400Regular_Italic',
  serifBoldItalic: 'PlayfairDisplay_700Bold_Italic',

  sansRegular: 'Manrope_400Regular',
  sansMedium: 'Manrope_500Medium',
  sansSemiBold: 'Manrope_600SemiBold',
  sansBold: 'Manrope_700Bold',
};

export const typography = {
  displayLarge: {
    fontFamily: fontFamilies.serifBold,
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.3,
  } as TextStyle,
  displayMedium: {
    fontFamily: fontFamilies.serifBold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.2,
  } as TextStyle,
  h1: {
    fontFamily: fontFamilies.serifSemiBold,
    fontSize: 21,
    lineHeight: 28,
    letterSpacing: -0.1,
  } as TextStyle,
  h2: {
    fontFamily: fontFamilies.serifMedium,
    fontSize: 18,
    lineHeight: 24,
  } as TextStyle,
  h3: {
    fontFamily: fontFamilies.sansBold,
    fontSize: 15,
    lineHeight: 20,
  } as TextStyle,
  h4: {
    fontFamily: fontFamilies.sansSemiBold,
    fontSize: 13,
    lineHeight: 18,
  } as TextStyle,
  bodyLarge: {
    fontFamily: fontFamilies.sansRegular,
    fontSize: 14,
    lineHeight: 21,
  } as TextStyle,
  bodyMedium: {
    fontFamily: fontFamilies.sansRegular,
    fontSize: 12.5,
    lineHeight: 18,
  } as TextStyle,
  bodySmall: {
    fontFamily: fontFamilies.sansRegular,
    fontSize: 11,
    lineHeight: 15,
  } as TextStyle,
  priceLarge: {
    fontFamily: fontFamilies.sansBold,
    fontSize: 19,
    lineHeight: 23,
    letterSpacing: 0.2,
  } as TextStyle,
  priceMedium: {
    fontFamily: fontFamilies.sansBold,
    fontSize: 14.5,
    lineHeight: 18,
    letterSpacing: 0.1,
  } as TextStyle,
  caption: {
    fontFamily: fontFamilies.sansMedium,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.3,
  } as TextStyle,
  campaignLabel: {
    fontFamily: fontFamilies.sansBold,
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  } as TextStyle,
  buttonLabel: {
    fontFamily: fontFamilies.sansBold,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  } as TextStyle,
};
