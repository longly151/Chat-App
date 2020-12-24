import React, { PureComponent } from 'react';
import { StatusBar } from '@components';
import AppHelper from '@utils/appHelper';

interface Props{
  handleSwitchTheme: () => any;
  handleChangeLanguage: (data: string) => any;
}

interface State{
}

class DefaultModal extends PureComponent<Props, State> {
  render() {
    const id = AppHelper.getIdFromParams(this.props);
    const Component = AppHelper.getModalFromGlobal(id);

    return (
      <>
        <StatusBar barStyle="light-content" />
        {Component.content}
      </>
    );
  }
}

// const mapStateToProps = (state: any) => ({
//   language: languageSelector(state),
//   reduxTheme: themeSelector(state),
// });

// const mapDispatchToProps = (dispatch: any) => ({
//   handleChangeLanguage: (data: string) => dispatch(changeLanguage(data)),
//   handleSwitchTheme: () => dispatch(switchTheme()),
// });

// const withReduce = connect(mapStateToProps, mapDispatchToProps);

// export default compose(
//   withTheme,
//   withReduce,
//   withTranslation(),
// )(DefaultModal as any);

export default DefaultModal;
