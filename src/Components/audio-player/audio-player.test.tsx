import * as React from "react";
import * as renderer from "react-test-renderer";
import AudioPlayer from "./audio-player";
const noop = () => {
  // do nothing
};

it(`Audion player screen correctly render`, () => {
  const tree = renderer
    .create(
      <AudioPlayer
        children={<div />}
        isLoading={true}
        isPlaying={false}
        playButtonClickHandler={noop}
        src={``}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
