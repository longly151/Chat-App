/* eslint-disable no-undef */
import React from 'react';
import TestHelper, { EnumComponent } from '@utils/testHelper';
import { lightTheme } from '@themes/Theme';
import Color from '@themes/Color';
import AppView from '@utils/appView';
import Header from '..';

const target = <Header />;
const type = EnumComponent.HOC;

describe('Header Component', () => {
  TestHelper.basicTest(target, type);

  it('should apply all style-related props', () => {
    const props = {
      position: 'absolute',
      height: 10,
      width: 10,
      top: 10,
      left: 10,
      right: 10,
      bottom: 10,
      borderBottomColor: Color.orange,
      borderBottomWidth: 1,
      backgroundColor: Color.orange,
    };
    TestHelper.testStyleProps(target, props, type, 'containerStyle');
  });

  it('should apply all custom props', () => {
    /**
     * transparent
     */
    const testStyle = TestHelper.getStyle(target, { transparent: true }, type, 'containerStyle');
    expect(testStyle.backgroundColor).toBe('transparent');

    /**
     * backIcon, closeIcon
     */
    const props = TestHelper.getComponent(target, { backIcon: true }, type).props();
    expect(props.leftComponent).toMatchObject({
      icon: 'arrowleft',
      type: 'antdesign',
      size: 25,
      color: lightTheme.Header.leftColor,
    });

    const props2 = TestHelper.getComponent(target, { closeIcon: true }, type).props();
    expect(props2.leftComponent).toMatchObject({
      icon: 'close',
      type: 'antdesign',
      size: 25,
      color: lightTheme.Header.leftColor,
    });

    /**
     * title, logo
     */
    const props3 = TestHelper.getComponent(target, { title: 'Header' }, type).props();
    expect(props3.centerComponent).toMatchObject({
      text: 'Header',
    });

    const props4 = TestHelper.getComponent(target, { logo: true }, type).props();
    expect(props4.centerComponent.props.testID).toBe('centerComponentLogo');

    /**
     * switchTheme
     */
    const props5 = TestHelper.getComponent(target, { switchTheme: true }, type).props();
    expect(props5.rightComponent.props.testID).toBe('rightComponentSwitchTheme');

    /**
     * shadow
     */
    const testStyle2 = TestHelper.getStyle(target, { shadow: true }, type, 'containerStyle');
    expect(testStyle2).toMatchObject(AppView.shadow);

    /**
     * leftColor, centerColor, rightColor, color
     */
    const props6 = TestHelper.getComponent(target, {
      leftColor: Color.orange, backIcon: true,
    }, type).props();
    expect(props6.leftComponent.color).toBe(Color.orange);

    const props7 = TestHelper.getComponent(target, {
      centerColor: Color.orange, title: 'Header',
    }, type).props();
    expect(props7.centerComponent.style.color).toBe(Color.orange);

    const props8 = TestHelper.getComponent(target, {
      rightColor: Color.orange, switchTheme: true,
    }, type).props();
    expect(props8.rightComponent.props.children[0].props.color).toBe(Color.orange);

    const props9 = TestHelper.getComponent(target, {
      color: Color.orange, backIcon: true, switchTheme: true, title: 'Header',
    }, type).props();
    expect(props9.leftComponent.color).toBe(Color.orange);
    expect(props9.centerComponent.style.color).toBe(Color.orange);
    expect(props9.rightComponent.props.children[0].props.color).toBe(Color.orange);
  });
});
