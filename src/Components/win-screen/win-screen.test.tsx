import * as React from "react";
import * as renderer from "react-test-renderer";
import WinScreen from "./win-screen";
import {BrowserRouter} from "react-router-dom"
const noop = () => {
  // do nothing
};

describe(`Win screen correctly render`, () => {
  it(`if you really win`, () => {
    const tree = renderer
      .create(
        <WinScreen
          mistakes={0}
          maxMistakes={0}
          steep={10}
          replayButtonClickHandler={noop}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`if you don't win`, () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <WinScreen
            mistakes={0}
            maxMistakes={0}
            steep={5}
            replayButtonClickHandler={noop}
          />
        </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
})
