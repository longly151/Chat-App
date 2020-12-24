import React, { PureComponent } from 'react';
import { NavigationService } from '@utils/navigation';
import AuthButton, { AuthButtonProps } from '../../Shared/AuthButton';
import authStack from '../../routes';

interface Props extends AuthButtonProps {
}
class RegisterButton extends PureComponent<Props> {
  static defaultProps = {
  };

  render() {
    const {
      ...otherProps
    } = this.props;
    return (
      <AuthButton
        t="auth:register"
        {...otherProps}
        onPress={() => NavigationService.navigate(authStack.registerStack)}
      />
    );
  }
}

export default RegisterButton;
