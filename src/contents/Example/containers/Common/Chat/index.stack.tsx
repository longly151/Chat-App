import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import chatStack from './routes';
import ChatListScreen from './screens/ChatList';
import ChatDetailScreen from './screens/ChatDetail';

const Stack = createStackNavigator();

export default function ChatStack() {
  return (
    <>
      <Stack.Screen name={chatStack.chatList} component={ChatListScreen} />
      <Stack.Screen name={chatStack.chatDetail} component={ChatDetailScreen} />
    </>
  );
}
