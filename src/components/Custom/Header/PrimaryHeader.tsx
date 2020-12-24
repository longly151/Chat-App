import React, { PureComponent } from 'react';
import { ImageBackground } from 'react-native';
import AppView from '@utils/appView';
import Color from '@themes/Color';
import Header, { HeaderProps } from '../../Common/Header';

export interface PrimaryHeaderProps extends HeaderProps{

}
class PrimaryHeader extends PureComponent<PrimaryHeaderProps> {
  render() {
    const { ...otherProps } = this.props;
    return (
      <ImageBackground
        source={require('@assets/images/headerBackground.png')}
        style={{
        }}
        imageStyle={{
          width: AppView.screenWidth + 2,
          marginLeft: -1,
          resizeMode: 'contain',
          marginTop: -30,
          height: AppView.headerHeight + 40,
        }}
      >
        <Header
          {...otherProps}
          backgroundColor="transparent"
          color={Color.white}
        />
      </ImageBackground>
    );
  }
}

export default PrimaryHeader;
