import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar as EAvatar,
  AvatarProps as EAvatarProps,
  IconProps,
  ImageProps,
} from 'react-native-elements';

export interface AvatarProps extends Omit<EAvatarProps, 'accessory'>{
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  backgroundColor?: string;
  accessory?: boolean | Partial<IconProps> & Partial<ImageProps>;
}

class Avatar extends React.PureComponent<AvatarProps> {
  render() {
    const {
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal,
      marginVertical,
      backgroundColor,
      overlayContainerStyle: overlayContainerStyleProp,
      containerStyle: containerStyleProp,
      accessory,
      ...otherProps
    } = this.props;

    const overlayContainerStyle = StyleSheet.flatten([
      { backgroundColor },
      overlayContainerStyleProp,
    ]);

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
    const Accessory: any = accessory;
    return (
      <EAvatar
        {...otherProps}
        overlayContainerStyle={overlayContainerStyle}
        containerStyle={containerStyle}
      >
        {Accessory ? <EAvatar.Accessory {...Accessory} /> : null}
      </EAvatar>
    );
  }
}

export default Avatar;
