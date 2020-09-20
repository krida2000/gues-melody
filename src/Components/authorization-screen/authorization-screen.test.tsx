import * as React from "react";
import * as renderer from "react-test-renderer";
import AuthorizationScreen from "./authorization-screen";
const noop = () => {
  // do nothing
};

it(`Authorization screen correctly render`, () => {
  const tree = renderer
    .create(
      <AuthorizationScreen
        isAuthorizationRequired={true}
        onAuthorization={noop}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
