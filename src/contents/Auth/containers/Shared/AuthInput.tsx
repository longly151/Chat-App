import React, { PureComponent } from 'react';
import { withTheme, ThemeProps } from 'react-native-elements';
import { InputProps } from '@components/Common/Input';
import { Input } from '@components';

export interface AuthInputProps extends InputProps{
  leftIconName?: string;
}

class AuthInput extends PureComponent<AuthInputProps> {
  static defaultProps = {
    backgroundColor: '#F1F8FE',
    color: '#727A8E',
    placeholderTextColor: '#727A8E',
    height: 50,
    center: true,
    textCenter: true,
    shadow: true,
    rightIconColor: '#315DF7',
  };

  input: any;

  getText = () => this.input.getText();

  focus = () => this.input.focus();

  render() {
    const { leftIconName, theme, ...otherProps } = this.props;
    const leftIcon = leftIconName ? {
      name: leftIconName, size: 22, color: '#315DF7', marginTop: 3,
    } : undefined;
    return (
      <Input
        ref={(ref: any) => { this.input = ref; }}
        {...otherProps}
        fontSize={18}
        leftIcon={leftIcon}
      />
    );
  }
}
export default withTheme(
  AuthInput as unknown as React.ComponentType<AuthInputProps & ThemeProps<any>>,
);
