/* eslint-disable no-undef */
import React from 'react';
import TestHelper, { EnumComponent } from '@utils/testHelper';
import { lightTheme } from '@themes/Theme';
import { Platform } from 'react-native';
import Color from '@themes/Color';
import AppView from '@utils/appView';
import Button from '..';

const target = <Button />;
const type = EnumComponent.HOC;

describe('Button Component', () => {
  TestHelper.basicTest(target, type);

  it('should apply all style-related props', () => {
    const props = {
      width: 100,
      height: 100,
      margin: 10,
      marginVertical: 10,
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
    };
    TestHelper.testStyleProps(target, props, type, 'containerStyle');

    const props1 = {
      borderRadius: 20,
      borderColor: Color.orange,
      borderWidth: 5,
    };
    TestHelper.testStyleProps(target, props1, type, 'buttonStyle');
  });

  it('should apply all custom props', () => {
    /**
     * center
     */
    const testStyle = TestHelper.getStyle(target, { center: true }, type, 'containerStyle');
    expect(testStyle.alignSelf).toBe('center');

    /**
     * bold, titleColor
     */
    const testStyle1 = TestHelper.getStyle(target, { bold: true }, type, 'titleStyle');
    expect(testStyle1.fontWeight).toBe('bold');
    const testStyle2 = TestHelper.getStyle(target, { titleColor: Color.orange }, type, 'titleStyle');
    expect(testStyle2.color).toBe(Color.orange);

    /**
     * type = solid | null, primary, secondary, success, warning, error, backgroundColor,
     */
    const testStyle3 = TestHelper.getStyle(target, { primary: true }, type, 'buttonStyle');
    expect(testStyle3.backgroundColor).toBe(lightTheme.colors.primary);
    const testStyle4 = TestHelper.getStyle(target, { secondary: true }, type, 'buttonStyle');
    expect(testStyle4.backgroundColor).toBe(lightTheme.colors.secondary);
    const testStyle5 = TestHelper.getStyle(target, { success: true }, type, 'buttonStyle');
    expect(testStyle5.backgroundColor).toBe(lightTheme.colors.success);
    const testStyle6 = TestHelper.getStyle(target, { error: true }, type, 'buttonStyle');
    expect(testStyle6.backgroundColor).toBe(lightTheme.colors.error);
    const testStyle7 = TestHelper.getStyle(target, { warning: true }, type, 'buttonStyle');
    expect(testStyle7.backgroundColor).toBe(lightTheme.colors.warning);
    const testStyle8 = TestHelper.getStyle(target, { backgroundColor: Color.orange }, type, 'buttonStyle');
    expect(testStyle8.backgroundColor).toBe(Color.orange);

    /**
     * type = outline, primary, secondary, success, warning, error,
     */
    const testStyle15 = TestHelper.getStyle(target, { outline: true }, type, 'buttonStyle');
    expect(testStyle15.backgroundColor).toBe('transparent');
    expect(testStyle15.borderColor).toBe(lightTheme.Button.outlineBorderColor);

    const testStyleOutline3 = TestHelper.getStyle(target, { outline: true, primary: true }, type, 'buttonStyle');
    expect(testStyleOutline3.borderColor).toBe(lightTheme.colors.primary);
    const testStyleOutline4 = TestHelper.getStyle(target, { outline: true, secondary: true }, type, 'buttonStyle');
    expect(testStyleOutline4.borderColor).toBe(lightTheme.colors.secondary);
    const testStyleOutline5 = TestHelper.getStyle(target, { outline: true, success: true }, type, 'buttonStyle');
    expect(testStyleOutline5.borderColor).toBe(lightTheme.colors.success);
    const testStyleOutline6 = TestHelper.getStyle(target, { outline: true, error: true }, type, 'buttonStyle');
    expect(testStyleOutline6.borderColor).toBe(lightTheme.colors.error);
    const testStyleOutline7 = TestHelper.getStyle(target, { outline: true, warning: true }, type, 'buttonStyle');
    expect(testStyleOutline7.borderColor).toBe(lightTheme.colors.warning);
    jest.resetModules();

    /**
     * type = clear, primary, secondary, success, warning, error,
     */
    const testStyle16 = TestHelper.getStyle(target, { clear: true }, type, 'buttonStyle');
    expect(testStyle16.backgroundColor).toBe('transparent');
    expect(testStyle16.borderWidth).toBe(0);
    const testStyle17 = TestHelper.getStyle(target, { clear: true }, type, 'titleStyle');
    expect(testStyle17.color).toBe(lightTheme.Button.outlineTitleColor);

    Platform.OS = 'android';
    const testStyleClear3 = TestHelper.getStyle(target, { clear: true, primary: true }, type, 'titleStyle');
    expect(testStyleClear3.color).toBe(lightTheme.colors.primary);
    const testStyleClear4 = TestHelper.getStyle(target, { clear: true, secondary: true }, type, 'titleStyle');
    expect(testStyleClear4.color).toBe(lightTheme.colors.secondary);
    const testStyleClear5 = TestHelper.getStyle(target, { clear: true, success: true }, type, 'titleStyle');
    expect(testStyleClear5.color).toBe(lightTheme.colors.success);
    const testStyleClear6 = TestHelper.getStyle(target, { clear: true, error: true }, type, 'titleStyle');
    expect(testStyleClear6.color).toBe(lightTheme.colors.error);
    const testStyleClear7 = TestHelper.getStyle(target, { clear: true, warning: true }, type, 'titleStyle');
    expect(testStyleClear7.color).toBe(lightTheme.colors.warning);
    jest.resetModules();

    /**
     * active, activeBorderColor, activeBackgroundColor, activeTitleColor
     */
    const testStyle18 = TestHelper.getStyle(target, {
      active: 'true', activeBorderColor: Color.orange, activeBackgroundColor: Color.orange,
    }, type, 'buttonStyle');
    expect(testStyle18.borderColor).toBe(Color.orange);
    expect(testStyle18.backgroundColor).toBe(Color.orange);

    const testStyle19 = TestHelper.getStyle(target, {
      active: 'true', activeTitleColor: Color.orange,
    }, type, 'titleStyle');
    expect(testStyle19.color).toBe(Color.orange);

    /**
     * sharp, rounded, circle
     */
    const testStyle20 = TestHelper.getStyle(target, { sharp: 'true' }, type, 'buttonStyle');
    expect(testStyle20.borderRadius).toBe(0);

    const testStyle21 = TestHelper.getStyle(target, { rounded: 'true' }, type, 'buttonStyle');
    expect(testStyle21.borderRadius).toBe(lightTheme.Button.roundedBorderRadius);

    const testStyle22 = TestHelper.getStyle(target, { circle: 'true' }, type, 'buttonStyle');
    expect(testStyle22.width).toBe(testStyle22.height);
    expect(testStyle22.width).toBe(testStyle22.borderRadius);

    /**
     * shadow
     */
    const testStyle23 = TestHelper.getStyle(target, { shadow: true }, type, 'buttonStyle');
    expect(testStyle23).toMatchObject(AppView.shadow);
    const testStyle24 = TestHelper.getStyle(target, { shadow: true }, type, 'containerStyle');
    expect(testStyle24.paddingBottom).toBeGreaterThanOrEqual(3);
  });
});
