import * as React from "react";
import {shallow, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player";

configure({
  adapter: new Adapter(),
});

it(`Audio player button click work correctly`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<AudioPlayer src={``} playButtonClickHandler={clickHandler} isPlaying={false} isLoading={false} ><audio /></AudioPlayer>);

  const startButton = app.find(`button`);
  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
