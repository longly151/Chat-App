import { ThemeEnum } from '@contents/Config/redux/slice';
import { darkListItem, lightListItem } from './ThemeComponent/ListItem';
import { darkCalendar, lightCalendar } from './ThemeComponent/Calendar';
import { darkMap, lightMap } from './ThemeComponent/Map';
import { darkText, lightText } from './ThemeComponent/Text';
import { darkButton, lightButton } from './ThemeComponent/Button';
import { darkHeader, lightHeader } from './ThemeComponent/Header';
import { darkInput, lightInput } from './ThemeComponent/Input';
import { darkCheckBox, lightCheckBox } from './ThemeComponent/ListCheckBox';
import { darkModal, lightModal } from './ThemeComponent/Modal';
import { darkParallaxScrollView, lightParallaxScrollView } from './ThemeComponent/ParallaxScrollView';
import Color from './Color';

/**
 * Theme
 */
export const darkTheme = {
  key: ThemeEnum.DARK,
  colors: {
    primary: Color.darkPrimary,
    secondary: Color.darkSecondary,
    success: Color.darkSuccess,
    warning: Color.darkWarning,
    error: Color.darkError,

    /**
     * Component Color
     */
    primaryBackground: Color.darkPrimaryBackground,
    secondaryBackground: Color.darkSecondaryBackground,
    primaryText: Color.darkPrimaryText,
    secondaryText: Color.darkSecondaryText,
    loading: Color.darkPrimary,
  },

  /**
   * Component
   */
  Text: darkText,
  Button: darkButton,
  Header: darkHeader,
  Input: darkInput,
  CheckBox: darkCheckBox,
  Modal: darkModal,
  ParallaxScrollView: darkParallaxScrollView,
  Map: darkMap,
  Calendar: darkCalendar,
  ListItem: darkListItem,
};

export const lightTheme = {
  key: ThemeEnum.LIGHT,
  colors: {
    primary: Color.lightPrimary,
    secondary: Color.lightSecondary,
    success: Color.lightSuccess,
    warning: Color.lightWarning,
    error: Color.lightError,

    /**
     * Component Color
     */
    primaryBackground: Color.lightPrimaryBackground,
    secondaryBackground: Color.lightSecondaryBackground,
    primaryText: Color.lightPrimaryText,
    secondaryText: Color.lightSecondaryText,
    loading: Color.lightPrimary,
  },

  /**
   * Component
   */
  Text: lightText,
  Button: lightButton,
  Header: lightHeader,
  Input: lightInput,
  CheckBox: lightCheckBox,
  Modal: lightModal,
  ParallaxScrollView: lightParallaxScrollView,
  Map: lightMap,
  Calendar: lightCalendar,
  ListItem: lightListItem,
};
