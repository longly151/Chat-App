/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit';
import { LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { Appearance } from 'react-native';

/**
 * --- CONSTANT ---
 */

/**
 * Enum
 */
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum LanguageEnum {
  EN = 'en',
  VI = 'vi',
}

/**
 * Initial State
 */
function getInitialLanguage() {
  let RNLocalize = null;
  try {
    RNLocalize = require('react-native-localize');
    return RNLocalize.getLocales()[0]?.languageCode === LanguageEnum.VI ? LanguageEnum.VI : LanguageEnum.EN;
  } catch (error) {
    return LanguageEnum.EN;
  }
}

export const INITIAL_STATE = ({
  theme: Appearance.getColorScheme() === ThemeEnum.DARK ? ThemeEnum.DARK : ThemeEnum.LIGHT,
  language: getInitialLanguage(),
  requireLogin: false,
});

/**
 * --- SLICE ---
 */
const theme = createSlice({
  name: 'config',
  initialState: INITIAL_STATE,
  reducers: {
    switchTheme(state) {
      state.theme = state.theme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    },
    changeLanguage(state, action) {
      const language = action.payload;
      state.language = language;
      LocaleConfig.defaultLocale = language;
      moment.locale(language);
    },
    resetRequireLogin(state) {
      state.requireLogin = INITIAL_STATE.requireLogin;
    },
  },
});

export const { switchTheme, changeLanguage, resetRequireLogin } = theme.actions;

export default theme.reducer;
