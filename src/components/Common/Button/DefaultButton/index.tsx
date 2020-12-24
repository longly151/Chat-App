/* eslint-disable max-len */
import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button as ElementButton,
  ButtonProps as EButtonProps,
  withTheme,
  ThemeProps,
} from 'react-native-elements';
import _ from 'lodash';
import Color from '@themes/Color';
import AppView from '@utils/appView';
import { Translation } from 'react-i18next';
import Font from '@themes/Font';

export interface ButtonProps extends Omit<EButtonProps, 'raised' | 'type'> {
  width?: number | string;
  height?: number | string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  titlePaddingVertical?: number;
  titlePaddingHorizontal?: number;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
  title?: string;
  titleCenter?: boolean;
  titleColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  borderColor?: string;
  activeBorderColor?: string;
  borderWidth?: number;
  center?: boolean;
  bold?: boolean;
  fontSize?: number;
  active?: boolean;
  activeBackgroundColor?: string;
  activeTitleColor?: string;
  outline?: boolean;
  clear?: boolean;
  sharp?: boolean;
  rounded?: boolean;
  circle?: boolean;
  shadow?: boolean;
  color?: string;
  reverseColor?: boolean;
  t?: string | Array<any>;
  theme?: any;
}

class Button extends React.PureComponent<ButtonProps> {
  static defaultProps = {
    margin: 0,
    active: false,
    rounded: true,
    titleCenter: true,
  };

  render() {
    const {
      width: widthProp,
      height: heightProp,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal: marginHorizontalProp,
      marginVertical: marginVerticalProp,
      titlePaddingVertical: titlePaddingVerticalProp,
      titlePaddingHorizontal: titlePaddingHorizontalProp,
      borderRadius: borderRadiusProp,
      primary,
      secondary,
      success,
      error,
      warning,
      borderColor: borderColorProp,
      activeBorderColor: activeBorderColorProp,
      borderWidth,
      center,
      bold,
      fontSize,
      active,
      icon: iconProp,
      iconRight,
      backgroundColor: backgroundColorProp,
      title,
      titleCenter,
      titleColor: titleColorProp,
      activeBackgroundColor: activeBackgroundColorProp,
      activeTitleColor: activeTitleColorProp,
      containerStyle: containerStyleProp,
      buttonStyle: buttonStyleProp,
      titleStyle: titleStyleProp,
      iconContainerStyle: iconContainerStyleProp,
      outline,
      clear,
      sharp: sharpProp,
      rounded: roundedProp,
      circle: circleProp,
      shadow,
      color,
      reverseColor,
      t,
      theme,
      ...otherProps
    } = this.props;

    const { colors } = theme;

    /**
     * containerStyle
     */
    const marginVertical = marginVerticalProp || theme.Button.marginVertical;
    const marginHorizontal = marginHorizontalProp || theme.Button.marginHorizontal;
    let width = widthProp;
    let height = heightProp || theme.Button.height;

    let borderRadius: any = 0;
    let sharp = sharpProp;
    let rounded = roundedProp;
    let circle = circleProp;
    if (borderRadiusProp) {
      borderRadius = borderRadiusProp;
    } else {
      if (circle) {
        rounded = false;
        sharp = false;
        const minDimension = _.min([width, height]) || theme.Button.height || 50;
        width = minDimension;
        height = minDimension;
        borderRadius = minDimension;
      }
      if (rounded) {
        borderRadius = theme.Button.roundedBorderRadius;
      }
      if (sharp) {
        rounded = false;
        circle = false;
        borderRadius = 0;
      }
    }

    const containerStyle: any = StyleSheet.flatten([
      {
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginVertical,
        borderRadius,
      },
      shadow && { paddingBottom: 3 },
      center && { alignSelf: 'center' },
      containerStyleProp,
    ]);

    /**
     * buttonStyle
     */
    const titlePaddingHorizontal = titlePaddingHorizontalProp || theme.Button.titlePaddingHorizontal;
    const titlePaddingVertical = titlePaddingVerticalProp || theme.Button.titlePaddingVertical;

    const activeBackgroundColor = activeBackgroundColorProp
    || color
    || theme.Button.activeBackgroundColor;
    let backgroundColor = backgroundColorProp || color || theme.Button.backgroundColor;

    if (primary) backgroundColor = colors.primary;
    if (secondary) backgroundColor = colors.secondary;
    if (success) backgroundColor = colors.success;
    if (warning) backgroundColor = colors.warning;
    if (error) backgroundColor = colors.error;

    const activeBorderColor = activeBorderColorProp || color || theme.Button.activeBorderColor;
    let borderColor = borderColorProp || color || theme.Button.borderColor;
    if (primary) borderColor = colors.primary;
    if (secondary) borderColor = colors.secondary;
    if (success) borderColor = colors.success;
    if (warning) borderColor = colors.warning;
    if (error) borderColor = colors.error;

    let buttonStyle: any = StyleSheet.flatten([
      {
        width,
        height,
        borderRadius,
        borderWidth: borderWidth || theme.Button.borderWidth,
        borderColor: active ? activeBorderColor : borderColor,
        backgroundColor: active ? activeBackgroundColor : backgroundColor,
      },
      !_.isUndefined(titlePaddingHorizontal) && { paddingHorizontal: titlePaddingHorizontal },
      !_.isUndefined(titlePaddingVertical) && { paddingVertical: titlePaddingVertical },
      shadow && AppView.shadow,
      buttonStyleProp,
      !titleCenter && { justifyContent: 'flex-start' },
    ]);
    /**
     * titleStyle
     */

    const activeTitleColor = activeTitleColorProp
    || (color ? Color.white : theme.Button.activeTitle);
    const titleColor = titleColorProp || (color ? Color.white : theme.Button.titleColor);

    let titleStyle: any = StyleSheet.flatten([
      {
        fontFamily: Font.fontFamily.Roboto,
        fontWeight: (active || bold) ? 'bold' : 'normal',
        fontSize: fontSize || theme.Button.titleFontSize,
        color: active ? activeTitleColor : titleColor,
        marginRight: (iconProp && !iconRight && !circle) ? 10 : 0,
        marginLeft: (iconProp && iconRight && !circle) ? 10 : 0,
      },
      titleStyleProp,
    ]);

    /**
     * icon, iconContainerStyle
     */
    const iconContainerStyle: any = StyleSheet.flatten([
      (iconProp && !iconRight && title) && { marginRight: 5 },
      iconContainerStyleProp,
    ]);
    const defaultIcon = {
      size: 20,
      color: active ? activeTitleColor : titleColor,
      type: 'material-community',
    };
    const icon = iconProp ? _.merge(defaultIcon, iconProp) : undefined;
    /**
     * type
     */
    if (clear) {
      buttonStyle = StyleSheet.flatten([
        buttonStyle,
        {
          backgroundColor: 'transparent',
          borderWidth: 0,
        },
      ]);

      const activeOutlineTitleColor = activeTitleColorProp
      || color
      || theme.Button.activeOutlineTitleColor;
      let outlineTitleColor = titleColorProp || color || theme.Button.outlineTitleColor;
      if (primary) outlineTitleColor = colors.primary;
      if (secondary) outlineTitleColor = colors.secondary;
      if (success) outlineTitleColor = colors.success;
      if (warning) outlineTitleColor = colors.warning;
      if (error) outlineTitleColor = colors.error;

      titleStyle = StyleSheet.flatten([
        titleStyle,
        {
          color: active ? activeOutlineTitleColor : outlineTitleColor,
        },
      ]);
    } else if (outline) {
      const activeOutlineBorderColor = activeBorderColorProp
      || color
      || theme.Button.activeOutlineBorderColor;
      let outlineBorderColor = borderColorProp || color || theme.Button.outlineBorderColor;
      if (primary) outlineBorderColor = colors.primary;
      if (secondary) outlineBorderColor = colors.secondary;
      if (success) outlineBorderColor = colors.success;
      if (warning) outlineBorderColor = colors.warning;
      if (error) outlineBorderColor = colors.error;

      const activeOutlineTitleColor = activeTitleColorProp
      || color
      || theme.Button.activeOutlineTitleColor;
      let outlineTitleColor = titleColorProp || color || theme.Button.outlineTitleColor;
      if (primary) outlineTitleColor = colors.primary;
      if (secondary) outlineTitleColor = colors.secondary;
      if (success) outlineTitleColor = colors.success;
      if (warning) outlineTitleColor = colors.warning;
      if (error) outlineTitleColor = colors.error;

      buttonStyle = StyleSheet.flatten([
        buttonStyle,
        {
          backgroundColor: active ? activeBackgroundColor : 'transparent',
          borderWidth: borderWidth || theme.Button.outlineBorderWidth,
          borderColor: active ? activeOutlineBorderColor : outlineBorderColor,
        },
      ]);

      titleStyle = StyleSheet.flatten([
        titleStyle,
        {
          color: active ? activeOutlineTitleColor : outlineTitleColor,
        },
      ]);
    }

    /**
     * reverseColor
     */
    if (reverseColor) {
      const reverseBackgroundColor = titleStyle.color;
      const reverseTitleColor = buttonStyle.backgroundColor;
      buttonStyle.backgroundColor = reverseBackgroundColor;
      titleStyle.color = reverseTitleColor;
    }

    if (!title && t) {
      return (
        <Translation>
          {(trans) => (
            <ElementButton
              {...otherProps}
              icon={icon}
              iconRight={iconRight}
              containerStyle={containerStyle}
              buttonStyle={buttonStyle}
              title={typeof t === 'string' ? trans(t) : trans(t[0], t[1])}
              titleStyle={titleStyle}
              iconContainerStyle={iconContainerStyle}
            />
          )}
        </Translation>
      );
    }

    return (
      <ElementButton
        {...otherProps}
        icon={icon}
        iconRight={iconRight}
        containerStyle={containerStyle}
        buttonStyle={buttonStyle}
        title={title}
        titleStyle={titleStyle}
        iconContainerStyle={iconContainerStyle}
      />
    );
  }
}

export default withTheme(Button as React.ComponentType<ButtonProps & ThemeProps<any>>);
