/* eslint-disable no-undef */
import React from 'react';
import TestHelper, { EnumComponent } from '@utils/testHelper';
import Container from '..';

const target = <Container />;
const type = EnumComponent.HOC;

describe('Container Component', () => {
  TestHelper.basicTest(target, type);

  it('should apply all style-related props', () => {
    const props = {
      backgroundColor: '#FF8C00',
    };
    TestHelper.testStyleProps(target, props, type, 'style');
  });
});
