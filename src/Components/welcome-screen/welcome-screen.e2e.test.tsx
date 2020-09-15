import * as React from "react";
import {shallow, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import WelcomeScreen from "./welcome-screen";

configure({
  adapter: new Adapter(),
});

it(`Welcome-screen button click work correctly`, () => {
  const clickHandler = jest.fn();
  const app = shallow(<WelcomeScreen errorsCount={0} onWelcomeButtonClick={clickHandler}/>);

  const startButton = app.find(`button`);
  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
