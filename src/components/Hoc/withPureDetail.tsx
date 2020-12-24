import React from 'react';
import Redux from '@utils/redux';
import { connect } from 'react-redux';
import { themeSelector } from '@contents/Config/redux/selector';
import HocHelper, { IExtraItem, IReduxExtraItem, IHocLog } from '@utils/hocHelper';
import _ from 'lodash';

export interface WithPureDetailProps {
  themeName?: any;
}

const withPureDetail = (
  { url, extraData, reduxExtraData, mapStateToProps, mapDispatchToProps, log }: {
    url: string,
    extraData?: IExtraItem[],
    reduxExtraData?: IReduxExtraItem[],
    mapStateToProps?: (state: any) => any,
    mapDispatchToProps?: (dispatch: any) => any,
    log?: IHocLog
  }
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  class WithPureDetail extends React.Component<P & WithPureDetailProps, any> {
    constructor(props: any) {
      super(props);
      const state = Redux.initDetail(props);

      // Merge State for ExtraData
      HocHelper.mergeStateForExtraData(state, extraData);

      this.state = state;
    }

    async componentDidMount() {
      const result = await Redux.fetchDetail(this.props, url);
      this.setState(result);

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
        await HocHelper.logScreenEvent(log, this.state);
      }
    }

    render() {
      return <WrappedComponent {...this.props as P} {...this.state} />;
    }
  }

  const customMapStateToProps = (state: any) => {
    let result: any = {
      themeName: themeSelector(state)
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
    let result: any = {};

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
  )(WithPureDetail as any);
};
export default withPureDetail;
