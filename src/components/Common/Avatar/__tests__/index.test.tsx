/* eslint-disable no-undef */
import React from 'react';
import TestHelper, { EnumComponent } from '@utils/testHelper';
import Color from '@themes/Color';
import Avatar from '..';

const target = <Avatar />;
const type = EnumComponent.SINGLE;

describe('Avatar Component', () => {
  TestHelper.basicTest(target, type, 1, false);

  it('should apply all style-related props', () => {
    const props = {
      margin: 10,
      marginVertical: 10,
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
    };
    TestHelper.testStyleProps(target, props, type, 'containerStyle');
    const props2 = {
      backgroundColor: Color.orange,
    };
    TestHelper.testStyleProps(target, props2, type, 'overlayContainerStyle');
  });
});
