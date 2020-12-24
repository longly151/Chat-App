import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Icon as EIcon,
  IconProps as EIconProps,
  withTheme,
  ThemeProps,
} from 'react-native-elements';

export interface IconProps extends EIconProps {
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
  color?: string;
  type?: 'material' | 'material-community' | 'simple-line-icon' | 'zocial' | 'octicon' | 'font-awesome' | 'ionicon' | 'foundation' | 'evilicon' | 'entypo' | 'antdesign' | 'font-awesome-5' ;
  theme?: any;
}

class Icon extends React.PureComponent<IconProps> {
  render() {
    const {
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal,
      marginVertical,
      primary,
      secondary,
      success,
      error,
      warning,
      color,
      backgroundColor,
      containerStyle: containerStyleProp,
      theme,
      ...otherProps
    } = this.props;

    const containerStyle = StyleSheet.flatten([
      {
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginVertical,
      },
      containerStyleProp,
    ]);

    const { colors } = theme;
    // eslint-disable-next-line max-len
    let iconColor = theme.colors.primaryText;
    if (primary) iconColor = colors.primary;
    if (secondary) iconColor = colors.secondary;
    if (success) iconColor = colors.success;
    if (warning) iconColor = colors.warning;
    if (error) iconColor = colors.error;
    if (color) iconColor = color;
    return (
      <EIcon
        {...otherProps}
        color={iconColor}
        containerStyle={containerStyle}
      />
    );
  }
}

export default withTheme(Icon as React.ComponentType<IconProps & ThemeProps<any>>);
