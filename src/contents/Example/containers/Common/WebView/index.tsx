import React, { PureComponent } from 'react';
import {
  Container, QuickView, Header, Body, HTML,
} from '@components';
import html from './mock/html';

class WebViewExample extends PureComponent {
  render() {
    return (
      <Container>
        <Header backIcon title="HTML" shadow switchTheme />
        <Body scrollable>
          <QuickView style={{ marginBottom: 15, marginTop: 10 }}>
            <HTML html={html} />
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default WebViewExample;
