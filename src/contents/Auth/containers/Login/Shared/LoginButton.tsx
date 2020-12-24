import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { requireLoginSelector } from '@contents/Config/redux/selector';
import { QuickView } from '@components';
import { NavigationService } from '@utils/navigation';
import Selector from '@utils/selector';
import AuthButton, { AuthButtonProps } from '../../Shared/AuthButton';
import authStack from '../../routes';
import { loginSelector } from '../redux/selector';

interface Props extends AuthButtonProps {
  requireLogin?: boolean;
  loginSelectorData: any;
}
class LoginButton extends PureComponent<Props> {
  static defaultProps = {
  };

  render() {
    const {
      requireLogin,
      loginSelectorData,
      ...otherProps
    } = this.props;
    if (!requireLogin && !loginSelectorData.data.token) {
      return (
        <QuickView>
          <AuthButton
            t="auth:login"
            {...otherProps}
            onPress={() => NavigationService.navigate(authStack.loginScreen)}
          />
        </QuickView>
      );
    }
    return <QuickView />;
  }
}

const mapStateToProps = (state: any) => ({
  requireLogin: requireLoginSelector(state),
  loginSelectorData: Selector.getObject(loginSelector, state),
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(LoginButton);
