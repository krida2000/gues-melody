import * as React from "react";
import * as renderer from "react-test-renderer";
import AuthorizationScreen from "./authorization-screen";
import {BrowserRouter} from "react-router-dom"
const noop = () => {
  // do nothing
};
describe(`Authorization screen correctly render`, () => {
  it(`if authorization required`, () => {
    const tree = renderer
      .create(
        <AuthorizationScreen
          isAuthorizationRequired={true}
          onAuthorization={noop}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`if authorization don't required`, () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <AuthorizationScreen
            isAuthorizationRequired={false}
            onAuthorization={noop}
          />
        </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
})
