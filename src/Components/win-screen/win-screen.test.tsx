import * as React from "react";
import * as renderer from "react-test-renderer";
import WinScreen from "./win-screen";
const noop = () => {
  // do nothing
};

it(`Win screen correctly render`, () => {
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
