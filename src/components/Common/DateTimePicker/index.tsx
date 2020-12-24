import React, { Component } from 'react';
import { Platform } from 'react-native';
import RNDateTimePicker, { IOSNativeProps, AndroidNativeProps } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { ThemeEnum, LanguageEnum } from '@contents/Config/redux/slice';
import Modal from 'react-native-modal';
import Color from '@themes/Color';
import { Divider, ThemeProps, withTheme } from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import AppView from '@utils/appView';
import i18next from 'i18next';
import { languageSelector } from '@contents/Config/redux/selector';
import { connect } from 'react-redux';
import Button, { ButtonProps } from '../Button/DefaultButton';
import QuickView from '../View/QuickView';
import Text from '../Text';

type Mode = 'date' | 'time' | 'datetime';
type Display = 'default' | 'spinner';

export interface DateTimePickerProps extends
  Omit<IOSNativeProps, 'mode'|'display'|'onChange'|'value'>,
  Omit<AndroidNativeProps, 'mode'|'display'|'value'>,
  Omit<ButtonProps, 'accessibilityActions'|'accessibilityComponentType'|'accessibilityElementsHidden'|'accessibilityHint'|'accessibilityIgnoresInvertColors'|'accessibilityLabel'|'accessibilityLiveRegion'|'accessibilityRole'|'accessibilityState'|'accessibilityTraits'|'accessibilityValue'|'accessibilityViewIsModal'|'accessible'|'hasTVPreferredFocus'|'hitSlop'|'importantForAccessibility'|'onAccessibilityAction'|'onAccessibilityEscape'|'onAccessibilityTap'|'onLayout'|'onMagicTap'|'style'|'testID'|'tvParallaxProperties' >{
  mode?: Mode;
  display?: Display;
  momentFormat?: string;
  value?: Date;
  placeholder?: string;
  placeholderTextColor?: string;
  language?: LanguageEnum;
  theme?: any;
}
interface State {
  date: Date;
  tempDate: Date;
  hidePlaceholder: boolean;
  show: boolean;
}

class DateTimePicker extends Component<DateTimePickerProps, State> {
  static defaultProps = {
    mode: 'date',
    display: 'default',
  };

  momentFormat = 'DD/MM/YYYY hh:mm A';

  minWidth = 250;

  constructor(props: DateTimePickerProps) {
    super(props);
    const { mode, value } = this.props;
    switch (mode) {
      case 'date':
        this.minWidth = 250;
        this.momentFormat = 'DD/MM/YYYY';
        break;
      case 'time':
        this.minWidth = 150;
        this.momentFormat = 'hh:mm A';
        break;
      case 'datetime':
        this.minWidth = 320;
        this.momentFormat = 'DD/MM/YYYY hh:mm A';
        break;
      default:
        this.minWidth = 250;
        this.momentFormat = 'DD/MM/YYYY hh:mm A';
    }
    this.state = {
      date: value || new Date(),
      tempDate: value || new Date(),
      show: false,
      hidePlaceholder: false,
    };
  }

  addTimeAndroid = (event: any, selectedDate: any) => {
    const { date } = this.state;
    const { onChange } = this.props;
    const currentDate = selectedDate || date;

    const dateString = moment(date).format('YYYY-MM-DD');
    const timeString = moment(currentDate).format('hh:mm');
    const newDateString = `${dateString} ${timeString}`;
    const newDate = moment(newDateString, 'YYYY-MM-DD hh:mm').toDate();
    this.setState({
      date: newDate,
    });
    if (onChange) onChange(event, selectedDate);
  };

  customOnChange = (event: any, selectedDate: any) => {
    const { date } = this.state;
    const { onChange } = this.props;
    const currentDate = selectedDate || date;
    switch (Platform.OS) {
      case 'ios':
        this.setState({ tempDate: currentDate });
        break;
      default:
        if (event.type === 'set') {
          this.setState({
            date: currentDate,
            show: false,
            hidePlaceholder: true,
          });
        }
        if (event.type === 'dismissed') {
          this.setState({
            show: false,
          });
        }
    }
    if (onChange) onChange(event, selectedDate);
  };

  onDoneIOS = () => {
    const { tempDate } = this.state;
    this.setState({
      date: tempDate,
      show: false,
      hidePlaceholder: true,
    });
  };

  renderDateTime = () => {
    const { date, show } = this.state;
    /**
     * IOS
     */
    const {
      textColor: textColorProp,
      mode: modeProp,
      language,
      theme,
      ...otherProps
    } = this.props;
    if (Platform.OS === 'ios') {
      const textColor = textColorProp || theme.colors.primaryText;
      const bgColor = theme.colors.primaryBackground;
      return (
        <Modal
          isVisible={show}
          onBackdropPress={() => this.setState({ show: false })}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
        >
          <QuickView
            backgroundColor={bgColor}
            style={{ minWidth: this.minWidth, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          >
            <QuickView row alignItems="center">
              <Button
                t="cancel"
                titleColor={Color.blue}
                width={120}
                fontSize={20}
                clear
                containerStyle={{ flex: 1 }}
                onPress={() => this.setState({ show: false })}
              />
              <Text fontSize={20}>{this.getDateTimePlaceholder()}</Text>
              <Button
                t="done"
                titleColor={Color.blue}
                width={120}
                fontSize={20}
                clear
                containerStyle={{ flex: 1, alignItems: 'flex-end' }}
                onPress={() => this.onDoneIOS()}
              />
            </QuickView>
            <Divider />
            <RNDateTimePicker
              locale={language}
              value={date}
              textColor={textColor}
              mode={modeProp}
              onChange={this.customOnChange}
              {...otherProps}
            />
          </QuickView>
        </Modal>
      );
    }

    /**
     * Android
     */
    if (modeProp === 'datetime') {
      return (
        <>
          <RNDateTimePicker
            locale={language}
            value={date}
            mode="time"
            onChange={this.addTimeAndroid}
            {...otherProps}
          />
          <RNDateTimePicker
            locale={language}
            value={date}
            mode="date"
            onChange={this.customOnChange}
            {...otherProps}
          />
        </>
      );
    }
    return (
      <RNDateTimePicker
        locale={language}
        value={date}
        mode={modeProp}
        onChange={this.customOnChange}
        {...otherProps}
      />
    );
  };

  customOnChangeIOS14 = (event: any, selectedDate: any) => {
    const { date } = this.state;
    const { onChange } = this.props;
    const currentDate = selectedDate || date;
    this.setState({
      date: currentDate,
      show: Platform.OS === 'ios',
      hidePlaceholder: true,
    });
    if (onChange) onChange(event, selectedDate);
  };

  renderDateTimeIOS14 = () => {
    const { date } = this.state;
    const {
      textColor: textColorProp,
      width,
      height,
      mode: modeProp,
      language,
      theme,
      ...otherProps
    } = this.props;
    const bgColor = theme.colors.secondaryBackground;
    const parentBgColor = theme.key === ThemeEnum.LIGHT ? '#b4bcc6' : '#494e53';
    return (
      <QuickView
        style={{
          minWidth: this.minWidth,
          borderRadius: AppView.roundedBorderRadius,
          backgroundColor: parentBgColor,
          width,
          height,
          marginVertical: 5
        }}
      >
        <RNDateTimePicker
          locale={language}
          value={date}
          style={{ backgroundColor: bgColor, marginHorizontal: 10, marginTop: 2 }}
          mode={modeProp}
          onChange={this.customOnChangeIOS14}
          {...otherProps}
        />
      </QuickView>
    );
  };

  getDate = () => {
    const { hidePlaceholder, date } = this.state;
    const { value } = this.props;
    if (!hidePlaceholder || !date) {
      if (value) return value;
      return null;
    }
    if (!hidePlaceholder) return null;
    return date;
  };

  getText = () => {
    const { hidePlaceholder, date } = this.state;
    const { value } = this.props;
    const { momentFormat: momentFormatProp } = this.props;
    const momentFormat = momentFormatProp || this.momentFormat;

    if (!hidePlaceholder || !date) {
      if (value) return moment(value).format(momentFormat);
      return null;
    }
    if (!hidePlaceholder) return null;
    return moment(date).format(momentFormat);
  };

  getDateTimePlaceholder = () => {
    const { mode } = this.props;
    const modeString = i18next.t(`component:date_time_picker:${mode}`);
    return i18next.t('component:date_time_picker:pick', { mode: modeString });
  };

  render() {
    const { show, date, hidePlaceholder } = this.state;
    const {
      mode,
      display,
      momentFormat: momentFormatProp,
      value,
      locale,
      minuteInterval,
      timeZoneOffsetInMinutes,
      textColor,
      onChange,
      neutralButtonLabel,
      placeholder: placeholderProp,
      titleColor: titleColorProp,
      placeholderTextColor,
      theme,
      ...otherProps
    } = this.props;

    /**
     * Language Handle
     */
    let placeholder = '';
    if (!value) {
      if (placeholderProp) {
        placeholder = placeholderProp;
      } else {
        placeholder = this.getDateTimePlaceholder();
      }
    }

    /**
     * Color Handle
     */
    let titleColor = titleColorProp;
    if (!hidePlaceholder && !value) {
      titleColor = placeholderTextColor || theme.colors.secondaryText;
    }

    /**
     * Time Handle
     */
    const momentFormat = momentFormatProp || this.momentFormat;
    const dateString = (hidePlaceholder || value) ? moment(date).format(momentFormat) : placeholder;

    /**
     * iOS 14.0
     */
    if (Platform.OS === 'ios' && Number.parseFloat(DeviceInfo.getSystemVersion()) >= 14 && display === 'default') {
      return this.renderDateTimeIOS14();
    }

    return (
      <QuickView>
        <Button
          {...otherProps}
          titlePaddingHorizontal={15}
          onPress={() => {
            this.setState({ show: !show, tempDate: date });
          }}
          title={dateString}
          titleColor={titleColor}
          titleCenter={show && Platform.OS === 'ios'}
        />
        {show && this.renderDateTime()}
      </QuickView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  language: languageSelector(state),
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(withTheme(
  DateTimePicker as any as React.ComponentType<DateTimePickerProps & ThemeProps<any>>
));
