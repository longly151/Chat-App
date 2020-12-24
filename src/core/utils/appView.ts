/* eslint-disable max-len */
import { Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

class CAppView {
  private static _instance: CAppView;

  private constructor() {
    // ...
  }

  public static get Instance(): CAppView {
    if (!this._instance) {
      this._instance = new this();
    }
    return CAppView._instance;
  }

  shadow = Platform.select({
    android: {
      elevation: 10,
    },
    default: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
    },
  });

  safeAreaInsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  bottomNavigationBarHeight = 55;

  headerHeight = 50;

  headerPaddingHorizontal = 20;

  bodyHeight = height - this.headerHeight - this.bottomNavigationBarHeight - this.safeAreaInsets.top - this.safeAreaInsets.bottom;

  bodyPaddingHorizontal = 20;

  roundedBorderRadius = 8;

  screenWidth = width;

  screenHeight = height;

  isHorizontal = this.screenWidth > this.screenHeight;

  // Carousel
  sliderWidth = this.screenWidth;

  itemHorizontalMargin = 10;

  itemWidth = ((this.isHorizontal ? 0.35 : 0.75) * this.screenWidth) + this.itemHorizontalMargin * 2;

  itemHeight = 300;

  carouselBorderRadius = 8;

  onDimensionChange = (window: any) => {
    this.screenWidth = window.width;
    this.screenHeight = window.height;
    const isHorizontal = window.width > window.height;
    this.isHorizontal = isHorizontal;

    if (isHorizontal) {
      // Carousel
      this.itemWidth = (0.35 * window.width) + this.itemHorizontalMargin * 2;
      this.sliderWidth = window.width;
    } else {
      this.itemWidth = (0.75 * window.width) + this.itemHorizontalMargin * 2;
      this.sliderWidth = window.width;
    }
  };

  initSafeArea = (safeAreaInsets: {top: number, bottom: number, left: number, right: number}) => {
    const dimensions = Dimensions.get('window');
    this.safeAreaInsets = safeAreaInsets;
    this.bodyHeight = dimensions.height - this.headerHeight - this.bottomNavigationBarHeight - safeAreaInsets.top - safeAreaInsets.bottom;
  };
}

const AppView = CAppView.Instance;
export default AppView;
