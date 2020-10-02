import * as React from "react";
import {shallow, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import LoseScreen from "./lose-screen";

configure({
  adapter: new Adapter(),
});

it(`Lose screen button click work correctly`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<LoseScreen mistakes={3} maxMistakes={2} replayButtonClickHandler={clickHandler} />);

  const startButton = app.find(`button`);
  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
