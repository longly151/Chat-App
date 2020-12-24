import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { changeLanguage, LanguageEnum } from '@contents/Config/redux/slice';
import { languageSelector } from '@contents/Config/redux/selector';
import { compose } from 'recompose';
import Helper from '@utils/helper';
import Picker from '@components/Common/Picker';

interface Props{
  language: string;
  handleChangeLanguage: (language: string) => any;
}

interface State{
}

class PickerChangeLanguage extends PureComponent<Props, State> {
  render() {
    const { language, handleChangeLanguage } = this.props;
    return (
      <Picker
        labels={['English', 'Tiếng Việt']}
        values={Helper.enumToArray(LanguageEnum)}
        selectedValue={language}
        width={150}
        onValueChange={(itemValue: any) => handleChangeLanguage(itemValue)}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  language: languageSelector(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  handleChangeLanguage: (data: string) => dispatch(changeLanguage(data)),
});

const withReduce = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReduce,
)(PickerChangeLanguage as any);
