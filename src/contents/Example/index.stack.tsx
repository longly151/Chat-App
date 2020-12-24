import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommonExampleStack from './containers/Common/index.stack.';
import exampleStack from './routes';
import ExampleListScreen from './screens';

const Stack = createStackNavigator();

export default function ExampleStack() {
  return (
    <>
      <Stack.Screen name={exampleStack.exampleList} component={ExampleListScreen} />
      {CommonExampleStack()}
    </>
  );
}
