/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';
import { themeSelector } from '@contents/Config/redux/selector';
import Selector from '@utils/selector';
import AppHelper from '@utils/appHelper';
import HocHelper, { IHocConstant, IExtraItem, IReduxExtraItem, IHocLog } from '@utils/hocHelper';
import _ from 'lodash';
import Redux from '@utils/redux';

export interface WithReduxDetailProps {
  getDetail: (item: any) => any;
  themeName?: any;
}
interface State {}

const withReduxDetail = (
  { dispatchGetDetail, constant, extraData, reduxExtraData, mapStateToProps, mapDispatchToProps, log }:{
    dispatchGetDetail: any,
    constant: IHocConstant,
    extraData?: IExtraItem[],
    reduxExtraData?: IReduxExtraItem[],
    mapStateToProps?: (state: any) => any,
    mapDispatchToProps?: (dispatch: any) => any,
    log?: IHocLog
  }
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  // Selector
  const detailSelector: any = HocHelper.createObjectSelectorHOC(constant);

  // HOC Class
  class WithReduxDetail extends React.Component<P & WithReduxDetailProps, State> {
    constructor(props: any) {
      super(props);
      const state = {};

      // Merge State for ExtraData
      HocHelper.mergeStateForExtraData(state, extraData);

      this.state = state;
    }

    async componentDidMount() {
      const { getDetail } = this.props;
      const detailFromParams = AppHelper.getItemFromParams(this.props);
      getDetail(detailFromParams);

      // Fetch Data for ExtraData
      if (extraData && !_.isEmpty(extraData)) {
        await Promise.all(extraData.map(async (item: { key: string, url: string }) => {
          const result = await Redux.fetchDetail(this.props, item.url);
          this.setState({
            [item.key]: result
          });
        }));
      }

      // Trigger Fetch Action for ReduxExtraData
      await HocHelper.triggerActionForReduxExtraData(this.props, reduxExtraData);

      // [data & ExtraData] Log Events
      if (log) {
        if (log.payload && !log.payload.key) {
          await HocHelper.logScreenEvent(log, { data: detailFromParams });
        } else {
          await HocHelper.logScreenEvent(log, this.state);
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props as P} {...this.state} />;
    }
  }

  const customMapStateToProps = (state: any) => {
    let result: any = {
      themeName: themeSelector(state),
      ...Selector.getObject(detailSelector, state),
    };

    if (mapStateToProps) {
      result = {
        ...result,
        ...mapStateToProps(state),
      };
    }

    // Map State for ReduxExtraData
    result = HocHelper.mapStateForReduxExtraData(result, state, reduxExtraData);
    return result;
  };

  const customMapDispatchToProps = (dispatch: any) => {
    let result: any = {
      getDetail: (item: any) => dispatch(dispatchGetDetail(item)),
    };

    if (mapDispatchToProps) {
      result = {
        ...result,
        ...mapDispatchToProps(dispatch),
      };
    }

    // Map Dispatch for ReduxExtraData
    result = HocHelper.mapDispatchForReduxExtraData(result, dispatch, reduxExtraData);
    return result;
  };

  return connect(
    customMapStateToProps,
    customMapDispatchToProps
  )(WithReduxDetail as any);
};
export default withReduxDetail;
