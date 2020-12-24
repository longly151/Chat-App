import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { requireLoginSelector } from '@contents/Config/redux/selector';
import { QuickView } from '@components';
import { TObjectRedux } from '@utils/redux';
import Selector from '@utils/selector';
import AuthButton, { AuthButtonProps } from '../../Shared/AuthButton';
import { logout } from '../redux/slice';
import { loginSelector } from '../redux/selector';

interface Props extends AuthButtonProps {
  reduxLogout?: () => any;
  requireLogin?: boolean;
  loginSelectorData: TObjectRedux;
}
class LoginButton extends PureComponent<Props> {
  static defaultProps = {
  };

  render() {
    const {
      reduxLogout,
      requireLogin,
      loginSelectorData: { data },
      ...otherProps
    } = this.props;
    const { token } = data;
    if (token) {
      return (
        <AuthButton
          {...otherProps}
          t="auth:logout"
          onPress={reduxLogout}
        />
      );
    } return <QuickView />;
  }
}

const mapStateToProps = (state: any) => ({
  requireLogin: requireLoginSelector(state),
  loginSelectorData: Selector.getObject(loginSelector, state),
});

const mapDispatchToProps = (dispatch: any) => ({
  reduxLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
