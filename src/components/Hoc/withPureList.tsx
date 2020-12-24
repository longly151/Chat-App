/* eslint-disable max-len */
import React from 'react';
import Redux, { TQuery, dataPrefix } from '@utils/redux';
import AppHelper from '@utils/appHelper';
import Filter from '@utils/filter';
import Api from '@utils/api';
import { connect } from 'react-redux';
import { themeSelector } from '@contents/Config/redux/selector';
import _ from 'lodash';
import HocHelper, { IReduxExtraItem, IExtraItem, IHocLog, IHocFlatListProps } from '@utils/hocHelper';
import FlatList from '../Common/FlatList/DefaultFlatList';

export interface WithPureListProps {
  themeName: any;
}

// function getDisplayName(WrappedComponent: React.ComponentType) {
//   return WrappedComponent.displayName || WrappedComponent.name || 'Component';
// };

const withPureList = (
  { url, fields, renderItem, extraData, reduxExtraData, mapStateToProps, mapDispatchToProps, log }: {
    url: string,
    fields?: Array<string>,
    renderItem?: ({ item, index }: {item: any, index: number}, renderItemProps: any) => any,
    extraData?: IExtraItem[],
    reduxExtraData?: IReduxExtraItem[],
    mapStateToProps?: (state: any) => any,
    mapDispatchToProps?: (dispatch: any) => any,
    log?: IHocLog
  }
) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  class WithPureList extends React.Component<P & WithPureListProps, any> {
    flatList: any;

    filter: Filter;

    constructor(props: any) {
      super(props);
      const state: any = {
        loading: true,
        data: [],
        metadata: {
          count: 10,
          total: 0,
          page: 1,
          pageCount: 1,
        },
        error: null,
      };

      // Merge State for ExtraData
      HocHelper.mergeStateForExtraData(state, extraData);

      this.state = state;
      this.filter = new Filter();
    }

    async componentDidMount() {
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

      // [ExtraData] Log Events
      if (log) {
        await HocHelper.logScreenEvent(log, this.state);
      }
    }

    fetch = (queryString: string): any => Api.get(`${url}?${queryString}`);

    applyFilter = () => {
      this.flatList.handleRefresh();
    };

    getList = async (query: TQuery) => {
      const { data: dataState } = this.state;
      try {
        this.setState({ loading: true });
        const response = await this.fetch(Redux.stringifyQuery(query));
        const { metadata } = response;
        const dataGet = response[dataPrefix];
        let data = dataGet;
        if (metadata) {
          const currentPage = response.metadata?.page;
          data = currentPage === 1 || !currentPage
            ? dataGet
            : dataState.concat(
              dataGet.filter(
                (item: any) => dataState.indexOf(item) < 0,
              ),
            );
        }
        this.setState({
          loading: false,
          data,
          metadata,
          error: null,
        });
        return true;
      } catch (error) {
        const handledError = AppHelper.handleException(error);
        this.setState({
          loading: false,
          error: handledError,
        });
        return false;
      }
    };

    // isAllFetched = () => {
    //   const propsAny: any = this.props;
    //   if (!reduxExtraData || _.isEmpty(reduxExtraData)) return false;

    //   return !reduxExtraData.some((e: IReduxExtraItem) => {
    //     if (!propsAny[e.key]?.data || _.isEmpty(propsAny[e.key].data)) return true;
    //   });
    // };
    renderFlatList = (flatListProps?: IHocFlatListProps) => {
      const { loading, data, metadata, error } = this.state;
      const { themeName } = this.props;
      const list = {
        data,
        metadata,
        loading,
        error,
      };
      const defaultRenderItemProps = {
        theme: AppHelper.getThemeByName(themeName)
      };
      const renderItemPropsProp = flatListProps?.renderItemProps;
      const renderItemProps = {
        ...defaultRenderItemProps,
        ...renderItemPropsProp,
      };

      if (renderItem) {
        return (
          <FlatList
            ref={(ref: any) => { this.flatList = ref; }}
            {...flatListProps}
            list={list}
            getList={(query?: TQuery) => {
              this.getList({ ...query, fields, filter: this.filter?.filterObject });
            }}
            renderItem={(data) => renderItem(data, renderItemProps)}
          />
        );
      }
      return null;
    };

    render() {
      if (WrappedComponent) {
        return (
          <WrappedComponent
            {...this.props as P}
            {...this.state}
            filter={this.filter}
            applyFilter={this.applyFilter}
            renderFlatList={this.renderFlatList}
            getList={(query?: TQuery) => {
              this.getList({ ...query, fields, filter: this.filter?.filterObject });
            }}
          />
        );
      }
      return null;
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
  )(WithPureList as any);
};
export default withPureList;
