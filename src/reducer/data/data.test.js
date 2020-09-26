import {reducer, Operation, ActionCreator, ActionType} from "./data";

import {createAPI} from "../../api";
import MockAdapter from "axios-mock-adapter";

const api = createAPI(() => {});

describe(`Reducer work correctly`, () => {
  it(`Reducer without parameters return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      questions: [],
    });
  });

  it(`Reducer will write payload to questions`, () => {
    expect(reducer(undefined, {
      type: ActionType.LOAD_QUESTION,
      payload: [`fake data`],
    })).toEqual({
      questions: [`fake data`],
    });

    expect(reducer({
      questions: [`current questions`]
    }, {
      type: ActionType.LOAD_QUESTION,
      payload: [`fake data`],
    })).toEqual({
      questions: [`fake data`],
    });
  });
});

it(`Action creator work correctly`, () => {
  expect(ActionCreator.loadQuestions([`fake data`]))
    .toEqual({
      type: ActionType.LOAD_QUESTION,
      payload: [`fake data`],
    });
});

describe(`Operation work correctly`, () => {
  it(`Operation make a correct call to /questions`, () => {
    const mockApi = new MockAdapter(api);
    const dispatch = jest.fn();

    mockApi
      .onGet(`/questions`)
      .reply(200, [`fake data`]);

    return Operation.loadQuestions()(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_QUESTION,
          payload: [`fake data`],
        });
      });
  });
});
