/* eslint-disable no-undef */
import React from 'react';
import TestHelper, { EnumComponent } from '@utils/testHelper';
import AppView from '@utils/appView';
import Body from '..';

const target = <Body />;
const type = EnumComponent.HOC;

describe('Body Component', () => {
  TestHelper.basicTest(target, type, 2);

  it('should apply all custom props', () => {
    /**
     * primary, secondary
     */
    const props1 = TestHelper.getComponent(target, { primary: true }, type).props();
    expect(props1.children.props.style.backgroundColor).toBe('transparent');

    const props2 = TestHelper.getComponent(target, { secondary: true }, type).props();
    expect(props2.children.props.style.backgroundColor).toBe('transparent');

    /**
     * fullWidth, fullHeight, fullView
     */
    const props3 = TestHelper.getComponent(target, { fullWidth: true }, type).props();
    expect(props3.children.props.style.paddingHorizontal).toBe(0);
    expect(props3.testID).toBe('SafeAreaBodyView');

    const props4 = TestHelper.getComponent(target, { fullHeight: true }, type).props();
    expect(props4.testID).toBe('FullHeightBodyView');
    expect(props4.style.paddingHorizontal).toBe(AppView.bodyPaddingHorizontal);

    const props5 = TestHelper.getComponent(target, { fullView: true }, type).props();
    expect(props5.testID).toBe('FullHeightBodyView');
    expect(props5.style.paddingHorizontal).toBe(0);
  });
});
