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

  const loginInp = app.find(`input`).at(0);
  const passInp = app.find(`input`).at(1);


  loginInp.instance().value = `log`;
  passInp.instance().value = `pass`;
  // loginInp.value = `log`;
  // loginInp.simulate(`change`, { target: {id: `login`, name: 'login', value: 'log' } });
  // passInp.simulate(`change`, { target: {id: `password`, name: `password`, value: `pass` }});
  //
  // app.update();

  const startButton = app.find(`button`);
  startButton.simulate(`click`);

  // expect(loginInp.prop('value')).toEqual(`log`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
  expect(clickHandler).toHaveBeenNthCalledWith(1, {login: `log`, password: `pass`});
});


