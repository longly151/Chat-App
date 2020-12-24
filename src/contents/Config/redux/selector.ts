import Selector from '@utils/selector';

export const root = (state: any) => state.config;

export const themeSelector = Selector.getSelector(root, 'theme');

export const languageSelector = Selector.getSelector(root, 'language');

export const requireLoginSelector = Selector.getSelector(root, 'requireLogin');
