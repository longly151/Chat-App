/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import SocketIOClient from 'socket.io-client';
import Config from 'react-native-config';
import { Global } from '@utils/appHelper';

export class CSocketHelper {
  private static _instance: CSocketHelper;

  private constructor() {
    // ...
  }

  public static get Instance(): CSocketHelper {
    if (!this._instance) {
      this._instance = new this();
    }
    return CSocketHelper._instance;
  }

  onSocket = () => {
    /**
     * Socket
     */
    const { token } = Global;
    // if (!window.location) {
    //   // App is running in simulator
    //   window.navigator.userAgent = 'ReactNative';
    // }

    // This must be below your `window.navigator` hack above
    Global.socket = SocketIOClient(Config.SOCKET_URL, {
      transports: ['websocket'], // you need to explicitly tell it to use websockets
      query: { token }
    });
  };
}

const SocketHelper = CSocketHelper.Instance;
export default SocketHelper;
