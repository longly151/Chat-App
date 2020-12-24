/* eslint-disable max-len */
import React from 'react';
import Redux, { TQuery, IBase } from '@utils/redux';
import Filter from '@utils/filter';
import { connect } from 'react-redux';
import { themeSelector } from '@contents/Config/redux/selector';
import { ThemeEnum } from '@contents/Config/redux/slice';
import Selector from '@utils/selector';
import HocHelper, { IHocConstant, IExtraItem, IReduxExtraItem, IHocLog, IHocFlatListProps } from '@utils/hocHelper';
import _ from 'lodash';
import AppHelper from '@utils/appHelper';
import FlatList from '../Common/FlatList/DefaultFlatList';

export interface WithReduxListProps extends IBase {
  getList: (query?: TQuery) => any;
  filterData: any,
  setFilter: (filter: any) => any;
  themeName?: ThemeEnum;
}

interface State {
}

const withReduxList = (
  { dispatchGetList, dispatchFilter, constant, fields, renderItem, extraData, reduxExtraData, mapStateToProps, mapDispatchToProps, log }: {
    dispatchGetList: any,
    dispatchFilter?: any,
    constant: IHocConstant,
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
  // Selector
  const arraySelector = HocHelper.createArraySelectorHOC(constant);
  const { listSelector } = arraySelector;
  const { filterSelector } = arraySelector;

  // HOC Class
  class WithReduxList extends React.Component<P & WithReduxListProps, State> {
    flatList: any;

    filter: Filter;

    constructor(props: any) {
      super(props);
      const { filterData } = this.props;
      const state = {};

      // Merge State for ExtraData
      HocHelper.mergeStateForExtraData(state, extraData);

      this.state = state;

      this.filter = new Filter(filterData);
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

    applyFilter = () => {
      const { setFilter } = this.props;
      this.flatList.handleRefresh();
      setFilter(this.filter.filterObject);
    };

    renderFlatList = (flatListProps?: IHocFlatListProps) => {
      const { data, metadata, loading, error, getList, themeName } = this.props;
      const defaultRenderItemProps = {
        theme: AppHelper.getThemeByName(themeName)
      };
      const renderItemPropsProp = flatListProps?.renderItemProps;
      const renderItemProps = {
        ...defaultRenderItemProps,
        ...renderItemPropsProp,
      };
      const list = {
        data,
        metadata,
        loading,
        error,
      };
      if (renderItem) {
        return (
          <FlatList
            ref={(ref: any) => { this.flatList = ref; }}
            {...flatListProps}
            list={list}
            getList={(query?: TQuery) => {
              getList({ ...query, fields, filter: this.filter?.filterObject });
            }}
            renderItem={(data) => renderItem(data, renderItemProps)}
          />
        );
      }
      return null;
    };

    render() {
      const { themeName } = this.props;
      const { getList } = this.props;
      if (WrappedComponent) {
        return (
          <WrappedComponent
            {...this.props as P}
            {...this.state}
            filter={this.filter}
            applyFilter={this.applyFilter}
            renderFlatList={this.renderFlatList}
            getList={(query?: TQuery) => {
              getList({ ...query, fields, filter: this.filter?.filterObject });
            }}
            themeName={themeName}
          />
        );
      }
      return null;
    }
  }

  const customMapStateToProps = (state: any) => {
    let result: any = {
      themeName: themeSelector(state),
      filterData: filterSelector ? filterSelector(state) : {},
      ...Selector.getArray(listSelector, state),
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
      getList: (query?: TQuery) => dispatch(dispatchGetList({ query })),
      setFilter: (filter: any) => dispatch(dispatchFilter({ filter })),
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
  )(WithReduxList as any);
};
export default withReduxList;
