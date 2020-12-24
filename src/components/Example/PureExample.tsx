/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import {
  QuickView, Text, Container, Header, Body,
} from '@components';

class PureExample extends PureComponent {
  render() {
    return (
      <Container>
        <Header backIcon title="PureExample" />
        <Body scrollable>
          <QuickView>
            <Text center>Example Screen</Text>
          </QuickView>
        </Body>
      </Container>
    );
  }
}

export default PureExample;
