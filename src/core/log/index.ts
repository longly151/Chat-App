import analytics from '@react-native-firebase/analytics';
import _ from 'lodash';
import LogEvent from './logEvent';

type TEvent = keyof typeof LogEvent;

class CLog {
  private static _instance: CLog;

  private constructor() {
    // ...
  }

  public static get Instance(): CLog {
    if (!this._instance) {
      this._instance = new this();
    }
    return CLog._instance;
  }

  log = async (eventName: TEvent, payload?: any) => {
    if (payload && !_.isEmpty(payload)) {
      // eslint-disable-next-line no-console
      console.log('[LOG]', LogEvent[eventName], ':', payload);

      await analytics().logEvent(LogEvent[eventName], payload);
    } else {
      // eslint-disable-next-line no-console
      console.log('[LOG]', LogEvent[eventName]);

      await analytics().logEvent(LogEvent[eventName]);
    }
  };
}

const Log = CLog.Instance;
export default Log;
