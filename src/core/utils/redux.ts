import AppHelper from '@utils/appHelper';
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */

import _ from 'lodash';
import Config from 'react-native-config';
import qs from 'qs';
import i18next from 'i18next';
import Filter from './filter';
// eslint-disable-next-line import/no-cycle
import Api from './api';

/**
 * Type
 */
export const dataPrefix = 'data'; // Config it depend on current API

export type TError = {
  code: number;
  messages: Array<string>;
};

export type TMetadata = {
  count: number;
  total: number;
  page: number;
  pageCount: number;
};

export type TObjectRedux = {
  loading: boolean;
  data: any;
  error: null | TError;
};

export type TArrayRedux = {
  loading: boolean;
  data: any;
  metadata: any;
  error: null | TError;
};

export type TQuery = {
  fields?: Array<string>;
  page?: number;
  limit?: number;
  filter?: Filter;
};

/**
 * Interface
 */

export interface IBase {
  loading: boolean;
  data: any;
  metadata?: TMetadata;
  error: TError | null;
}

/**
 * Redux
 */
class CRedux {
  private static _instance: CRedux;

  private constructor() {
    // ...
  }

  public static get Instance(): CRedux {
    if (!this._instance) {
      this._instance = new this();
    }
    return CRedux._instance;
  }

  createObjectInitialState(key?: string) {
    const result: TObjectRedux = {
      loading: false,
      data: {},
      error: null,
    };
    if (key) {
      const parentResult: any = {};
      parentResult[`${key}Loading`] = result.loading;
      parentResult[`${key}Data`] = result.data;
      parentResult[`${key}Error`] = result.error;
      return parentResult;
    }
    return result;
  }

  createArrayInitialState(key?: string) {
    const result: TArrayRedux = {
      loading: false,
      data: [],
      metadata: {
        count: 10,
        total: 0,
        page: 1,
        pageCount: 1,
      },
      error: null,
    };
    if (key) {
      const parentResult: any = {};
      parentResult[`${key}Loading`] = result.loading;
      parentResult[`${key}Data`] = result.data;
      parentResult[`${key}Metadata`] = result.metadata;
      parentResult[`${key}Error`] = result.error;
      return parentResult;
    }
    return result;
  }

  createObjectReducer<T>(
    action: string,
    key?: string,
  ): T {
    const result: any = {};
    if (key) {
      result[`${action}`] = (state: any, action: any) => {
        state[`${key}Data`] = action.payload || {};
        state[`${key}Loading`] = true;
        state[`${key}Error`] = null;
      };
      result[`${action}Success`] = (state: any, action: any) => {
        const data = action.payload[dataPrefix];
        state[`${key}Data`] = data;
        state[`${key}Loading`] = false;
        state[`${key}Error`] = null;
      };
      result[`${action}Fail`] = (state: any, action: any) => {
        const error = action.payload;
        state[`${key}Loading`] = false;
        state[`${key}Error`] = error;
      };
    } else {
      result[`${action}`] = (state: any, action: any) => {
        state.data = action.payload || {};
        state.loading = true;
        state.error = null;
      };
      result[`${action}Success`] = (state: any, action: any) => {
        const data = action.payload;
        state.data = data;
        state.loading = false;
        state.error = null;
      };
      result[`${action}Fail`] = (state: any, action: any) => {
        const error = action.payload;

        // Modify Error Message
        // error.messages.push('Another Message');
        state.loading = false;
        state.error = error;
      };
    }
    return result;
  }

  createArrayReducer<T>(action: string, key?: string): T {
    const result: any = {};
    if (key) {
      result[action] = (state: any, action: any) => {
        state[`${key}Loading`] = true;
        state[`${key}Error`] = null;
      };
      result[`${action}Success`] = (state: any, action: any) => {
        const { metadata } = action.payload;
        const dataGet = action.payload[dataPrefix];
        let data = dataGet;

        if (metadata) {
          const currentPage = action.payload.metadata?.page;
          data = currentPage === 1 || !currentPage
            ? dataGet
            : state[`${key}Data`].concat(
              dataGet.filter(
                (item: any) => state[`${key}Data`].indexOf(item) < 0,
              ),
            );
        }
        state[`${key}Loading`] = false;
        state[`${key}Data`] = data;
        state[`${key}Metadata`] = metadata;
        state[`${key}Error`] = null;
      };
      result[`${action}Fail`] = (state: any, action: any) => {
        const error = action.payload;
        state[`${key}Loading`] = false;
        state[`${key}Error`] = error;
      };
    } else {
      result[action] = (state: any, action: any) => {
        state.loading = true;
        state.error = null;
      };
      result[`${action}Success`] = (state: any, action: any) => {
        const dataGet = action.payload[dataPrefix];
        const { metadata } = action.payload;
        let data = dataGet;
        if (metadata) {
          const currentPage = action.payload.metadata?.page;
          data = currentPage === 1
            ? dataGet
            : state.data.concat(
              dataGet.filter(
                (item: any) => state.data.indexOf(item) < 0,
              ),
            );
          state.data = data;
          state.metadata = metadata;
          state.error = null;
        }
        state.data = data;
        state.loading = false;
        state.metadata = metadata;
        state.error = null;
      };
      result[`${action}Fail`] = (state: any, action: any) => {
        const error = action.payload;

        // Modify Error Message
        // error.messages.push('Another Message');
        state.loading = false;
        state.error = error;
      };
    }
    return result;
  }

  stringifyQuery(query: TQuery) {
    let defaultLimit = parseInt(Config.PER_PAGE, 10);
    if (Number.isNaN(defaultLimit)) {
      defaultLimit = 10;
    }
    const limit = query?.limit ? query.limit : defaultLimit;
    const offset = query?.page && query.page >= 1 ? (query.page - 1) * limit : 0;
    let handledQuery: any = _.omit(query, ['page']);
    handledQuery.offset = offset;
    handledQuery.limit = limit;

    if (_.has(handledQuery, 'filter')) {
      handledQuery.filter = JSON.stringify(handledQuery.filter);
    }

    // Nestjs (replace "filter" by "s")
    handledQuery.s = handledQuery.filter;
    handledQuery = _.omit(handledQuery, 'filter');

    const stringifiedQuery = qs.stringify(handledQuery, {
      indices: false,
      strictNullHandling: true,
      arrayFormat: 'comma',
    });
    return stringifiedQuery;
  }

  initDetail(props: any) {
    return {
      loading: true,
      data: AppHelper.getItemFromParams(props),
      error: null,
    };
  }

  async fetchDetail(props: any, preApiUrl: string): Promise<{ loading: boolean, data: any, error: TError | null }> {
    const initialData = AppHelper.getItemFromParams(props);
    let apiUrl = preApiUrl;
    if (initialData) {
      apiUrl = preApiUrl.replace(':id', initialData.id);
    }
    try {
      const response = await Api.get(apiUrl);
      return {
        loading: false,
        data: response[dataPrefix],
        error: null,
      };
    } catch (error) {
      return {
        loading: false,
        data: [],
        error,
      };
    }
  }

  handleException(error: any) {
    const handledError: TError = {
      code: error.code,
      messages: [i18next.t(`exception:${error.code}`)],
    };
    return handledError;
  }
}
const Redux = CRedux.Instance;
export default Redux;
