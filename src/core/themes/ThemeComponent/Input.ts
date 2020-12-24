import AppView from '@utils/appView';
import Color from '../Color';

/**
 * Input
 */
const sharpBorderBottomWidth = 0;
const roundedBorderBottomWidth = 0;
const underlineBorderBottomWidth = 1;
const sharpFontSize = 14;
const roundedFontSize = 14;
const underlineFontSize = 14;

export const darkInput = {
  sharp: {
    containerStyle: {
      backgroundColor: Color.darkSecondaryBackground,
    },
    inputContainerStyle: {
      borderBottomWidth: sharpBorderBottomWidth,
    },
    inputStyle: {
      color: Color.darkPrimaryText,
      fontSize: sharpFontSize,
    },
  },
  rounded: {
    containerStyle: {
      backgroundColor: Color.darkSecondaryBackground,
      borderRadius: AppView.roundedBorderRadius,
    },
    inputContainerStyle: {
      borderBottomWidth: roundedBorderBottomWidth,
    },
    inputStyle: {
      color: Color.darkPrimaryText,
      fontSize: roundedFontSize,
    },
  },
  underline: {
    containerStyle: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    inputContainerStyle: {
      borderBottomWidth: underlineBorderBottomWidth,
    },
    inputStyle: {
      color: Color.darkPrimaryText,
      fontSize: underlineFontSize,
    },
  },
};

export const lightInput = {
  sharp: {
    containerStyle: {
      backgroundColor: Color.lightSecondaryBackground,
    },
    inputContainerStyle: {
      borderBottomWidth: sharpBorderBottomWidth,
    },
    inputStyle: {
      color: Color.lightPrimaryText,
      fontSize: sharpFontSize,
    },
  },
  rounded: {
    containerStyle: {
      backgroundColor: Color.lightSecondaryBackground,
      borderRadius: AppView.roundedBorderRadius,
    },
    inputContainerStyle: {
      borderBottomWidth: roundedBorderBottomWidth,
    },
    inputStyle: {
      color: Color.lightPrimaryText,
      fontSize: roundedFontSize,
    },
  },
  underline: {
    containerStyle: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    inputContainerStyle: {
      borderBottomWidth: underlineBorderBottomWidth,
    },
    inputStyle: {
      color: Color.lightPrimaryText,
      fontSize: underlineFontSize,
    },
  },
};
