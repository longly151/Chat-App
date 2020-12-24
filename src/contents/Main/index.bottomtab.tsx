/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Icon, withTheme } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { loginSelector } from '@contents/Auth/containers/Login/redux/selector';
import Selector from '@utils/selector';
import AppView from '@utils/appView';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeEnum } from '@contents/Config/redux/slice';
import i18next from 'i18next';
import MoreScreen from './containers/More/screens/index';
import ExampleListScreen from '../Example/screens/index';
import moreStack from './containers/More/routes';
import homeStack from './containers/Home/routes';

const BottomTabs = createBottomTabNavigator();

function MainBottomTab(props: any) {
  const insets = useSafeAreaInsets();
  const { theme: { colors: { secondaryBackground, primary, primaryBackground }, key }, } = props;
  const loginSelectorData = useSelector((state) => Selector.getObject(loginSelector, state));
  const isNotLogin = !loginSelectorData.data.token;

  const backgroundColor = key === ThemeEnum.LIGHT ? primaryBackground : secondaryBackground;

  /**
   * Handle Screen Metrics & SafeAreaInsets
   */

  const height = AppView.bottomNavigationBarHeight + insets.bottom;
  const customStyle: any = {};
  if (!insets.bottom && !AppView.isHorizontal) customStyle.paddingBottom = 5;
  if (insets.bottom && !AppView.isHorizontal) {
    customStyle.paddingTop = 10;
  } else if (!insets.bottom && !AppView.isHorizontal) {
    customStyle.paddingTop = 5;
  }
  if (insets.bottom && AppView.isHorizontal) {
    customStyle.maxHeight = height - 15;
  } else if (!insets.bottom && AppView.isHorizontal) {
    customStyle.maxHeight = height - 10;
  }

  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        showLabel: true,
        activeTintColor: primary,
        inactiveTintColor: primary,
        style: StyleSheet.flatten([{
          height,
          borderTopLeftRadius: AppView.roundedBorderRadius,
          borderTopRightRadius: AppView.roundedBorderRadius,
          borderTopColor: 'transparent',
          backgroundColor,
        },
        customStyle,
        AppView.shadow
        ]),
        tabStyle: {
          borderRadius: AppView.roundedBorderRadius,
        },
        labelStyle: {
          fontSize: 12,
        },
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTabs.Screen
        name={homeStack.index}
        component={ExampleListScreen}
        options={{
          tabBarLabel: i18next.t('bottom_tab:home'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="home"
              type="material-community"
              color={color}
              size={26}
            />
          ) : (
            <Icon name="home-outline" type="material-community" color={color} size={22} />
          )),
        }}
      />
      <BottomTabs.Screen
        name={moreStack.index}
        component={MoreScreen}
        options={{
          tabBarLabel: i18next.t('bottom_tab:profile'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon name="bars" type="font-awesome" color={color} size={20} />
          ) : (
            <Icon name="bars" type="font-awesome" color={color} size={16} />
          )),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default withTheme(MainBottomTab);
