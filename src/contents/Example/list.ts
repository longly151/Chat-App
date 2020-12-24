/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import commonStack from './containers/Common/routes';
import chatStack from './containers/Common/Chat/routes';
import productStack from './containers/Common/FlatList/routes';

// export const exampleList = [
//   {
//     name: 'Text',
//     subtitle: 'Support Theme',
//     iconName: 'comment-text-outline',
//     linearGradientColors: ['#FF9800', '#F44336'],
//     screen: commonStack.text,
//   },
//   {
//     name: 'Header',
//     subtitle: 'Support Theme',
//     iconName: 'page-layout-header',
//     linearGradientColors: ['#F44336', '#E91E63'],
//     screen: commonStack.header,
//   },
//   {
//     name: 'Avatar',
//     iconName: 'account',
//     iconSize: 30,
//     linearGradientColors: ['#9a16dd', '#009b9b'],
//     screen: commonStack.avatar,
//   },
//   {
//     name: 'Button',
//     subtitle: 'Support Theme',
//     iconName: 'gesture-tap',
//     iconSize: 35,
//     linearGradientColors: ['#3F51B5', '#2196F3'],
//     screen: commonStack.button,
//   },
//   {
//     name: 'Picker',
//     subtitle: 'Support Theme',
//     iconName: 'arrow-down-drop-circle-outline',
//     iconSize: 35,
//     linearGradientColors: ['#99121d', '#e69e5b'],
//     screen: commonStack.picker,
//   },
//   {
//     name: 'DateTimePicker',
//     subtitle: 'Support Theme',
//     iconName: 'calendar-month-outline',
//     iconSize: 35,
//     linearGradientColors: ['#d14763', '#ac7278'],
//     screen: commonStack.dateTimePicker,
//   },
//   {
//     name: 'Calendar',
//     iconName: 'calendar',
//     iconSize: 35,
//     subtitle: 'Support Theme',
//     linearGradientColors: ['#3CA55C', '#B5AC49'],
//     screen: commonStack.calendar,
//   },
//   {
//     name: 'Input',
//     subtitle: 'Support Theme',
//     iconName: 'format-letter-case',
//     iconSize: 35,
//     linearGradientColors: ['#37bc04', '#5bec88'],
//     screen: commonStack.input,
//   },
//   {
//     name: 'FlatList (Pure React)',
//     iconName: 'view-list',
//     iconSize: 35,
//     linearGradientColors: ['#7168c7', '#9edd14'],
//     screen: productStack.pureProductList,
//   },
//   {
//     name: 'FlatList (With Redux)',
//     iconName: 'view-list',
//     iconSize: 35,
//     linearGradientColors: ['#9edd14', '#7168c7'],
//     screen: productStack.productList,
//   },
//   {
//     name: 'Image',
//     iconName: 'image',
//     iconSize: 35,
//     linearGradientColors: ['#6d6bff', '#c50790'],
//     screen: commonStack.image,
//   },
//   {
//     name: 'Video (Android Beta)',
//     iconName: 'video',
//     iconSize: 35,
//     linearGradientColors: ['#02AAB0', '#00CDAC'],
//     screen: commonStack.video,
//   },
//   {
//     name: 'Image Picker Button',
//     iconName: 'image-edit',
//     iconSize: 35,
//     linearGradientColors: ['#c50790', '#6d6bff'],
//     screen: commonStack.imagePickerButton,
//   },
//   {
//     name: 'Badge',
//     iconName: 'tag',
//     linearGradientColors: ['#CD853F', '#FF9800'],
//     stack: null,
//     screen: null,
//   },
//   {
//     name: 'Modal',
//     iconName: 'arrange-bring-forward',
//     linearGradientColors: ['#d0cd25', '#d3037c'],
//     screen: commonStack.modal,
//   },
//   {
//     name: 'Chat',
//     iconName: 'message-text-outline',
//     subtitle: 'Support Theme',
//     linearGradientColors: ['#064ad2', '#7444bb'],
//     screen: chatStack.chatList
//   },
//   {
//     name: 'WebView',
//     iconName: 'web',
//     subtitle: 'Support Theme',
//     linearGradientColors: ['#02e7a3', '#8fce85'],
//     screen: commonStack.webView,
//   },
//   {
//     name: 'File',
//     iconName: 'attachment',
//     subtitle: 'Support Theme',
//     linearGradientColors: ['#187c9d', '#4743ff'],
//     screen: commonStack.file,
//   },
//   {
//     name: 'Loading',
//     iconName: 'circle-slice-6',
//     subtitle: 'Support Theme',
//     linearGradientColors: ['#c250df', '#dd525b'],
//     screen: commonStack.loading,
//   },
//   {
//     name: 'Map',
//     iconName: 'menu',
//     subtitle: 'Support Theme',
//     linearGradientColors: ['#431895', '#85057b'],
//     screen: commonStack.map,
//   },
//   {
//     name: 'Carousel',
//     iconName: 'view-carousel',
//     iconSize: 35,
//     subtitle: 'Support Theme',
//     linearGradientColors: ['#348F50', '#56B4D3'],
//     screen: commonStack.carousel,
//   },
//   {
//     name: 'ListCheckbox',
//     subtitle: 'Support Theme',
//     iconName: 'checkbox-multiple-marked',
//     linearGradientColors: ['#FFA69E', '#861657'],
//     screen: commonStack.listCheckBox,
//   },
//   {
//     name: 'Social Sign In',
//     iconName: 'github',
//     iconSize: 35,
//     subtitle: 'Support Theme',
//     linearGradientColors: ['#e62b88', '#802c46'],
//     screen: commonStack.socialAuthentication,
//   },
// ];

export const exampleList = [
  {
    name: 'Chat',
    iconName: 'message-text-outline',
    subtitle: 'Go to Chat Screen',
    linearGradientColors: ['#064ad2', '#7444bb'],
    screen: chatStack.chatList
  },
];
