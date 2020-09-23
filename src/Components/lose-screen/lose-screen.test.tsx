import * as React from "react";
import * as renderer from "react-test-renderer";
import LoseScreen from "./lose-screen";
import {BrowserRouter} from "react-router-dom"
const noop = () => {
  // do nothing
};
describe(`Lose screen correctly render`, () => {
  it(`if you really loose`, () => {
    const tree = renderer
      .create(
        <LoseScreen
          maxMistakes={3}
          mistakes={4}
          replayButtonClickHandler={noop}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`if you don't loose`, () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <LoseScreen
            maxMistakes={3}
            mistakes={3}
            replayButtonClickHandler={noop}
          />
        </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
})
