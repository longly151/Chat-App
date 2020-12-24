/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, Platform, PixelRatio } from 'react-native';
import RNVideo, { VideoProperties, LoadError, OnProgressData } from 'react-native-video';
import AppView from '@utils/appView';
import _ from 'lodash';
import YouTube, { YouTubeProps } from 'react-native-youtube';
import Config from 'react-native-config';
import Button from '../Button/DefaultButton';
import { AndroidVideoPlayer } from './AndroidVideoPlayer';
import QuickView from '../View/QuickView';

export interface VideoProps extends Omit<VideoProperties, 'controls' | 'onError' | 'onProgress'>, Omit<YouTubeProps, 'controls' | 'onError' | 'onProgress'>{
  controls?: boolean | 1 | 2 | 3;
  onError?: (error: any) => void;
  onProgress?: (data: any) => void;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  sharp?: boolean;
  rounded?: boolean;
  borderRadius?: number;
  width?: number;
  height?: number;
  loop?: boolean;
  autoPlay?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const defaultWidth = AppView.screenWidth - 2 * AppView.bodyPaddingHorizontal;
class Video extends React.PureComponent<VideoProps> {
  static defaultProps = {
    width: defaultWidth,
    height: PixelRatio.roundToNearestPixel(defaultWidth / (16 / 9)),
    rounded: true,
    controls: true
  };

  player: any;

  onEnd = () => {
    const { loop, onEnd } = this.props;
    if (loop && this.player) this.player.seek(0);
    if (onEnd) onEnd();
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
      width,
      height,
      sharp: sharpProp,
      rounded: roundedProp,
      borderRadius: borderRadiusProp,
      containerStyle: containerStyleProp,
      autoPlay,
      loop,
      controls,
      source,
      ...otherProps
    } = this.props;

    /**
     * containerStyle
     */
    let borderRadius: any = 0;
    const sharp = sharpProp;
    let rounded = roundedProp;
    if (borderRadiusProp) {
      borderRadius = borderRadiusProp;
    } else {
      if (rounded) {
        borderRadius = AppView.roundedBorderRadius;
      }
      if (sharp) {
        rounded = false;
        borderRadius = 0;
      }
    }

    const containerStyle = StyleSheet.flatten([
      {
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginVertical,
        width,
        height,
        borderRadius,
      },
      containerStyleProp,
    ]);

    /**
     * Youtube
     */
    const matchHost = [
      'www.youtube.com',
      'youtube.com',
      'www.youtu.be',
      'youtu.be',
    ];
    if (source && typeof source !== 'number') {
      const host = source.uri?.split('/');
      if (host && _.includes(matchHost, host[2])) {
        let videoId = '';
        if (host[3].startsWith('watch?')) {
          videoId = host[3].split('=')[1];
        } else {
          videoId = host[3];
        }

        return (
          <YouTube
            ref={this.player}
            apiKey={Config.YOUTUBE_KEY}
            origin="http://www.youtube.com"
            videoId={videoId}
            play={autoPlay}
            controls={1}
            style={containerStyle}
          />
        );
      }
    }

    /**
     * Video
     */
    if (Platform.OS === 'android') {
      return (
        <>
          {/* <AndroidVideoPlayer
            resizeMode="cover"
            paused={!autoPlay}
            controls
            {...otherProps}
            onEnd={this.onEnd}
            style={containerStyle}
          /> */}
          <RNVideo
            ref={(ref: any) => {
              this.player = ref;
            }}
            resizeMode="cover"
            paused={!autoPlay}
            controls={!!controls}
            {...otherProps}
            source={source}
            onEnd={this.onEnd}
            style={containerStyle}
          />
        </>
      );
    }
    return (
      <>
        <RNVideo
          ref={(ref: any) => {
            this.player = ref;
          }}
          resizeMode="cover"
          paused={!autoPlay}
          controls={!!controls}
          {...otherProps}
          source={source}
          onEnd={this.onEnd}
          style={containerStyle}
        />
      </>
    );
  }
}

export default Video;
