import * as React from "react";
import {shallow, configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen";
import {genreQuestion} from "../../types";

configure({
  adapter: new Adapter(),
});

const question : genreQuestion = {
  type: `genre`,
  genre: `right genre`,
  answers: [
    {
      src: `src 1`,
      genre: `wrong genre`,
    },
    {
      src: `src 2`,
      genre: `wrong genre`,
    },
    {
      src: `src 3`,
      genre: `right genre`,
    },
    {
      src: `src 4`,
      genre: `right genre`,
    },
  ]};

describe(`Genre question screen work correctly`, () => {
  const onAnswerMock = jest.fn();
  const renderPlayerMock = jest.fn();
  const onChangeMock = jest.fn();

  const component = mount(<GenreQuestionScreen
    question={question}
    onAnswer={onAnswerMock}
    renderPlayer={renderPlayerMock}
    mistakes={2}
    onChange={onChangeMock} />);

  it(`Render player function have called four time`, () => {
    expect(renderPlayerMock).toHaveBeenCalledTimes(4);
    expect(renderPlayerMock).toHaveBeenNthCalledWith(1, `src 1`, 0);
    expect(renderPlayerMock).toHaveBeenNthCalledWith(2, `src 2`, 1);
    expect(renderPlayerMock).toHaveBeenNthCalledWith(3, `src 3`, 2);
    expect(renderPlayerMock).toHaveBeenNthCalledWith(4, `src 4`, 3);
  });

  it(`On change function calling with right arguments`, () => {
    component.find(`input[type='checkbox']`).at(0).simulate(`change`, { target: { checked: true } });
    component.find(`input[type='checkbox']`).at(2).simulate(`change`, { target: { checked: true } });
    component.find(`input[type='checkbox']`).at(1).simulate(`change`, { target: { checked: true } });
    component.find(`input[type='checkbox']`).at(1).simulate(`change`, { target: { checked: false } });

    expect(onChangeMock).toHaveBeenCalledTimes(4);
    expect(onChangeMock).toHaveBeenNthCalledWith(1, 0, true);
    expect(onChangeMock).toHaveBeenNthCalledWith(2, 2, true);
    expect(onChangeMock).toHaveBeenNthCalledWith(3, 1, true);
    expect(onChangeMock).toHaveBeenNthCalledWith(4, 1, false);
  });

  it(`Checkboxes have right checked statuses`, () => {
    expect(
      component.find(`input`).map((it) => it.prop(`checked`))
    ).toEqual([true, false, true, false]);
  });

  it(`On answer function have called one time`, () => {
    component.find(`form`).simulate(`submit`);

    expect(onAnswerMock).toHaveBeenCalledTimes(1);
  });
});


