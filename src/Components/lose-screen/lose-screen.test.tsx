import * as React from "react";
import * as renderer from "react-test-renderer";
import LoseScreen from "./lose-screen";
const noop = () => {
  // do nothing
};

it(`Lose screen screen correctly render`, () => {
  const tree = renderer
    .create(
      <LoseScreen
        maxMistakes={3}
        mistakes={4}
        replayButtonClickHandler={noop}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
