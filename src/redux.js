// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import multi from 'redux-multi';
import createDebug from 'debug';
import reducer from './reducer';

export type Store = {dispatch: Function, subscribe: Function, getState: Function};
export type ReduxResult = {store: Store, boundActions: Object};

const debug = createDebug('redux');

export default function createRedux(
  initialState: any,
  actions: Object,
  onChange: ?Function,
): ReduxResult {
  let lastState = initialState;
  const middleware = applyMiddleware(multi, promise, thunk);
  const store: Store = createStore(reducer, initialState, middleware);
  const boundActions = {};

  Object.keys(actions).forEach(name => {
    boundActions[name] = (...args) => {
      debug(`bound action call ${name}`);
      const action = actions[name](...args);
      if (action) {
        debug(`dispatch action ${name}`);
        store.dispatch(action);
      }
    };
  });

  store.subscribe(() => {
    const state = store.getState();
    if (state !== lastState) {
      lastState = state;
      if (onChange) onChange(state, boundActions);
    }
  });

  return { store, boundActions };
}
