import {reducer, Operation, ActionCreator, ActionType, initialState} from "./user";

import {createAPI} from "../../api";
import MockAdapter from "axios-mock-adapter";

describe(`Reducer work correctly`, () => {
  it(`Reducer without parameters will return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer correctly set isAuthorizationRequired`, () => {
    expect(reducer(undefined, {
      type: ActionType.UPDATE_AUTHORIZATION,
      payload: true,
    })).toEqual({
      isAuthorizationRequired: true,
    });

    expect(reducer({
      isAuthorizationRequired: `some data`
    }, {
      type: ActionType.UPDATE_AUTHORIZATION,
      payload: true,
    })).toEqual({
      isAuthorizationRequired: true,
    });
  });
});

it(`Action creator work correctly`, () => {
  expect(ActionCreator.setAuthorization(true))
    .toEqual({
      type: ActionType.UPDATE_AUTHORIZATION,
      payload: true,
    });
});

describe(`Operation work correctly`, () => {
  const onUnauthorized = jest.fn();

  const api = createAPI(onUnauthorized);
  const mockApi = new MockAdapter(api);

  it(`Operation make a correct GET to /login with authorized status`, () => {
    mockApi
      .onGet(`/login`)
      .reply(200);

    const dispatch = jest.fn();

    return Operation.checkAuthorization()(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_AUTHORIZATION,
          payload: false,
        });
      });
  });

  it(`Operation make a correct GET to /login with unauthorized status`, () => {
    mockApi
      .onGet(`/login`)
      .reply(401);

    const dispatch = jest.fn();

    return Operation.checkAuthorization()(dispatch, () => {}, api)
      .catch(() => {
        expect(onUnauthorized).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_AUTHORIZATION,
          payload: true,
        });
      });
  });

  it(`Operation make a correct POST to /login`, () => {
    mockApi
      .onPost(`/login`)
      .reply(200);

    const dispatch = jest.fn();

    return Operation.login({
      email: `test@mail`,
      password: `test password`}
    )(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_AUTHORIZATION,
          payload: false,
        });
      });
  });
});
