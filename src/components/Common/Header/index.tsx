import React, { PureComponent } from 'react';
import {
  StyleSheet, Image, Dimensions
} from 'react-native';
import {
  withTheme, ThemeProps,
  Header as EHeader,
  HeaderProps as EHeaderProps,
  Icon,
} from 'react-native-elements';
import { NavigationService } from '@utils/navigation';
import SwitchChangeTheme from '@contents/Config/Shared/SwitchChangeTheme';
import AppView from '@utils/appView';
import i18next from 'i18next';
import { languageSelector } from '@contents/Config/redux/selector';
import { connect } from 'react-redux';
import QuickView from '../View/QuickView';

export interface HeaderProps extends EHeaderProps {
  height?: number;
  width?: number | string;
  position?: 'relative' | 'absolute';
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  backgroundColor?: string;
  borderBottomColor?: string;
  borderBottomWidth?: number;
  transparent?: boolean;
  backIcon?: boolean;
  leftIconBackgroundColor?: string;
  closeIcon?: boolean;
  title?: string;
  t?: string | Array<any>;
  logo?: boolean;
  switchTheme?: boolean;
  shadow?: boolean;
  leftColor?: string;
  centerColor?: string;
  rightColor?: string;
  color?: string;
  theme?: any;
}

const styles = StyleSheet.create({
  defaultTitleStyle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  defaultLogoStyle: {
    width: 84,
    height: 30,
    resizeMode: 'contain',
  },
});
interface State {
  height: number,
  paddingTop: number,
  paddingBottom: number,
}

class Header extends PureComponent<HeaderProps, State> {
  static defaultProps = {
    placement: 'center',
    leftIconBackgroundColor: 'transparent',
    height: AppView.headerHeight,
    width: '100%',
  };

  constructor(props: HeaderProps) {
    super(props);
    const { height } = this.props;
    this.state = {
      height: (height || 0) + (AppView.safeAreaInsets.top ? AppView.safeAreaInsets.top - 10 : 0),
      paddingTop: AppView.safeAreaInsets.top,
      paddingBottom: AppView.safeAreaInsets.top ? 5 : 0,
    };
  }

  async componentDidMount() {
    Dimensions.addEventListener('change', this.modifyHeight);
  }

  modifyHeight = () => {
    const { height } = this.props;
    setTimeout(() => {
      this.setState({
        height: (height || 0) + (AppView.safeAreaInsets.top ? AppView.safeAreaInsets.top - 10 : 0),
        paddingTop: AppView.safeAreaInsets.top,
        paddingBottom: AppView.safeAreaInsets.top ? 10 : 0
      });
    }, 250);
  };

  render() {
    const {
      position,
      width,
      top,
      left,
      right,
      bottom,
      backgroundColor: backgroundColorProp,
      transparent,
      backIcon,
      leftIconBackgroundColor,
      closeIcon,
      title,
      t,
      leftColor: leftColorProp,
      centerColor: centerColorProp,
      rightColor: rightColorProp,
      color: colorProp,
      borderBottomColor,
      borderBottomWidth,
      placement,
      logo,
      containerStyle: containerStyleProp,
      leftContainerStyle: leftContainerStyleProp,
      leftComponent: leftComponentProp,
      centerContainerStyle: centerContainerStyleProp,
      centerComponent: centerComponentProp,
      rightContainerStyle: rightContainerStyleProp,
      rightComponent: rightComponentProp,
      shadow,
      switchTheme,
      theme,
      ...otherProps
    } = this.props;
    const { height, paddingTop, paddingBottom } = this.state;
    const backgroundColor = transparent ? 'transparent' : (backgroundColorProp || theme.Header.backgroundColor);
    let leftColor = leftColorProp || theme.Header.leftColor;
    let centerColor = centerColorProp || theme.Header.centerColor;
    let rightColor = rightColorProp || theme.Header.rightColor;
    if (colorProp) {
      leftColor = colorProp;
      centerColor = colorProp;
      rightColor = colorProp;
    }

    const containerStyle = StyleSheet.flatten([
      {
        position,
        height,
        width,
        top,
        left,
        right,
        bottom,
        borderBottomColor,
        borderBottomWidth,
        backgroundColor,
        paddingTop,
        paddingBottom,
        paddingHorizontal: AppView.headerPaddingHorizontal
      },
      shadow ? AppView.shadow : {},
      containerStyleProp,
    ]);

    /**
     * Left Component
     */
    const leftContainerStyle = StyleSheet.flatten([
      {
        paddingRight: ((backIcon || closeIcon)) ? 10 : 0,
      },
      leftContainerStyleProp,
    ]);
    let leftComponent: any = leftComponentProp;
    if (backIcon) {
      leftComponent = {
        icon: 'arrowleft',
        type: 'antdesign',
        size: 25,
        color: leftColor,
        onPress: () => NavigationService.goBack(),
        style: {
          width: 25, height: 25,
        },
        containerStyle: leftIconBackgroundColor !== 'transparent' ? {
          padding: 8, backgroundColor: leftIconBackgroundColor, borderRadius: 20,
        } : null,
      };
    } else if (closeIcon) {
      leftComponent = {
        icon: 'close',
        type: 'antdesign',
        size: 25,
        color: leftColor,
        onPress: () => NavigationService.goBack(),
        style: {
          width: 25, height: 25,
        },
        containerStyle: leftIconBackgroundColor !== 'transparent' ? {
          padding: 8, backgroundColor: leftIconBackgroundColor, borderRadius: 20,
        } : null,
      };
    }

    /**
     * Center Component
     */
    let centerComponent: any = centerComponentProp;
    if (title || t) {
      let titleText = title;
      if (t) {
        titleText = typeof t === 'string' ? i18next.t(t) : i18next.t(t[0], t[1]);
      }
      centerComponent = {
        text: titleText,
        style: StyleSheet.flatten([
          styles.defaultTitleStyle,
          {
            // eslint-disable-next-line no-nested-ternary
            marginLeft: backIcon || closeIcon ? -10 : (placement === 'left' ? -15 : 0),
            color: centerColor,
          },
          centerContainerStyleProp,
        ]),
      };
    } else if (logo) {
      centerComponent = (
        <QuickView testID="centerComponentLogo" marginLeft={(backIcon && placement === 'center') || (closeIcon && placement === 'center') ? -20 : 0}>
          <Image
            style={styles.defaultLogoStyle}
            source={require('@images/headerLogo.png')}
          />
        </QuickView>
      );
    }

    /**
     * Right Component
     */
    let rightComponent: any = rightComponentProp;
    if (switchTheme) {
      rightComponent = (
        <QuickView testID="rightComponentSwitchTheme" row center>
          <Icon name="theme-light-dark" type="material-community" style={{ marginRight: 5 }} color={rightColor} />
          <SwitchChangeTheme />
        </QuickView>
      );
    }

    return (
      <EHeader
        {...otherProps}
        placement={placement}
        leftComponent={leftComponent}
        centerComponent={centerComponent}
        rightComponent={rightComponent}
        containerStyle={containerStyle}
        leftContainerStyle={leftContainerStyle}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  language: languageSelector(state),
});

export default connect(
  mapStateToProps, null, null, { forwardRef: true }
)(withTheme(Header as any as React.ComponentType<HeaderProps & ThemeProps<any>>));
