/* eslint-disable no-undef */
import React from 'react';
import Font from '@themes/Font';
import TestHelper, { EnumComponent } from '@utils/testHelper';
import { lightTheme } from '@themes/Theme';
import { Platform } from 'react-native';
import Color from '@themes/Color';
import Text from '..';

const target = <Text />;
const type = EnumComponent.HOC;

describe('Text Component', () => {
  TestHelper.basicTest(target, type);

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
    TestHelper.testStyleProps(target, props, type);
  });

  it('should apply all custom props', () => {
    /**
     * center
     */
    const testStyle = TestHelper.getStyle(target, { center: true }, type);
    expect(testStyle.textAlign).toBe('center');

    /**
     * fontFamily, fontWeight, fontSize
     */
    const props2 = {
      fontFamily: 'GoogleSans',
      thin: true,
      fontSize: 'large',
    };
    const testStyle2 = TestHelper.getStyle(target, props2, type);
    expect(testStyle2.fontFamily).toBe(Font.fontFamily.GoogleSans);
    expect(testStyle2.fontWeight).toBe('200');
    expect(testStyle2.fontSize).toBe(Font.fontSize.large);

    /**
     * primary, secondary, success,  warning, error, color,
     */
    Platform.OS = 'android';
    const testStyle3 = TestHelper.getStyle(target, { primary: true }, type);
    expect(testStyle3.color).toBe(lightTheme.colors.primary);
    const testStyle4 = TestHelper.getStyle(target, { secondary: true }, type);
    expect(testStyle4.color).toBe(lightTheme.colors.secondary);
    const testStyle5 = TestHelper.getStyle(target, { success: true }, type);
    expect(testStyle5.color).toBe(lightTheme.colors.success);
    const testStyle6 = TestHelper.getStyle(target, { error: true }, type);
    expect(testStyle6.color).toBe(lightTheme.colors.error);
    const testStyle7 = TestHelper.getStyle(target, { warning: true }, type);
    expect(testStyle7.color).toBe(lightTheme.colors.warning);
    const testStyle8 = TestHelper.getStyle(target, { color: Color.orange }, type);
    expect(testStyle8.color).toBe(Color.orange);
    jest.resetModules();

    /**
     * underline, bold, italic
     */
    const testStyle15 = TestHelper.getStyle(target, { underline: true }, type);
    expect(testStyle15.textDecorationLine).toBe('underline');
    const testStyle16 = TestHelper.getStyle(target, { bold: true }, type);
    expect(testStyle16.fontWeight).toBe('bold');
    const testStyle17 = TestHelper.getStyle(target, { italic: true }, type);
    expect(testStyle17.fontStyle).toBe('italic');

    /**
     * icon
     */
    // const component = mount(<Text icon={{ name: 'account' }} />);
    // const demo = component.findWhere((node) => node.prop('testID') === 'EIconText');
    // expect(demo.length).toBeGreaterThanOrEqual(1);

    const props3 = TestHelper.getComponent(target, { icon: { name: 'account' } }, type).props();
    expect(props3.testID).toBe('EIconText');
    expect(props3.row).toBe(true);
    expect(props3.rowReverse).not.toBe(true);

    /**
     * iconRight
     */
    const props4 = TestHelper.getComponent(target, { icon: { name: 'account' }, iconRight: true }, type).props();
    expect(props3.testID).toBe('EIconText');
    expect(props4.row).not.toBe(true);
    expect(props4.rowReverse).toBe(true);

    /**
     * iconContainerStyle
     */
    const props5 = TestHelper.getComponent(target, { icon: { name: 'account' }, iconContainerStyle: { color: Color.orange } }, type).childAt(0).props();
    expect(props3.testID).toBe('EIconText');
    expect(props5.style).toMatchObject({ color: Color.orange });

    /**
     * type
     */
    const testStyle18 = TestHelper.getStyle(target, { type: 'xTitle' }, type);
    expect(testStyle18).toMatchObject(lightTheme.Text.xTitle);
  });
});
