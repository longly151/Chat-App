import React from 'react';
import {
  StyleSheet, NativeSyntheticEvent, TextInputFocusEventData,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  NameValidator,
  EmailValidator,
  PasswordValidator,
  PhoneNumberValidator,
  IDValidator,
  VerifiedEmailCodeValidator,
} from '@core/validators';

import {
  Input as ElementInput,
  InputProps as EInputProps,
  withTheme,
  ThemeProps,
} from 'react-native-elements';
import _ from 'lodash';
import { darkInput } from '@themes/ThemeComponent/Input';
import AppView from '@utils/appView';
import i18next from 'i18next';
import Button from '../Button/DefaultButton';
import Text, { TextProps } from '../Text';
import QuickView from '../View/QuickView';
import Picker, { PickerProps } from '../Picker';
import DateTimePicker, { DateTimePickerProps } from '../DateTimePicker';

enum EnumValidationField {
  name,
  email,
  password,
  rePassword,
  phone,
  affiliateCode,
  verifiedEmailCode,
  id,
  none,
}

export interface InputProps extends Omit<EInputProps, 'labelProps' | 'labelStyle'> {
  tLabel?: string | Array<any>;
  tPlaceholder?: string | Array<any>;
  tErrorMessage?: string | Array<any>;
  value?: string;
  validationField?: keyof typeof EnumValidationField;
  comparedValue?: string;
  nextFocus?: any;
  textCenter?: boolean;
  center?: boolean;
  width?: number | string;
  height?: number | string;
  fontSize?: number;
  borderColor?: string;
  borderBottomColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  backgroundColor?: string;
  color?: string;
  rightIconColor?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  type?: keyof typeof darkInput;
  shadow?: boolean;
  ref?: any;
  labelProps?: TextProps;
  showLabel?: boolean;
  showPlaceholder?: boolean;
  pickerProps?: PickerProps;
  dateTimePickerProps?: DateTimePickerProps | boolean;
  theme?: any;
}

interface State {
  value: string;
  isSecure: boolean;
  isValidated: boolean;
  triggerError: boolean;
  borderColor?: string;
  borderBottomColor?: string;
  marginBottom?: number;
}

const validateField = (
  enumValidationField: keyof typeof EnumValidationField,
  input: string, comparedInput: string,
) => {
  switch (enumValidationField) {
    case 'name':
      return NameValidator(input);
    case 'email':
      return EmailValidator(input);
    case 'password':
      return PasswordValidator(input);
    case 'rePassword':
      return input === comparedInput;
    case 'phone':
      return PhoneNumberValidator(input);
    case 'id':
      return IDValidator(input);
    case 'verifiedEmailCode':
      return VerifiedEmailCodeValidator(input);
    default:
      return true;
  }
};

class Input extends React.Component<InputProps, State> {
  static defaultProps = {
    type: 'rounded',
    width: '100%',
    height: 40,
    autoCorrect: false,
    autoCapitalize: 'none',
    validationField: 'none',
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 0,
    showLabel: false,
    showPlaceholder: true,
  };

  private input: any;

  constructor(props: InputProps) {
    super(props);
    const {
      borderColor,
      marginBottom,
      borderBottomColor,
    } = this.props;
    this.state = {
      value: props.value || '',
      isSecure: props.secureTextEntry || false,
      isValidated: true,
      triggerError: false,
      borderColor,
      borderBottomColor,
      marginBottom,
    };
  }

  getText = () => {
    const { pickerProps, dateTimePickerProps } = this.props;
    if (pickerProps || dateTimePickerProps) {
      return this.input.getText();
    }
    const { isValidated } = this.state;
    return isValidated ? this.input.props.value : null;
  };

  getDate = () => {
    const { dateTimePickerProps } = this.props;
    if (dateTimePickerProps) {
      return this.input.getDate();
    }
    return undefined;
  };

  getSelectedValue = () => {
    const { pickerProps } = this.props;
    if (pickerProps) {
      return this.input.getSelectedValue();
    }
    return undefined;
  };

  getSelectedIndex = () => {
    const { pickerProps } = this.props;
    if (pickerProps) {
      return this.input.getSelectedIndex();
    }
    return undefined;
  };

  focus = () => this.input.focus();

  blur = () => this.input.blur();

  private validateInput = () => {
    const { validationField, comparedValue } = this.props;
    const isValidated = validateField(
      validationField || 'none',
      this.input.props.value || '',
      comparedValue || '',
    );
    if (!isValidated) {
      this.setState({ triggerError: true });
    }
    this.setState({ isValidated });
    return isValidated;
  };

  onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const { theme } = this.props;
    const { colors } = theme;
    const isValidated = this.validateInput();
    const { validationField, onBlur: onBlurProp } = this.props;
    if (validationField !== 'none') {
      if (!isValidated) {
        this.input.shake();
        const { marginBottom } = this.state;
        const { marginBottom: marginBottomProp } = this.props;
        this.setState({ borderColor: colors.error, borderBottomColor: colors.error });
        if (marginBottomProp === marginBottom) {
          const newMarginBottom = (marginBottom || 0) + 25;
          this.setState({ marginBottom: newMarginBottom });
        }
      } else {
        const { marginBottom } = this.state;
        const { marginBottom: marginBottomProp } = this.props;
        this.setState({ borderColor: colors.success, borderBottomColor: colors.success });
        if (marginBottomProp !== marginBottom) {
          const newMarginBottom = (marginBottom || 0) - 25;
          this.setState({ marginBottom: newMarginBottom });
        }
      }
    }
    if (onBlurProp) onBlurProp(e);
  };

  onChangeText = (value: string) => {
    const { onChangeText: onChangeTextProp, validationField, theme } = this.props;
    const { colors } = theme;
    const { triggerError } = this.state;
    this.setState({ value });
    if (validationField !== 'none') {
      if (triggerError) {
        const { comparedValue } = this.props;
        const isValidated = validateField(
          validationField || 'none',
          value,
          comparedValue || '',
        );
        if (!isValidated) {
          const { marginBottom } = this.state;
          const { marginBottom: marginBottomProp } = this.props;
          this.setState({ borderColor: colors.error, borderBottomColor: colors.error });
          if (marginBottomProp === marginBottom) {
            const newMarginBottom = (marginBottom || 0) + 25;
            this.setState({ marginBottom: newMarginBottom });
          }
        } else {
          const { marginBottom } = this.state;
          const { marginBottom: marginBottomProp } = this.props;
          this.setState({ borderColor: colors.success, borderBottomColor: colors.success });
          if (marginBottomProp !== marginBottom) {
            const newMarginBottom = (marginBottom || 0) - 25;
            this.setState({ marginBottom: newMarginBottom });
          }
        }
        this.setState({ isValidated });
      }
      if (onChangeTextProp) onChangeTextProp(value);
    }
  };

  private onChangeSecureState = () => {
    this.setState((previousState) => ({
      isSecure: !previousState.isSecure,
    }));
  };

  private renderInput = () => {
    const {
      isSecure, isValidated, value, marginBottom, borderColor, borderBottomColor,
    } = this.state;
    const {
      margin,
      marginTop,
      marginLeft,
      marginRight,
      marginBottom: marginBottomProp,
      marginHorizontal,
      marginVertical,
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingHorizontal,
      paddingVertical,
      height,
      width,
      borderWidth,
      borderRadius,
      backgroundColor,
      containerStyle: containerStyleProp,
      inputContainerStyle: inputContainerStyleProp,
      inputStyle: inputStyleProp,
      errorStyle: errorStyleProp,
      leftIcon: leftIconProp,
      rightIcon: rightIconProp,
      rightIconContainerStyle: rightIconContainerStyleProp,
      leftIconContainerStyle: leftIconContainerStyleProp,
      color,
      fontSize,
      textCenter,
      center,
      placeholder: placeholderProp,
      label: labelProp,
      labelProps,
      showLabel,
      showPlaceholder,
      secureTextEntry,
      rightIconColor: rightIconColorProp,
      errorMessage: errorMessageProp,
      type,
      onBlur: onBlurProp,
      placeholderTextColor: placeholderTextColorProp,
      shadow,
      theme,
      pickerProps,
      dateTimePickerProps,
      tLabel,
      tPlaceholder,
      tErrorMessage,
      ...otherProps
    } = this.props;

    /**
     * Language Handle
     */
    let label: any = labelProp;
    if (!labelProp && tLabel) label = typeof tLabel === 'string' ? i18next.t(tLabel) : i18next.t(tLabel[0], tLabel[1]);

    let placeholder: any = placeholderProp;
    if (!placeholderProp && tPlaceholder) placeholder = typeof tPlaceholder === 'string' ? i18next.t(tPlaceholder) : i18next.t(tPlaceholder[0], tPlaceholder[1]);

    let errorMessage = errorMessageProp;
    if (!errorMessageProp && tErrorMessage) errorMessage = typeof tErrorMessage === 'string' ? i18next.t(tErrorMessage) : i18next.t(tErrorMessage[0], tErrorMessage[1]);

    if (!errorMessage) errorMessage = _.capitalize(_.trim(i18next.t('component:input:invalid', { field: label || placeholder || i18next.t('component:input:default_label') })));

    if (!showPlaceholder) placeholder = ' ';

    /**
     * containerStyle
     */
    const containerStyle: any = StyleSheet.flatten([
      marginBottom && { marginBottom },
      width && { width },
      height && { height },
      borderWidth && { borderWidth },
      borderColor && { borderColor },
      type && theme.Input[type].containerStyle,
      margin && { margin },
      marginTop && { marginTop },
      marginLeft && { marginLeft },
      marginRight && { marginRight },
      marginHorizontal && { marginHorizontal },
      marginVertical && { marginVertical },
      padding && { padding },
      paddingTop && { paddingTop },
      paddingBottom && { paddingBottom },
      paddingLeft && { paddingLeft },
      paddingRight && { paddingRight },
      paddingHorizontal && { paddingHorizontal },
      paddingVertical && { paddingVertical },
      borderRadius && { borderRadius },
      backgroundColor && { backgroundColor },
      center && { alignSelf: 'center' },
      shadow && { paddingBottom: 3 },
      shadow && AppView.shadow,
      containerStyleProp,
    ]);

    /**
     * inputContainerStyle, placeholderColor
     */
    const inputContainerStyle: any = StyleSheet.flatten([
      type && theme.Input[type].inputContainerStyle,
      {
        height,
      },
      borderBottomColor && { borderBottomColor },
      inputContainerStyleProp,
    ]);
    const placeholderTextColor = placeholderTextColorProp || theme.colors.secondaryText;

    /**
     * leftIcon
     */
    const defaultLeftIcon = {
      size: type && theme.Input[type].inputStyle.fontSize + 5,
      color: placeholderTextColor,
      type: 'material-community',
    };
    const leftIcon = leftIconProp ? _.merge(defaultLeftIcon, leftIconProp) : undefined;

    /**
     * leftIconContainerStyle
     */
    const leftIconContainerStyle: any = StyleSheet.flatten([
      { position: 'absolute', left: 0 },
      type && theme.Input[type].leftIconContainerStyle,
      leftIconContainerStyleProp,
    ]);

    /**
     * rightIcon
     */
    const rightIconColor = rightIconColorProp || placeholderTextColor;
    const defaultRightIcon = {
      size: type && theme.Input[type].inputStyle.fontSize + 5,
      color: rightIconColor,
      type: 'material-community',
    };
    const rightIcon = rightIconProp ? _.merge(defaultRightIcon, rightIconProp) : undefined;
    /**
     * rightIconContainerStyle
     */
    const rightIconContainerStyle: any = StyleSheet.flatten([
      { position: 'absolute', right: 0 },
      type && theme.Input[type].rightIconContainerStyle,
      rightIconContainerStyleProp,
    ]);

    /**
     * inputStyle
     */
    const inputStyle: any = StyleSheet.flatten([
      type && theme.Input[type].inputStyle,
      color && { color },
      fontSize && { fontSize },
      textCenter
        ? {
          paddingHorizontal:
              leftIconProp || rightIconProp ? defaultLeftIcon.size + 10 : 10,
        }
        : { paddingLeft: leftIconProp ? defaultLeftIcon.size + 10 : 10 },
      textCenter && { textAlign: 'center' },
      inputStyleProp,
    ]);

    /**
     * errorStyle
     */
    const errorStyle: any = StyleSheet.flatten([
      { textAlign: 'right' },
      type && theme.Input[type].errorStyle,
      errorStyleProp,
    ]);

    /**
     * Picker
     */
    if (pickerProps) {
      const PickerComponent: any = Picker;
      return (
        <PickerComponent
          {...pickerProps}
          ref={(ref: any) => { this.input = ref; }}
          width={width}
          height={height}
          backgroundColor={type && theme.Input[type].containerStyle.backgroundColor}
          titleColor={type && theme.Input[type].inputStyle.color}
          iconColor={placeholderTextColor}
          titleCenter={textCenter || false}
        />
      );
    }

    if (dateTimePickerProps) {
      const DateTimePickerComponent: any = DateTimePicker;
      return (
        <DateTimePickerComponent
          {...dateTimePickerProps}
          ref={(ref: any) => { this.input = ref; }}
          width={width}
          height={height}
          backgroundColor={type && theme.Input[type].containerStyle.backgroundColor}
          titleColor={type && theme.Input[type].inputStyle.color}
          iconColor={placeholderTextColor}
          titleCenter={textCenter || false}
        />
      );
    }

    return (
      <ElementInput
        {...otherProps}
        containerStyle={containerStyle}
        inputContainerStyle={inputContainerStyle}
        inputStyle={inputStyle}
        ref={(ref) => { this.input = ref; }}
        placeholder={
          !isValidated
            ? ''
            : placeholder
              || i18next.t('component:input:input', { field: label || i18next.t('component:input:default_label') })
        }
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={isSecure}
        value={value}
        errorMessage={
          !isValidated
            ? errorMessage
            : undefined
        }
        errorStyle={errorStyle}
        onChangeText={(text: string) => this.onChangeText(text)}
        onBlur={this.onBlur}
        leftIcon={leftIcon}
        rightIcon={
          secureTextEntry ? (
            <Button
              clear
              onPress={this.onChangeSecureState}
              icon={(
                <Icon
                  name={isSecure ? 'ios-eye' : 'ios-eye-off'}
                  size={(fontSize || 0) + 5}
                  color={rightIconColor}
                />
              )}
              marginTop={0}
              marginRight={-10}
            />
          ) : (
            rightIcon
          )
        }
        rightIconContainerStyle={rightIconContainerStyle}
        leftIconContainerStyle={leftIconContainerStyle}
      />
    );
  };

  render() {
    const { showLabel, label: labelProp, tLabel, labelProps } = this.props;
    let label = labelProp;
    if (!label && tLabel) label = typeof tLabel === 'string' ? i18next.t(tLabel) : i18next.t(tLabel[0], tLabel[1]);
    if (showLabel) {
      return (
        <QuickView>
          <Text marginBottom={5} {...labelProps}>
            {label}
          </Text>
          {this.renderInput()}
        </QuickView>
      );
    } return this.renderInput();
  }
}

// const mapStateToProps = (state: any) => ({
//   language: state,
// });

// export default compose(
//   withTheme,
//   withReduce,
// )(Input as unknown as React.ComponentType<InputProps & ThemeProps<any>>);

// export default connect(mapStateToProps, null, null,
//   { forwardRef: true })(Input as React.ComponentType<InputProps>);

// export default connect(mapStateToProps, null, null,
//   {
//     forwardRef: true,
//   })(withTheme(
//   Input as any as React.ComponentType<InputProps & ThemeProps<any>>
// ));

export default withTheme(
  Input as any as React.ComponentType<InputProps & ThemeProps<any>>
);
