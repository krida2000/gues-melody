import * as React from "react";
import * as renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen";
const noop = () => {
  // do nothing
};

it(`Welcome screen correctly render`, () => {
  const tree = renderer
    .create(
        <WelcomeScreen
          errorsCount={5}
          onWelcomeButtonClick={noop}
        />).toJSON();

  expect(tree).toMatchSnapshot();
});
