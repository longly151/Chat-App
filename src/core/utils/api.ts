/* eslint-disable import/no-cycle */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-throw-literal */
import Config from 'react-native-config';
import _ from 'lodash';
import qs from 'qs';
// eslint-disable-next-line import/no-cycle
import { TMetadata, dataPrefix } from './redux';
import AppHelper from './appHelper';

export const Global: any = global;

const checkIfErrorOccurs = (res: any) => ({
  code: res.status,
  res,
});

const TIME_OUT = 10000;

function extractMetadata(url: string, response: any) {
  const query: any = qs.parse(url.slice(url.lastIndexOf('?') + 1));
  if (!_.has(response, 'total')) return null;
  const metadata: TMetadata = {
    count: response[dataPrefix].length,
    total: response.total,
    page: 1,
    pageCount: 0,
  };
  let defaultLimit = parseInt(query.limit, 10);
  if (Number.isNaN(defaultLimit)) { defaultLimit = 10; }
  metadata.pageCount = _.ceil(_.divide(metadata.total, defaultLimit));
  if (query.offset && parseInt(query.offset, 10) !== 0) {
    let page = _.ceil(_.divide(parseInt(query.offset, 10) + 1, defaultLimit));
    if (page >= metadata.pageCount) page = metadata.pageCount;
    metadata.page = page;
  }

  return metadata;
}

async function xfetch(
  path: RequestInfo,
  headerOptions: RequestInit,
  ops = { noParse: false },
) {
  // Check Internet
  if (!AppHelper.isConnected) AppHelper.showNoConnectionMessage();

  const normalFetch = fetch(path, headerOptions);
  if (ops.noParse) {
    return timeoutPromise(TIME_OUT, normalFetch);
  }
  const res: any = await timeoutPromise(
    TIME_OUT,
    normalFetch.then(checkIfErrorOccurs),
  );

  if (res.code < 300) {
    if (res.code === 204) {
      return { success: true };
    }
    const { url } = res.res;
    const response = await res.res.json();
    const metadata = extractMetadata(url, response);
    if (metadata) response.metadata = metadata;
    return response;
  }
  try {
    const response = await res.res.json();
    const err = {
      code: res.code,
      message: response.message,
    };
    throw err;
  } catch (e) {
    if (res.code === 426) {
      const err = {
        code: res.code,
        message:
          'We have had some significant upgrades for the app. Please click below to upgrade your app!',
      };
      throw err;
    } else {
      const err = {
        code: res.code,
        message: e.message ? e.message : 'Something wrong. Please try again.',
      };
      throw err;
    }
  }
}

export const timeoutPromise = function timeoutPromise(ms: any, promise: any) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request time out! Please try again.'));
    }, ms);
    promise.then(
      (res: any) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err: any) => {
        clearTimeout(timeoutId);
        reject(err);
      },
    );
  });
};

function requestWrapper(method: string) {
  return async (_url: string, _data: any = null, _params: any = {}) => {
    let url = _url;
    let data = _data;
    let params = _params;
    const isFullUrl = _.startsWith(url, 'http');

    url = isFullUrl ? url : Config.API_URL + url;
    if (method === 'GET') {
      // is it a GET?
      // GET doesn't have data
      params = data;
      if (params !== null) {
        url = `${url}?${getQuerystring(params)}`;
      }
      data = null;
    } else if (data === Object(data)) {
      // (data === Object(data)) === _.isObject(data)
      data = JSON.stringify(data);
    }

    interface IRequest {
      method: string;
      headers: any;
      body: Object | null;
    }

    // default params for fetch = method + (Content-Type)
    const defaults: IRequest = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: null,
    };

    if (Global.token && !isFullUrl) {
      defaults.headers.Authorization = `Bearer ${Global.token}`;
    }
    if (data) {
      defaults.body = data;
    }

    const paramsObj = {
      ...defaults,
      headers: { ...params, ...defaults.headers },
    };
    console.log('url: ', url);

    return xfetch(url, paramsObj);
  };
}

function getQuerystring(params: any) {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map((k) => `${esc(k)}=${esc(params[k])}`)
    .join('&');
}

class CApi {
  private static _instance: CApi;

  private constructor() {
    // ...
  }

  public static get Instance(): CApi {
    if (!this._instance) {
      this._instance = new this();
    }
    return CApi._instance;
  }

  get = requestWrapper('GET');

  post = requestWrapper('POST');

  put = requestWrapper('PUT');

  patch = requestWrapper('PATCH');

  del = requestWrapper('DELETE');
}
const Api = CApi.Instance;
export default Api;
