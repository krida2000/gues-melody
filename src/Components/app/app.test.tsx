import * as React from "react";
import * as renderer from "react-test-renderer";
import {App} from "./app";
const noop = () => {
  // do nothing
};

it(`App screen correctly render`, () => {
  const tree = renderer
    .create(
      <App
        isAuthorizationRequired={false}
        mistakes={0}
        maxMistakes={0}
        onAuth={noop}
        onUserAnswer={noop}
        onWelcomeButtonClick={noop}
        questions={[]} resetGame={noop}
        step={-1}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
