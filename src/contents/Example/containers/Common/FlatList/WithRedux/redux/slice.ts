/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit';
// import { REHYDRATE } from 'redux-persist';
import Redux from '@utils/redux';

/**
 * --- CONSTANT ---
 */
export const CONSTANT = {
  PARENT_NAME: '',
  NAME: 'product',
  PRODUCT_LIST: 'productList',
  PRODUCT_DETAIL: 'productDetail',
  PRODUCT_FILTER: 'productFilter',
};

export type TList = {
  productGetList: (state: any, action: any) => any;
  productGetListSuccess: (state: any, action: any) => any;
  productGetListFail: (state: any, action: any) => any;
};

export type TDetail = {
  productGetDetail: (state: any, action: any) => any;
  productGetDetailSuccess: (state: any, action: any) => any;
  productGetDetailFail: (state: any, action: any) => any;
};

export const INITIAL_STATE = ({
  ...Redux.createArrayInitialState(CONSTANT.PRODUCT_LIST),
  [CONSTANT.PRODUCT_FILTER]: {},
  ...Redux.createObjectInitialState(CONSTANT.PRODUCT_DETAIL),
});

/**
 * --- SLICE ---
 */
const slice = createSlice({
  name: CONSTANT.NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...Redux.createArrayReducer<TList>('productGetList', CONSTANT.PRODUCT_LIST),
    productSetFilter: (state, action) => { state[CONSTANT.PRODUCT_FILTER] = action.payload.filter; },
    ...Redux.createObjectReducer<TDetail>('productGetDetail', CONSTANT.PRODUCT_DETAIL),
  },
  // extraReducers: {
  //   [REHYDRATE]: (state, action) => {
  //     if (action.payload && action.payload.product) {
  //       const { list } = action.payload.product;
  //       INITIAL_STATE.list.data = list.data;
  //       return INITIAL_STATE;
  //     }
  //     return state;
  //   },
  // },
});

export const {
  productGetList, productGetListSuccess, productGetListFail, productSetFilter,
  productGetDetail, productGetDetailSuccess, productGetDetailFail
} = slice.actions;

export default slice.reducer;
