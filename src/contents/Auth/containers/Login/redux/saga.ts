import {
  put, call, takeLatest, select,
} from 'redux-saga/effects';
import { Global } from '@utils/appHelper';
import AsyncStorage from '@react-native-community/async-storage';
import { requireLoginSelector } from '@contents/Config/redux/selector';
import { NavigationService } from '@utils/navigation';
import exampleStack from '@contents/Example/routes';
import Redux from '@utils/redux';
import SocketHelper from '@core/plugin/socket';
import {
  loginSuccess, loginFail, login, logout,
} from './slice';
import { realtorLoginApi } from './api';

export function* realtorLoginSaga({ payload }: { payload: any }) {
  try {
    const response = yield call(realtorLoginApi, payload.data);
    const { data } = response;
    Global.token = data.token;

    /**
     * Socket
     */
    SocketHelper.onSocket();

    yield put(loginSuccess(data));
    const requiredLogin = yield select((state) => requireLoginSelector(state));
    if (!requiredLogin) {
      NavigationService.goBack();
    }
    return true;
  } catch (error) {
    yield put(loginFail(Redux.handleException(error)));
    return false;
  }
}

async function removeAsyncStorageData() {
  await AsyncStorage.removeItem('persist:auth');
  await AsyncStorage.removeItem('persist:root');
  return true;
}

export function* realtorLogoutSaga() {
  try {
    // Check Result
    // const before = yield call(viewAsyncStorageData);
    // console.log('before remove', before);
    // yield call(removeAsyncStorageData);
    // const after = yield call(viewAsyncStorageData);
    // console.log('after remove', after);

    yield call(removeAsyncStorageData);
    yield put({ type: 'RESET_REDUX' });
    const requiredLogin = yield select((state) => requireLoginSelector(state));
    if (!requiredLogin) {
      yield call(NavigationService.navigate, exampleStack.exampleList);
    }
    return true;
  } catch (error) {
    return false;
  }
}

export default [
  takeLatest(login, realtorLoginSaga),
  takeLatest(logout, realtorLogoutSaga),
];
