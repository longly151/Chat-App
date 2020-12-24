/**
 * ParallaxScrollView
 */

import Color from '../Color';

export const parallaxHeaderHeight = 300;
export const stickyHeaderHeight = 85;

export const darkParallaxScrollView = {
  parallaxHeaderHeight,
  stickyHeaderHeight,
  imageBackgroundColor: 'rgba(0,0,0,.4)',
  headerBackgroundColor: Color.darkSecondaryBackground,
  contentBackgroundColor: Color.darkPrimaryBackground,
};
export const lightParallaxScrollView = {
  parallaxHeaderHeight,
  stickyHeaderHeight,
  imageBackgroundColor: 'rgba(255, 255, 255, 0.1)',
  headerBackgroundColor: Color.lightSecondaryBackground,
  contentBackgroundColor: Color.lightPrimaryBackground,
};
