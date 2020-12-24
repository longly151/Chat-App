import AppView from '@utils/appView';
import Color from '../Color';

/**
 * Button
 */
const borderWidth = 0;
const titleFontSize = 16;
const marginVertical = 5;
const marginHorizontal = 0;
const titlePaddingVertical = 0;
const titlePaddingHorizontal = 20;
const outlineBorderWidth = 1;
const height = 40;
const { roundedBorderRadius } = AppView;

export const darkButton = {
  /**
   * Normal
   */
  borderWidth,
  borderColor: Color.white,
  backgroundColor: Color.darkSecondaryBackground,
  titleColor: Color.white,
  titleFontSize,
  marginVertical,
  marginHorizontal,
  titlePaddingVertical,
  titlePaddingHorizontal,
  roundedBorderRadius,
  height,
  /**
   * Outline
   */
  outlineBorderWidth,
  outlineBorderColor: Color.white,
  outlineTitleColor: Color.white,
  /**
   * Active
   */
  activeBackgroundColor: Color.blue,
  activeTitleColor: Color.white,
  activeOutlineTitleColor: Color.white,
  activeBorderColor: Color.blue,
  activeOutlineBorderColor: Color.blue,
};
export const lightButton = {
  /**
   * Normal
   */
  borderWidth,
  borderColor: Color.white,
  backgroundColor: Color.lightSecondaryBackground,
  titleColor: Color.black,
  titleFontSize,
  marginVertical,
  marginHorizontal,
  titlePaddingVertical,
  titlePaddingHorizontal,
  roundedBorderRadius,
  height,
  /**
   * Outline
   */
  outlineBorderWidth,
  outlineBorderColor: Color.black,
  outlineTitleColor: Color.black,
  /**
   * Active
   */
  activeBackgroundColor: Color.blue,
  activeTitleColor: Color.white,
  activeOutlineTitleColor: Color.white,
  activeBorderColor: Color.blue,
  activeOutlineBorderColor: Color.blue,
};
