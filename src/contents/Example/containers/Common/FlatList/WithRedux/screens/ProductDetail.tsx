import React, { Component } from 'react';
import {
  Container,
  Body,
  Text,
  ParallaxScrollView,
  QuickView,
  Image,
  Header,
  HTML,
  Loading,
  withReduxDetail,
} from '@components';
import { parallaxHeaderHeight } from '@themes/ThemeComponent/ParallaxScrollView';
import { IBase } from '@utils/redux';
import AppHelper from '@utils/appHelper';
import { WithDetailProps } from '@utils/hocHelper';
import { productGetDetail, CONSTANT } from '../redux/slice';

interface Props extends WithDetailProps, IBase {}
interface State extends IBase {}

class ProductDetailScreen extends Component<Props, State> {
  renderForeground = () => {
    const height = 80;
    const marginTop = parallaxHeaderHeight - height;
    const { themeName, data } = this.props;
    const theme = AppHelper.getThemeByName(themeName);
    return (
      <QuickView
        height={height}
        backgroundColor={theme.colors.primaryBackground}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        marginTop={marginTop}
      >
        <QuickView margin={20}>
          <Text type="header">{data.enTitle}</Text>
          <Text icon={{ name: 'map-marker' }} numberOfLines={1}>
            {data.viTitle}
          </Text>
        </QuickView>
      </QuickView>
    );
  };

  renderStickyHeader = () => {
    const { data } = this.props;
    return <Header title={data.name} />;
  };

  render() {
    const { loading, data } = this.props;
    // console.log('this.props.themeName', this.props.themeName);

    // // [Optional] ExtraData || ReduxExtraData
    // console.log('props.moreDetail', this.props.moreDetail);

    // // [Optional] mapStateToProps
    // console.log('this.props.language', this.props.language);

    // // [Optional] mapDispatchToProps
    // this.props.handleChangeLanguage('vi');

    return (
      <Container>
        <ParallaxScrollView
          backgroundImageSource={{ uri: data.thumbnail }}
          renderForeground={this.renderForeground}
          renderStickyHeader={this.renderStickyHeader}
        >
          <Body>
            <Image
              source={{
                uri: 'https://picsum.photos/1000/1000',
                cache: 'web',
              }}
              containerStyle={{ marginTop: 20 }}
            />
            {
              loading ? <Loading style={{ marginTop: 20 }} />
                : <HTML html={data.enContent} marginVertical={20} />
            }
          </Body>
        </ParallaxScrollView>
      </Container>
    );
  }
}

export default withReduxDetail({
  dispatchGetDetail: productGetDetail,
  constant: {
    PARENT_NAME: CONSTANT.PARENT_NAME,
    NAME: CONSTANT.NAME,
    KEY: CONSTANT.PRODUCT_DETAIL,
  },

  // // [LOG] Support data (pass from previous screen (no API call)) & ExtraData
  log: {
    name: 'PRODUCT_DETAIL_VIEW',
    // extraPayload: {
    //   extraPayload: 'extraPayload'
    // },
    payload: {
      // if key is undefined, Log will use "this.props.data" instead of "this.props[key].data"
      // key: 'moreDetail',
      fields: ['id']
    }
  },

  // // [Optional] extraData
  // extraData: [
  //   {
  //     key: 'moreDetail',
  //     url: '/services/:id'
  //   }
  // ]

  // // [Optional] reduxExtraData
  // reduxExtraData: [
  //   {
  //     key: 'moreDetail',
  //     dispatch: productGetDetail,
  //     constant: {
  //       PARENT_NAME: CONSTANT.PARENT_NAME,
  //       NAME: CONSTANT.NAME,
  //       KEY: CONSTANT.PRODUCT_DETAIL,
  //     }
  //   }
  // ]

  // // [Optional] mapStateToProps
  // mapStateToProps: (state: any) => ({
  //   language: languageSelector(state),
  // }),

  // // [Optional] mapDispatchToProps
  // mapDispatchToProps: (dispatch: any) => ({
  //   handleChangeLanguage: (data: string) => dispatch(changeLanguage(data)),
  // })
})(ProductDetailScreen);

// export default withPureDetail({
//   url: '/services/:id',
// })(ProductDetailScreen);
