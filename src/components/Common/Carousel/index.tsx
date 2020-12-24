import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, Dimensions } from 'react-native';
import BaseCarousel, { CarouselProps as BaseCarouselProps, Pagination, PaginationProperties } from 'react-native-snap-carousel';
import AppView from '@utils/appView';
import _ from 'lodash';
import Color from '@themes/Color';
import { withTheme, ThemeProps } from 'react-native-elements';
import { ThemeEnum } from '@contents/Config/redux/slice';

export interface CarouselProps extends Omit <BaseCarouselProps<any>, 'containerCustomStyle'>{
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  itemHorizontalMargin?: number;
  slideWidth?: number;
  itemWidth?: number;
  containerStyle?: StyleProp<ViewStyle>;
  paginationProps?: PaginationProperties;
  showPagination?: boolean;
  theme?: any;
}
interface State {
  activeIndex: number;
  isHorizontal: boolean;
}

class Carousel extends React.PureComponent<CarouselProps, State> {
  static defaultProps = {
    itemHorizontalMargin: 10,
    sliderWidth: AppView.sliderWidth,
    hasParallaxImages: true,
    inactiveSlideScale: 0.94,
    inactiveSlideOpacity: 0.7,
    loop: true,
    loopClonesPerSide: 2,
    autoplay: true,
    autoplayDelay: 500,
    autoplayInterval: 5000,
    showPagination: true,
  };

  sliderRef: any;

  constructor(props: CarouselProps) {
    super(props);
    this.state = {
      activeIndex: 0,
      isHorizontal: AppView.isHorizontal
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change', ({ window }: any) => this.setState({ isHorizontal: window.width > window.height }));
  }

  customOnSnapToItem = (index: number) => {
    this.setState({ activeIndex: index });
    const { onSnapToItem } = this.props;
    if (onSnapToItem) onSnapToItem(index);
  };

  renderPagination = () => {
    const {
      data,
      paginationProps: paginationPropsProp,
      showPagination,
      theme,
    } = this.props;
    const { activeIndex } = this.state;
    if (!showPagination) return null;

    const defaultPaginationProps: Omit <PaginationProperties, 'tappableDots' | 'dotsLength' | 'activeDotIndex'> = {
      dotColor: theme.key === 'dark' ? Color.white : Color.grey3,
      dotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
      },
      containerStyle: {
        paddingVertical: 8
      },
      inactiveDotColor: theme.key === ThemeEnum.DARK ? Color.white : Color.grey3,
      inactiveDotOpacity: 0.4,
      inactiveDotScale: 0.6
    };
    const paginationProps: any = _.merge(defaultPaginationProps, paginationPropsProp);
    return (
      <Pagination
        carouselRef={this.sliderRef}
        {...paginationProps}
        tappableDots={!!this.sliderRef}
        dotsLength={data.length}
        activeDotIndex={activeIndex}
      />
    );
  };

  render() {
    const {
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal,
      marginVertical,
      containerStyle: containerStyleProp,
      data,
      renderItem: renderItemProp,
      contentContainerCustomStyle: contentContainerCustomStyleProp,
      paginationProps: paginationPropsProp,
      layout,
      theme,
      ...otherProps
    } = this.props;

    const { isHorizontal } = this.state;

    /**
     * Style
     */
    const containerStyle: any = StyleSheet.flatten([
      {
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginVertical,
      },
      {
        overflow: 'visible', // for custom animations
      },
      containerStyleProp
    ]);

    const contentContainerCustomStyle = StyleSheet.flatten([
      {
        paddingVertical: 10 // for custom animation
      },
      contentContainerCustomStyleProp
    ]);

    const renderItem: any = renderItemProp;
    const itemWidth = (layout && AppView.itemWidth < 0.5 * AppView.screenWidth)
      ? 0.5 * AppView.screenWidth : AppView.itemWidth;
    return (
      <>
        <BaseCarousel
          ref={(c) => { this.sliderRef = c; }}
          {...otherProps}
          data={data}
          renderItem={renderItem}
          itemWidth={itemWidth}
          sliderWidth={AppView.sliderWidth}
          layout={layout}
        // inactiveSlideShift={20}
          containerCustomStyle={containerStyle}
          contentContainerCustomStyle={contentContainerCustomStyle}
          onSnapToItem={this.customOnSnapToItem}
          extraData={isHorizontal}
        />
        {this.renderPagination()}
      </>
    );
  }
}

export default (withTheme(
  Carousel as unknown as React.ComponentType<CarouselProps & ThemeProps<any>>
));
