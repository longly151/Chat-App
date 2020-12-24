/* eslint-disable react/no-unescaped-entities */
import React, { PureComponent } from 'react';
import {
  QuickView, Text, Container, Header, Body, Carousel,
} from '@components';
import { AdditionalParallaxProps, ParallaxImage } from 'react-native-snap-carousel';
import { TouchableOpacity, Platform, StyleSheet } from 'react-native';
import AppView from '@utils/appView';
import { withTheme } from 'react-native-elements';
import { ThemeEnum } from '@contents/Config/redux/slice';
import Color from '@themes/Color';
import data from './mock/data';

class CarouselExample extends PureComponent<any> {
  renderItemWithParallax = (
    { item }: any,
    parallaxProps?: AdditionalParallaxProps | undefined
  ) => {
    const { title, subtitle, illustration } = item;
    const { theme } = this.props;
    const backgroundColor = theme.key === ThemeEnum.DARK ? Color.grey5 : Color.grey0;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: AppView.itemWidth,
          height: AppView.itemHeight,
          paddingHorizontal: AppView.itemHorizontalMargin,
          paddingBottom: 18 // needed for shadow
        }}
        onPress={() => {}}
      >
        <QuickView style={{
          flex: 1,
          marginBottom: Platform.OS === 'ios' ? 0 : -1, // Prevent a random Android rendering issue
          backgroundColor,
          borderTopLeftRadius: AppView.carouselBorderRadius,
          borderTopRightRadius: AppView.carouselBorderRadius
        }}
        >
          <ParallaxImage
            source={{ uri: illustration }}
            spinnerColor={theme.colors.loading}
            containerStyle={{
              flex: 1,
              marginBottom: Platform.OS === 'ios' ? 0 : -1, // Prevent a random Android rendering issue
              backgroundColor,
              borderTopLeftRadius: AppView.carouselBorderRadius,
              borderTopRightRadius: AppView.carouselBorderRadius
            }}
            style={{
              ...StyleSheet.absoluteFillObject,
              resizeMode: 'cover',
              borderRadius: Platform.OS === 'ios' ? 8 : 0,
              borderTopLeftRadius: AppView.carouselBorderRadius,
              borderTopRightRadius: AppView.carouselBorderRadius,
              width: 100,
              height: 100,
            }}
            parallaxFactor={0.35}
            showSpinner
            {...parallaxProps}
          />
          <QuickView style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundColor
          }}
          />
        </QuickView>
        <QuickView style={{
          justifyContent: 'center',
          paddingTop: 20 - 8,
          paddingBottom: 20,
          paddingHorizontal: 16,
          backgroundColor,
          borderBottomLeftRadius: AppView.carouselBorderRadius,
          borderBottomRightRadius: AppView.carouselBorderRadius,
          height: 80,
        }}
        >
          <Text bold numberOfLines={2}>{title.toUpperCase()}</Text>
          <Text italic numberOfLines={2}>{subtitle}</Text>
        </QuickView>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Container>
        <Header backIcon title="Carousel" shadow switchTheme />
        <Body fullView scrollable>
          <QuickView>
            <Text type="header" bold marginHorizontal={AppView.bodyPaddingHorizontal} marginTop={15}>Default Carousel</Text>
            <Carousel data={data} renderItem={this.renderItemWithParallax} />
          </QuickView>
          <QuickView>
            <Text type="header" bold marginHorizontal={AppView.bodyPaddingHorizontal} marginTop={15}>Momentum Carousel</Text>
            <Carousel
              data={data}
              renderItem={this.renderItemWithParallax}
              enableMomentum
              activeSlideAlignment="center"
              activeAnimationType="spring"
              activeAnimationOptions={{
                friction: 4,
                tension: 40,
                toValue: 1,
                useNativeDriver: true
              }}
            />
          </QuickView>
          <QuickView>
            <Text type="header" bold marginHorizontal={AppView.bodyPaddingHorizontal} marginTop={15}>"Stack of cards" layout Carousel</Text>
            <Carousel
              data={data}
              renderItem={this.renderItemWithParallax}
              layout="stack"
              showPagination={false}
            />
          </QuickView>
          <QuickView>
            <Text type="header" bold marginHorizontal={AppView.bodyPaddingHorizontal} marginTop={15}>"Tinder" layout Carousel</Text>
            <Carousel
              data={data}
              renderItem={this.renderItemWithParallax}
              layout="tinder"
              showPagination={false}
            />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default withTheme(CarouselExample as any);
