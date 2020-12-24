/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import { PickerProps as RNPickerProps, ActionSheetIOS, StyleSheet, Platform, VirtualizedList } from 'react-native';
import _ from 'lodash';
import { Picker as RNPicker } from '@react-native-community/picker';
import { ThemeEnum } from '@contents/Config/redux/slice';
import { ItemValue } from '@react-native-community/picker/typings/Picker';
import AppView from '@utils/appView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withTheme, ThemeProps } from 'react-native-elements';
import i18next from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../Icon';
import Button from '../Button/DefaultButton';
import QuickView from '../View/QuickView';
import ModalButton, { ModalButtonProps } from '../Button/ModalButton';
import Text from '../Text';

export interface PickerProps extends RNPickerProps, Omit<ModalButtonProps, 'style' >{
  labels?: Array<string | number>;
  values: Array<string | number>;
  placeholder?: string;
  width?: number | string;
  modalHeight?: number | string;
  modalHeightLevel?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 ;
  iconColor?: string;
  modal?: boolean;
  onValuePress?: (value: any, index?: number) => any;
  theme?: any;
}
interface State {
  selectedIndex: number | null;
}

class Picker extends PureComponent<PickerProps, State> {
  static defaultProps = {
    width: 100,
    height: 50,
    mode: 'dropdown',
    rounded: true,
  };

  pickerModal: any;

  constructor(props: PickerProps) {
    super(props);
    this.state = {
      selectedIndex: null,
    };
  }

  getDefaultIndex = () => {
    const { selectedValue, values } = this.props;
    let defaultIndex: number | null = null;
    if (typeof selectedValue === 'number') {
      defaultIndex = selectedValue;
    } else if (typeof selectedValue === 'string') {
      defaultIndex = _.indexOf(values, selectedValue);
    }
    return defaultIndex;
  };

  getSelectedIndex = () => {
    const { placeholder } = this.props;
    const { selectedIndex } = this.state;
    if (selectedIndex === null) {
      const defaultIndex = this.getDefaultIndex();
      if (defaultIndex !== null) {
        return defaultIndex;
      }
      if (placeholder) {
        return null;
      } return 0;
    }
    if (Platform.OS === 'android' && selectedIndex < 0) return null;
    return selectedIndex;
  };

  getSelectedValue = () => {
    const { values } = this.props;
    const selectedIndex = this.getSelectedIndex();
    if (selectedIndex === null) return null;
    return values[selectedIndex];
  };

  getText = () => {
    const { labels, values } = this.props;
    const selectedIndex = this.getSelectedIndex();
    if (selectedIndex === null) return null;
    return labels ? labels[selectedIndex] : values[selectedIndex];
  };

  /**
   * iOS
   */

  onPressActionSheetIOS = () => {
    const { labels, values } = this.props;
    const itemLabel = labels || values;
    const newLabel: any = [...itemLabel, i18next.t('cancel')];
    return (
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: newLabel,
          cancelButtonIndex: values.length,
        },
        (buttonIndex: number) => {
          if (buttonIndex !== values.length) {
            const { selectedIndex } = this.state;
            const { onValueChange, onValuePress } = this.props;
            if (onValuePress) onValuePress(values[buttonIndex], buttonIndex); // Not Change State
            else if (selectedIndex !== buttonIndex) {
              this.setState({ selectedIndex: buttonIndex });
              if (onValueChange) { onValueChange(values[buttonIndex], buttonIndex); }
            }
          }
        },
      )
    );
  };

  /**
   * Android
   */
  renderItemAndroid = () => {
    const {
      titleColor: titleColorProp, theme,
      primary, secondary, success, warning, error,
      labels: labelsProp, values: valuesProp, placeholder,
    } = this.props;
    let titleColor = titleColorProp || (theme.key === ThemeEnum.LIGHT ? theme.colors.grey5 : theme.colors.dark);
    if (primary || secondary || success || warning || error) titleColor = theme.dark;
    let labels: any = labelsProp;
    let values: any = valuesProp;
    if (placeholder) {
      if (labels) labels = [placeholder, ...labels];
      values = [placeholder, ...values];
    }
    return values.map(
      (value: any, index: number) => (<RNPicker.Item key={index.toString()} color={titleColor} label={labels ? labels[index] : value} value={value} />),
    );
  };

  onValueChangeAndroid = (itemValue: ItemValue, itemIndex: number): void => {
    const { values, onValueChange, onValuePress, placeholder } = this.props;
    if (onValuePress) onValuePress(values[itemIndex], itemIndex); // Not Change State
    else if (!placeholder) {
      this.setState({ selectedIndex: itemIndex });
      if (onValueChange) { onValueChange(values[itemIndex], itemIndex); }
    } else {
      this.setState({ selectedIndex: itemIndex - 1 });
      if (itemIndex >= 1) { if (onValueChange) { onValueChange(values[itemIndex - 1], itemIndex - 1); } }
    }
  };

  getItem = (data: Array<string>, index: number) => data[index];

  getItemCount = (data: Array<string>) => data.length;

  renderModalItem = ({ item, index }: { item: string, index: number }) => {
    const { values } = this.props;
    return (
      <Button
        marginVertical={3}
        marginHorizontal={AppView.bodyPaddingHorizontal}
        clear
        title={item}
        titleCenter={false}
        onPress={() => {
          const { selectedIndex } = this.state;
          const { onValueChange, onValuePress } = this.props;
          if (onValuePress) onValuePress(values[index], index);
          else if (selectedIndex !== index) {
            this.pickerModal.close();
            this.setState({ selectedIndex: index });
            if (onValueChange) { onValueChange(values[index], index); }
          }
        }}
      />
    );
  };

  render() {
    const {
      labels,
      values,
      placeholder,
      itemStyle: itemStyleProp,
      icon: iconProp,
      titleStyle: titleStyleProp,
      titleProps: titlePropsProp,
      buttonStyle: buttonStyleProp,
      titleCenter,
      iconColor,
      modal,
      modalHeight: modalHeightProp,
      modalHeightLevel,
      modalProps: modalPropsProp,
      theme,
      ...otherProps
    } = this.props;
    const { width: widthProp, height: heightProp } = this.props;
    const { selectedIndex } = this.state;

    /**
     * currentLabel (iOS)
     */
    let currentLabel: any = '';
    const defaultIndex = this.getDefaultIndex();
    const itemLabel = labels || values;
    if (selectedIndex === null) {
      if (defaultIndex !== null) {
        currentLabel = itemLabel[defaultIndex];
      } else {
        currentLabel = placeholder || itemLabel[0];
      }
    } else {
      currentLabel = itemLabel[selectedIndex];
    }

    /**
     * BUTTON PROPS (For iOS & Modal Picker)
     */
    /**
     * titleStyle, titleProps
     */
    const titleStyle: any = StyleSheet.flatten([
      typeof widthProp === 'number' && { maxWidth: widthProp > 50 ? widthProp - 50 : 50 },
      typeof widthProp === 'string' && { maxWidth: widthProp },
      titleStyleProp,
    ]);
    const titleProps: any = _.merge(
      { numberOfLines: 1 },
      titlePropsProp,
    );

    /**
     * buttonStyle
     */
    const buttonStyle: any = StyleSheet.flatten([
      !titleCenter && { justifyContent: 'space-between' },
      buttonStyleProp,
    ]);

    /**
     * Icon
     */
    const { titleColor } = this.props;
    const defaultIcon = {
      name: 'caretdown',
      type: 'antdesign',
      size: 15,
      color: iconColor || titleColor,
    };
    const icon = _.merge(defaultIcon, iconProp);

    const modalProps = _.merge({ type: 'bottom-half' }, modalPropsProp);
    const modalHeight = modalHeightProp || ((modalHeightLevel || 7) / 10) * AppView.screenHeight;
    if (modal) {
      return (
        <ModalButton
          ref={(ref: any) => { this.pickerModal = ref; }}
          testID="PickerIOS"
          title={currentLabel}
          buttonStyle={buttonStyle}
          icon={icon}
          titleStyle={titleStyle}
          titleProps={titleProps}
          iconRight
          modalProps={modalProps}
          {...otherProps}
        >
          <SafeAreaView edges={['left', 'right']} mode="padding">
            <QuickView
              backgroundColor={theme.colors.primaryBackground}
              height={modalHeight}
              style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            >
              {placeholder ? (
                <QuickView row justifyContent="space-between" marginVertical={15} marginHorizontal={AppView.bodyPaddingHorizontal}>
                  <QuickView />
                  <Text type="title" bold center>{placeholder}</Text>
                  <TouchableOpacity containerStyle={{ alignSelf: 'center' }} onPress={() => this.pickerModal.close()}>
                    <Icon name="close" size={30} />
                  </TouchableOpacity>
                </QuickView>
              ) : null}
              <VirtualizedList
                data={itemLabel}
                renderItem={this.renderModalItem}
                initialNumToRender={20}
                updateCellsBatchingPeriod={10}
                keyExtractor={(item, index) => index.toString()}
                getItemCount={this.getItemCount}
                getItem={this.getItem}
                style={{ marginBottom: AppView.safeAreaInsets.bottom }}
              />
            </QuickView>
          </SafeAreaView>
        </ModalButton>
      );
    }
    if (Platform.OS === 'ios') {
      const { invisible, buttonChildren } = this.props;
      if (invisible) {
        return (
          <TouchableOpacity onPress={this.onPressActionSheetIOS}>
            {buttonChildren}
          </TouchableOpacity>
        );
      }
      return (
        <Button
          testID="PickerIOS"
          onPress={this.onPressActionSheetIOS}
          title={currentLabel}
          buttonStyle={buttonStyle}
          icon={icon}
          titleStyle={titleStyle}
          titleProps={titleProps}
          iconRight
          {...otherProps}
        />
      );
    }

    /**
       * Android
       */

    /**
       * androidStyle
       */
    const { colors } = theme;
    const {
      backgroundColor: backgroundColorProp,
      primary, secondary, success, warning, error,
      style: styleProp,
      mode,
      sharp: sharpProp,
      rounded: roundedProp,
      circle: circleProp,
      borderRadius: borderRadiusProp,
    } = this.props;
    let backgroundColor = backgroundColorProp || theme.Button.backgroundColor;
    if (primary) backgroundColor = colors.primary;
    if (secondary) backgroundColor = colors.secondary;
    if (success) backgroundColor = colors.success;
    if (warning) backgroundColor = colors.warning;
    if (error) backgroundColor = colors.error;

    // borderRadius
    let width = widthProp;
    let height = heightProp;

    let borderRadius: any = 0;
    let sharp = sharpProp;
    let rounded = roundedProp;
    let circle = circleProp;
    if (borderRadiusProp) {
      borderRadius = borderRadiusProp;
    } else {
      if (circle) {
        rounded = false;
        sharp = false;
        const minDimension = _.min([width, height]) || 50;
        width = minDimension;
        height = minDimension;
        borderRadius = minDimension;
      }
      if (rounded) {
        borderRadius = theme.Button.roundedBorderRadius;
      }
      if (sharp) {
        rounded = false;
        circle = false;
        borderRadius = 0;
      }
    }

    const androidStyle = StyleSheet.flatten([
      {
        height, width, backgroundColor, borderRadius,
      },
      styleProp,
    ]);

    /**
     * currentValue
     */
    let currentValue: any = '';
    if (selectedIndex === null) {
      if (defaultIndex !== null) {
        currentValue = values[defaultIndex];
      } else {
        currentValue = placeholder || values[0];
      }
    } else {
      currentValue = values[selectedIndex];
    }
    const { shadow } = this.props;
    return (
      <QuickView style={androidStyle} testID="PickerAndroid" shadow={shadow}>
        <RNPicker
          selectedValue={currentValue}
          style={{ height, width }}
          mode={mode}
          onValueChange={this.onValueChangeAndroid}
        >
          {this.renderItemAndroid()}
        </RNPicker>
      </QuickView>
    );
  }
}

export default withTheme(
  Picker as any as React.ComponentType<PickerProps & ThemeProps<any>>
);
