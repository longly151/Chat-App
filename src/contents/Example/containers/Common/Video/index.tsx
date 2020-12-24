import React, { PureComponent } from 'react';
import {
  QuickView, Text, Container, Header, Body, Video,
} from '@components';

class VideoExample extends PureComponent {
  render() {
    return (
      <Container>
        <Header backIcon title="VideoExample" switchTheme shadow />
        <Body scrollable>
          <QuickView marginVertical={10}>
            <Text type="header" marginBottom={5}>Basic Video</Text>
            <Video loop autoPlay source={{ uri: 'https://rawgit.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4' }} />
          </QuickView>
          <QuickView marginVertical={10}>
            <Text type="header" marginBottom={5}>Sharp Video</Text>
            <Video sharp source={{ uri: 'https://rawgit.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4' }} />
          </QuickView>
          <QuickView marginVertical={10}>
            <Text type="header" marginBottom={5}>Youtube Video</Text>
            <Video autoPlay source={{ uri: 'https://youtu.be/Zzn9-ATB9aU' }} />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default VideoExample;
