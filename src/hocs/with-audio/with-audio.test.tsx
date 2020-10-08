import * as React from "react";
import * as renderer from "react-test-renderer";
import withAudio from "./with-audio";

class MockComponent extends React.PureComponent {
  render() {
    const {children} = this.props;
    return <div>{children}</div>;
  }
}

const MockComponentWithAudio = withAudio(MockComponent);

it(`With audio correctly render`, () => {
  const tree = renderer
    .create(
      <MockComponentWithAudio src={``} playButtonClickHandler={jest.fn} isPlaying={false}/>, {
        createNodeMock() {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
