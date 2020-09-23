import * as React from "react";
import * as renderer from "react-test-renderer";
import Mistakes from "./mistakes";
const noop = () => {
  // do nothing
};
describe(`Mistakes screen correctly render`, () => {
  it(`With 1 error`, () => {
    const tree = renderer
      .create(
        <Mistakes
          errorsCount={1}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With 0 error`, () => {
    const tree = renderer
      .create(
        <Mistakes
          errorsCount={0}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
})
