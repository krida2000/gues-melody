import * as React from "react";
import {shallow, configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import AuthorizationScreen from "./authorization-screen";

configure({
  adapter: new Adapter(),
});

it(`Authorization screen button click work correctly`, () => {
  const clickHandler = jest.fn();
  const app = mount(<AuthorizationScreen isAuthorizationRequired={true} onAuthorization={clickHandler} />);

  // const loginInp = app.find(`input`).at(0);
  // const passInp = app.find(`input`).at(1);
  //
  // loginInp.simulate(`change`, { target: { value: `log` } });
  // passInp.simulate(`change`, { target: {value: `pass`} });
  //
  const startButton = app.find(`button`);
  startButton.simulate(`click`);
  //
  // expect(loginInp.prop('value')).toEqual(`log`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(clickHandler).toHaveBeenNthCalledWith(1, {login: ``, password: ``});
});


