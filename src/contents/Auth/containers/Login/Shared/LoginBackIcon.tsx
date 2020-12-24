import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { requireLoginSelector } from '@contents/Config/redux/selector';
import { Icon } from 'react-native-elements';
import { NavigationService } from '@utils/navigation';
import { QuickView } from '@components';
import Color from '@themes/Color';

class LoginBackIcon extends PureComponent<any> {
  render() {
    const { requireLogin } = this.props;
    if (!requireLogin) {
      return (
        <Icon
          name="arrowleft"
          type="antdesign"
          color={Color.white}
          size={30}
          onPress={() => NavigationService.goBack()}
          containerStyle={{ position: 'absolute', top: 50, left: 20 }}
        />
      );
    }
    return <QuickView />;
  }
}

const mapStateToProps = (state: any) => ({
  requireLogin: requireLoginSelector(state),
});

export default connect(mapStateToProps, null)(LoginBackIcon);
