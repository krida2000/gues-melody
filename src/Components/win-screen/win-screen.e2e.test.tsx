import * as React from "react";
import {shallow, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import WinScreen from "./win-screen";

configure({
  adapter: new Adapter(),
});

it(`Win screen button click work correctly`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<WinScreen mistakes={2} maxMistakes={3} replayButtonClickHandler={clickHandler} steep={10}/>);

  const startButton = app.find(`button`);
  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
