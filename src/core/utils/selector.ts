/* eslint-disable class-methods-use-this */
import { createSelector, OutputSelector } from 'reselect';
import { TObjectRedux, TArrayRedux } from './redux';

/**
 * Type
 */
type TObjectSelector = {
  loading: OutputSelector<unknown, any, (res: any) => any>;
  data: OutputSelector<unknown, any, (res: any) => any>;
  error: OutputSelector<unknown, any, (res: any) => any>;
};

type TArraySelector = {
  loading: OutputSelector<unknown, any, (res: any) => any>;
  data: OutputSelector<unknown, any, (res: any) => any>;
  metadata: OutputSelector<unknown, any, (res: any) => any>;
  error: OutputSelector<unknown, any, (res: any) => any>;
};

/**
 * Selector
 */

class CSelector {
  private static _instance: CSelector;

  private constructor() {
    // ...
  }

  public static get Instance(): CSelector {
    if (!this._instance) {
      this._instance = new this();
    }
    return CSelector._instance;
  }

  getSelector(root: any, field: string) {
    return createSelector(
      root,
      (data: any) => data[field],
    );
  }

  createObjectSelector(root: any, key?: string): TObjectSelector {
    if (key) {
      return ({
        loading: this.getSelector(root, `${key}Loading`),
        data: this.getSelector(root, `${key}Data`),
        error: this.getSelector(root, `${key}Error`),
      });
    }
    return ({
      loading: this.getSelector(root, 'loading'),
      data: this.getSelector(root, 'data'),
      error: this.getSelector(root, 'error'),
    });
  }

  createArraySelector(root: any, key?: string): TArraySelector {
    if (key) {
      return ({
        loading: this.getSelector(root, `${key}Loading`),
        data: this.getSelector(root, `${key}Data`),
        metadata: this.getSelector(root, `${key}Metadata`),
        error: this.getSelector(root, `${key}Error`),
      });
    }
    return ({
      loading: this.getSelector(root, 'loading'),
      data: this.getSelector(root, 'data'),
      metadata: this.getSelector(root, 'metadata'),
      error: this.getSelector(root, 'error'),
    });
  }

  getObject(selector: TObjectSelector, state: any): TObjectRedux {
    return ({
      loading: selector.loading(state),
      data: selector.data(state),
      error: selector.error(state),
    });
  }

  getArray(selector: TArraySelector, state: any): TArrayRedux {
    return ({
      loading: selector.loading(state),
      data: selector.data(state),
      metadata: selector.metadata(state),
      error: selector.error(state),
    });
  }
}

const Selector = CSelector.Instance;
export default Selector;
