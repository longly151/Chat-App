import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import commonStack from './routes';
import TextExample from './Text';
import HeaderExample from './Header';
import ButtonExample from './Button';
import AvatarExample from './Avatar';
import PickerExample from './Picker';
import InputExample from './Input';
import ListCheckBoxExample from './ListCheckBox';
import FlatListStack from './FlatList/index.stack';
import ImageExample from './Image';
import VideoExample from './Video';
import ModalExample from './Modal';
import DateTimePickerExample from './DateTimePicker';
import ImagePickerButtonExample from './ImagePickerButton';
import WebViewExample from './WebView';
import FileExample from './File';
import LoadingExample from './Loading';
import MapExample from './Map';
import SocialAuthentication from './SocialAuthentication';
import CalendarExample from './Calendar';
import CarouselExample from './Carousel';

const Stack = createStackNavigator();

export default function CommonExampleStack() {
  return (
    <>
      <Stack.Screen name={commonStack.text} component={TextExample} />
      <Stack.Screen name={commonStack.header} component={HeaderExample} />
      <Stack.Screen name={commonStack.button} component={ButtonExample} />
      <Stack.Screen name={commonStack.avatar} component={AvatarExample} />
      <Stack.Screen name={commonStack.picker} component={PickerExample} />
      <Stack.Screen name={commonStack.imagePickerButton} component={ImagePickerButtonExample} />
      <Stack.Screen name={commonStack.dateTimePicker} component={DateTimePickerExample} />
      <Stack.Screen name={commonStack.calendar} component={CalendarExample} />
      <Stack.Screen name={commonStack.input} component={InputExample} />
      {FlatListStack()}
      <Stack.Screen name={commonStack.image} component={ImageExample} />
      <Stack.Screen name={commonStack.video} component={VideoExample} />
      <Stack.Screen name={commonStack.listCheckBox} component={ListCheckBoxExample} />
      <Stack.Screen name={commonStack.modal} component={ModalExample} />
      <Stack.Screen name={commonStack.webView} component={WebViewExample} />
      <Stack.Screen name={commonStack.file} component={FileExample} />
      <Stack.Screen name={commonStack.loading} component={LoadingExample} />
      <Stack.Screen name={commonStack.carousel} component={CarouselExample} />

      <Stack.Screen name={commonStack.map} component={MapExample} />
      <Stack.Screen name={commonStack.socialAuthentication} component={SocialAuthentication} />
    </>
  );
}
