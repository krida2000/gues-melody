import * as React from "react";
import * as renderer from "react-test-renderer";
import Mistakes from "./mistakes";
const noop = () => {
  // do nothing
};

it(`Win screen correctly render`, () => {
  const tree = renderer
    .create(
      <Mistakes
        errorsCount={1}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
