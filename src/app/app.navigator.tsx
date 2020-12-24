import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-elements';
import { themeSelector, requireLoginSelector } from '@contents/Config/redux/selector';
import { INITIAL_STATE, ThemeEnum, resetRequireLogin } from '@contents/Config/redux/slice';
import { NavigationContainer, DarkTheme, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainStack from '@contents/index.navigator';
import { NavigationService } from '@utils/navigation';

import { lightTheme, darkTheme } from '@themes/Theme';
import ModalStack from '@contents/Modal/index.stack';

interface Props {
  theme: any;
  themeRedux: any;
  updateTheme: (theme: any) => any;
  requireLogin: boolean;
  reduxResetRequireLogin: () => any;
}

interface State {
  barStyle: any;
}

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      headerMode="none"
    >
      <Stack.Screen name="mainStack" component={MainStack} />
      {ModalStack()}
    </Stack.Navigator>
  );
}

class AppNavigator extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { requireLogin, reduxResetRequireLogin } = this.props;
    if (requireLogin !== INITIAL_STATE.requireLogin) reduxResetRequireLogin();
  }

  render() {
    const { themeRedux, theme, updateTheme } = this.props;
    /**
     * Handle Switch Theme
     */
    if (themeRedux !== theme.key) {
      const newTheme = lightTheme.key === themeRedux ? lightTheme : darkTheme;
      updateTheme(newTheme);
    }

    const barStyle = themeRedux === ThemeEnum.DARK ? 'light-content' : 'dark-content';
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }
    StatusBar.setBarStyle(barStyle, true);

    const navigationTheme: Theme = {
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        // background: 'transparent'
      }
    };

    return (
      <NavigationContainer theme={navigationTheme} ref={NavigationService.navigationRef}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen
            name="rootStack"
            component={RootStack}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  themeRedux: themeSelector(state),
  requireLogin: requireLoginSelector(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxResetRequireLogin: () => dispatch(resetRequireLogin()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(AppNavigator as any));
