import AppView from '@utils/appView';
import Color from '../Color';
/**
 * Modal
 */
const { roundedBorderRadius } = AppView;
const width = 300;

export const darkModal = {
  backgroundColor: Color.darkPrimaryBackground,
  textColor: Color.darkPrimaryText,
  roundedBorderRadius,
  width,
};
export const lightModal = {
  backgroundColor: Color.lightPrimaryBackground,
  textColor: Color.lightPrimaryText,
  roundedBorderRadius,
  width,
};
