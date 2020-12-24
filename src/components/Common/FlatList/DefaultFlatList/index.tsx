import React, { PureComponent } from 'react';
import { TQuery, TArrayRedux } from '@utils/redux';
import {
  FlatList as RNFlatList,
  FlatListProps as RNFlatListProps,
  RefreshControl,
  Animated,
  Easing, NativeSyntheticEvent, NativeScrollEvent, GestureResponderEvent
} from 'react-native';
import { Icon, withTheme, ThemeProps } from 'react-native-elements';
import _ from 'lodash';
import LottieView from 'lottie-react-native';
import { AnimatedLottieLoading } from '@assets/animations';
import AppView from '@utils/appView';
import Loading, { AnimatedLottieViewProps } from '../../Loading';
import QuickView from '../../View/QuickView';
import Text from '../../Text';

export interface FlatListProps
  extends Omit<RNFlatListProps<any>, 'data' | 'renderItem'> {
  data?: any;
  list?: TArrayRedux;
  getList?: (query?: TQuery) => any;
  renderItem: ({ item, index }: { item: any; index: number }) => any;
  renderEmpty?: () => any;
  loadingColor?: string;
  textColor?: string;
  loadMore?: boolean;
  animatedLottieLoading?: keyof typeof AnimatedLottieLoading;
  animatedLottieLoadingProps?: AnimatedLottieViewProps;
  animatedLottieRefresh?: keyof typeof AnimatedLottieLoading;
  animatedLottieRefreshProps?: AnimatedLottieViewProps;
  theme?: any;
  ref?: any;
}
interface State {
  refreshing: boolean;
  page: number;
  // Animated Refresh
  release: boolean;
  extraPaddingTop: any;
  offsetY: number;
}

const refreshingHeight = 100;

class FlatList extends PureComponent<FlatListProps, State> {
  static defaultProps = {
    showsVerticalScrollIndicator: false,
    onEndReachedThreshold: 0.5,
    loadMore: true,
  };

  private flatListRef: any;

  private lottieViewRef: any;

  constructor(props: FlatListProps) {
    super(props);
    const { list, getList } = this.props;
    if (list && getList) {
      this.state = {
        refreshing: false,
        release: true,
        page: 1,
        extraPaddingTop: new Animated.Value(0),
        offsetY: 0,
      };
    }
  }

  componentDidMount() {
    const { list, getList } = this.props;
    if (list && getList) {
      getList();
    }
  }

  componentDidUpdate() {
    // Animated Refresh
    const { animatedLottieRefresh, list } = this.props;
    if (animatedLottieRefresh) {
      const { release, refreshing, extraPaddingTop } = this.state;
      if (refreshing) {
        Animated.timing(extraPaddingTop, {
          toValue: refreshingHeight,
          duration: 0,
          useNativeDriver: false
        }).start();
        if (this.lottieViewRef) this.lottieViewRef.play();
      } else {
        Animated.timing(extraPaddingTop, {
          toValue: 0,
          duration: 400,
          easing: Easing.elastic(1.3),
          useNativeDriver: false
        }).start();
        if (this.lottieViewRef) this.lottieViewRef.pause();
      }

      if (list && !list.loading && release) {
        setTimeout(() => {
          this.setState({ refreshing: false, offsetY: 0 });
        }, 500);
      }
    } else if (list && !list.loading) {
      setTimeout(() => {
        this.setState({ refreshing: false, offsetY: 0 });
      }, 500);
    }
  }

  handleRefresh = () => {
    const { list, getList } = this.props;
    if (list && getList) {
      this.setState({ page: 1, refreshing: true, offsetY: 1 }, () => {
        getList();
      });
    }
  };

  handleLoadMore = () => {
    const { list, getList, loadMore } = this.props;
    if (loadMore && list && getList) {
      const { page: currentPage, pageCount } = list.metadata;
      if (currentPage !== pageCount && !list.loading) {
        this.setState(
          (prevState) => ({
            page: prevState.page + 1,
          }),
          () => {
            const { page } = this.state;
            if (currentPage < pageCount) {
              getList({ page });
            }
          },
        );
      }
    }
  };

  rollToTop = () => {
    if (this.flatListRef) {
      this.flatListRef.scrollToIndex({
        animated: true,
        index: 0,
      });
    }
  };

  renderFooter = () => {
    const {
      list,
      loadingColor: loadingColorProp,
      getList,
      animatedLottieLoading,
      animatedLottieLoadingProps,
      theme
    } = this.props;
    if (list && getList) {
      const { refreshing } = this.state;
      /**
       * Theme Handle
       */
      const loadingColor = loadingColorProp || theme.colors.secondaryText;

      if (list.metadata.page === list.metadata.pageCount && !_.isEmpty(list.data)) {
        return (
          <QuickView marginBottom={10}>
            <Icon
              name="up"
              type="antdesign"
              size={30}
              color={loadingColor}
              onPress={this.rollToTop}
            />
          </QuickView>
        );
      }
      if (!list.loading || refreshing) return null;
      if (animatedLottieLoading) {
        if (_.isEmpty(list.data)) {
          return (
            <QuickView marginVertical={5}>
              <Loading
                style={{ width: AppView.screenWidth }}
                {...animatedLottieLoadingProps}
                animatedLottieLoading={animatedLottieLoading}
              />
              <Loading
                style={{ width: AppView.screenWidth }}
                {...animatedLottieLoadingProps}
                animatedLottieLoading={animatedLottieLoading}
              />
            </QuickView>
          );
        }
      }
      return (
        <QuickView marginVertical={5}>
          <Loading animating color={loadingColor} size="small" />
        </QuickView>
      );
    }
    return null;
  };

  renderEmpty = () => {
    const {
      horizontal,
      list,
      textColor: textColorProp,
      getList,
      theme,
    } = this.props;
    if (list && getList) {
      /**
       * Language & Theme Handle
       */
      const textColor = textColorProp || theme.colors.secondaryText;

      if (!horizontal && !list.loading) {
        return (
          <QuickView center>
            <QuickView marginVertical={10}>
              <Icon
                name="exclamationcircleo"
                color={textColor}
                type="antdesign"
                size={30}
              />
            </QuickView>
            <Text color={textColor} t="component:flat_list:empty">{list.error?.messages}</Text>
          </QuickView>
        );
      }
      return null;
    }
    return null;
  };

  customOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Animated Refresh
    const { animatedLottieRefresh, onScroll } = this.props;
    if (animatedLottieRefresh) {
      const { release } = this.state;
      const { nativeEvent } = event;
      const { contentOffset } = nativeEvent;
      const { y } = contentOffset;
      if (!release) {
        if (y / -refreshingHeight > 1) {
          this.setState({ offsetY: -refreshingHeight });
          if (this.lottieViewRef) this.lottieViewRef.play();
        } else {
          this.setState({ offsetY: y });
        }
      }
    }

    if (onScroll) onScroll(event);
  };

  onRelease = (event: GestureResponderEvent) => {
    // Animated Refresh
    const { offsetY, refreshing } = this.state;
    if (offsetY <= -refreshingHeight && !refreshing) {
      this.setState({ refreshing: true, release: true });
      this.handleRefresh();
    }
    const { onResponderRelease } = this.props;
    if (onResponderRelease) onResponderRelease(event);
  };

  renderLottieRefresh = () => {
    const { animatedLottieRefresh, animatedLottieRefreshProps } = this.props;
    if (animatedLottieRefresh) {
      const { offsetY } = this.state;
      if (offsetY !== 0) {
        return (
          <LottieView
            ref={(ref: any) => { this.lottieViewRef = ref; }}
            style={{ height: refreshingHeight, width: 50, position: 'absolute', top: 0, alignSelf: 'center' }}
            {...animatedLottieRefreshProps}
            source={AnimatedLottieLoading[animatedLottieRefresh]}
            progress={offsetY / -refreshingHeight}
          />
        );
      }
    }
    return null;
  };

  renderListHeaderComponent = () => {
    const { ListHeaderComponent, animatedLottieRefresh } = this.props;
    if (animatedLottieRefresh) {
      const { extraPaddingTop } = this.state;
      return (
        <Animated.View style={{
          marginTop: extraPaddingTop,
        }}
        >
          {ListHeaderComponent}
        </Animated.View>
      );
    }
    return ListHeaderComponent;
  };

  render() {
    const {
      data,
      list,
      getList,
      renderItem,
      renderEmpty,
      loadingColor: loadingColorProp,
      animatedLottieRefresh,
      theme,
      ...otherProps
    } = this.props;

    // Animation & Refresh
    if (list && getList) {
      const { refreshing } = this.state;

      /**
       * Theme Handle
       */
      const loadingColor = loadingColorProp || theme.colors.secondaryText;

      return (
        <>
          {this.renderLottieRefresh()}
          <RNFlatList
            ref={(ref) => {
              this.flatListRef = ref;
            }}
            keyExtractor={(item) => `${item.id}`}
            onEndReached={this.handleLoadMore}
            ListFooterComponent={this.renderFooter}
            refreshControl={!animatedLottieRefresh ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.handleRefresh}
                tintColor={loadingColor}
              />
            ) : undefined}
            onResponderRelease={this.onRelease}
            extraData={refreshing || list.loading}
            {...otherProps}
            ListHeaderComponent={this.renderListHeaderComponent()}
            onResponderMove={() => {
              // Animated Refresh
              const { animatedLottieRefresh } = this.props;
              if (animatedLottieRefresh) {
                const { release } = this.state;
                if (release) this.setState({ release: false });
              }
            }}
            onScroll={this.customOnScroll}
            ListEmptyComponent={renderEmpty || this.renderEmpty}
            data={list.data}
            renderItem={renderItem}
          />
        </>
      );
    }

    return (
      <>
        <RNFlatList
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          {...otherProps}
          ListEmptyComponent={renderEmpty || this.renderEmpty}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id || index}`}
          data={data}
        />
      </>
    );
  }
}

export default withTheme(
  FlatList as any as React.ComponentType<FlatListProps & ThemeProps<any>>
);
