/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
  VideoProperties,
} from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import { PlayerControls, ProgressBar } from './components';
import { FullscreenClose, FullscreenOpen } from './assets/icons';

interface State {
  fullscreen: boolean;
  play: boolean;
  currentTime: number;
  duration: number;
  showControls: boolean;
}

export const AndroidVideoPlayer: React.FC<VideoProperties> = (props: VideoProperties) => {
  const videoRef = React.createRef<Video>();
  const { paused } = props
  const [state, setState] = useState<State>({
    fullscreen: false,
    play: !paused,
    currentTime: 0,
    duration: 0,
    showControls: true,
  });

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);

    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);
  const { style, ...otherProps } = props;
  return (
      <TouchableWithoutFeedback onPress={showControls}>
        <View>
          <Video
            ref={videoRef}
            resizeMode="contain"
            {...otherProps}
            style={state.fullscreen ? styles.fullscreenVideo : style}
            controls={false}
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={onEnd}
            paused={!state.play}
          />
          {state.showControls && (
            <View style={styles.controlOverlay}>
              <TouchableOpacity
                onPress={handleFullscreen}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.fullscreenButton}
              >
                {state.fullscreen ? <FullscreenClose /> : <FullscreenOpen />}
              </TouchableOpacity>
              <PlayerControls
                onPlay={handlePlayPause}
                onPause={handlePlayPause}
                playing={state.play}
                showPreviousAndNext={false}
                showSkip
                skipBackwards={skipBackward}
                skipForwards={skipForward}
              />
              <ProgressBar
                currentTime={state.currentTime}
                duration={state.duration > 0 ? state.duration : 0}
                onSlideStart={handlePlayPause}
                onSlideComplete={handlePlayPause}
                onSlideCapture={onSeek}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
  );

  function handleOrientation(orientation: string) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (setState((s) => ({ ...s, fullscreen: true })), StatusBar.setHidden(true))
      : (setState((s) => ({ ...s, fullscreen: false })),
      StatusBar.setHidden(false));
  }

  function handleFullscreen() {
    state.fullscreen
      ? Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft();
  }

  function handlePlayPause() {
    // If playing, pause and show controls immediately.
    if (state.play) {
      setState({ ...state, play: false, showControls: true });
      return;
    }

    setState({ ...state, play: true });
    setTimeout(() => setState((s) => ({ ...s, showControls: false })), 2000);
  }

  function skipBackward() {
    videoRef.current?.seek(state.currentTime - 15);
    setState({ ...state, currentTime: state.currentTime - 15 });
  }

  function skipForward() {
    videoRef.current?.seek(state.currentTime + 15);
    setState({ ...state, currentTime: state.currentTime + 15 });
  }

  function onSeek(data: {seekTime: number}) {
    videoRef.current?.seek(data.seekTime);
    setState({ ...state, currentTime: data.seekTime });
  }

  function onLoadEnd(data: OnLoadData) {
    const { onLoad } = props
    setState((s) => ({
      ...s,
      duration: data.duration,
      currentTime: data.currentTime,
    }));
    if (onLoad) onLoad(data);
  }

  function onProgress(data: OnProgressData) {
    const { onProgress } = props
    setState((s) => ({
      ...s,
      currentTime: data.currentTime,
    }));
    if (onProgress) onProgress(data);
  }

  function onEnd() {
    const { onEnd } = props
    setState({ ...state, play: false });
    videoRef.current?.seek(0);
    if (onEnd) onEnd();
  }

  function showControls() {
    state.showControls
      ? setState({ ...state, showControls: false })
      : setState({ ...state, showControls: true });
  }
};

const styles = StyleSheet.create({
  fullscreenVideo: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
});
