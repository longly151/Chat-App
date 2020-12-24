import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
import Redux from '@utils/redux';

/**
 * --- CONSTANT ---
 */

export const PARENT_NAME = 'auth';
export const NAME = 'login';

type T = {
  login: (state: any, action: any) => any;
  loginSuccess: (state: any, action: any) => any;
  loginFail: (state: any, action: any) => any;
};

const INITIAL_STATE = Redux.createObjectInitialState();

/**
 * --- SLICE ---
 */
const slice = createSlice({
  name: NAME,
  initialState: INITIAL_STATE,
  reducers: {
    ...Redux.createObjectReducer<T>(NAME),
    logout: (state: any) => state,
  },
  extraReducers: {
    // Redux Persist (REHYDRATE)
    [REHYDRATE](state, action) {
      if (action.payload && action.payload.login) {
        // Only persist data (ignore loading & error)
        const { login } = action.payload;
        INITIAL_STATE.data = login.data;
        return {
          ...INITIAL_STATE,
          data: login.data,
        };
      }
      return state;
    },
  },
});

export const {
  login, loginSuccess, loginFail, logout,
} = slice.actions;

export default slice.reducer;
