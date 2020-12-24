/* eslint-disable @typescript-eslint/naming-convention */
import React, { ReactNode } from 'react';
import { Linking, StyleSheet } from 'react-native';
import RNHTML, { NonRegisteredStylesProp, PassProps, HtmlAttributesDictionary } from 'react-native-render-html';
import AppView from '@utils/appView';
import Image from '../Image/DefaultImage';
import Text from '../Text';

export interface HTMLProps extends RNHTML.ContainerProps {
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  style?: any;
  theme?: any;
}

class HTML extends React.PureComponent<HTMLProps> {
  static defaultProps = {
    html: ''
  };

  imageMultipleSources: Array<string> = [];

  onLinkPress = async (event: any, href: any) => {
    await Linking.openURL(href);
  };

  renderText = (
    htmlAttribs: HtmlAttributesDictionary,
    children: ReactNode,
    convertedCSSStyles: NonRegisteredStylesProp<any>,
    passProps: PassProps<{}>
  ) => {
    const { _constructStyles } = require('react-native-render-html/src/HTMLStyles');
    const style = _constructStyles({
      tagName: 'img',
      htmlAttribs,
      passProps,
    });
    const key = Math.random() + Date.now();
    return (
      <Text key={key} style={style} selectable>
        {children}
      </Text>
    );
  };

  renderImage = (
    htmlAttribs: HtmlAttributesDictionary,
    children: ReactNode,
    convertedCSSStyles: NonRegisteredStylesProp<any>,
    passProps: PassProps<{}>
  ) => {
    const { _constructStyles } = require('react-native-render-html/src/HTMLStyles');
    const style = _constructStyles({
      tagName: 'img',
      htmlAttribs,
      passProps,
    });
    const key = Math.random() + Date.now();
    const source: any = htmlAttribs.src ? { uri: htmlAttribs.src } : undefined;
    this.imageMultipleSources.push(source);
    return (
      <Image
        key={key}
        source={source}
        multipleSources={this.imageMultipleSources}
        style={style}
        resizeMode="contain"
        viewEnable
      />
    );
  };

  render() {
    const {
      imagesMaxWidth: imagesMaxWidthProp,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal,
      marginVertical,
      style
    } = this.props;

    const containerStyle = StyleSheet.flatten([
      {
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginVertical,
      },
      style,
    ]);

    const renderers: RNHTML.RendererDictionary<{}> = {
      p: this.renderText,
      li: this.renderText,
      img: this.renderImage
    };
    const imagesMaxWidth = imagesMaxWidthProp
    || AppView.screenWidth - AppView.bodyPaddingHorizontal;

    return (
      <RNHTML
        {...this.props}
        imagesMaxWidth={imagesMaxWidth}
        onLinkPress={this.onLinkPress}
        renderers={renderers}
        textSelectable
        containerStyle={containerStyle}
      />
    );
  }
}

export default HTML;
