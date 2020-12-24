import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Store from '@config/store';
import { enableScreens } from 'react-native-screens';
import codePush from 'react-native-code-push';
import AppContainer from './app.container';

const { store, persistor } = Store();

class App extends PureComponent {
  render() {
    // Add this for better navigation performance instead of customization
    enableScreens();
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default codePush(App);
