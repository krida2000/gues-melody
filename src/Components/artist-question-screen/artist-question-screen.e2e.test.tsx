import * as React from "react";
import {shallow, configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import ArtistQuestionScreen from "./artist-question-screen";
import {artistQuestion} from "../../types";
import {FIRST_PLAYER_ID} from "./artist-question-screen";

configure({
  adapter: new Adapter(),
});

const question : artistQuestion = {
  type: `artist`,
  song: {
    artist: `first artist`,
    src: `some src`
  },
  answers: [
    {
      picture: `picture 1`,
      artist: `first artist`,
    },
    {
      picture: `picture 2`,
      artist: `second artist`,
    },
    {
      picture: `picture 3`,
      artist: `third artist`,
    },
  ]};

describe(`Artist question screen work correctly`, () => {
  const onAnswerHandler = jest.fn();
  const renderPlayerMock = jest.fn();
  const component = mount(<ArtistQuestionScreen
    mistakes={1}
    renderPlayer={renderPlayerMock}
    onAnswer={onAnswerHandler}
    question={question} />);

  it(`Render player function have called one time`, () => {
    expect(renderPlayerMock).toHaveBeenCalledTimes(1);
    expect(renderPlayerMock).toHaveBeenNthCalledWith(1, `some src`, FIRST_PLAYER_ID);
  });

  it(`On answer function calling with right arguments`, () => {
    component.find(`input[type='radio']`).at(0).simulate(`change`, { target: { checked: true } });
    component.find(`input[type='radio']`).at(2).simulate(`change`, { target: { checked: true } });

    expect(onAnswerHandler).toHaveBeenCalledTimes(2);
    expect(onAnswerHandler).toHaveBeenNthCalledWith(1, question.answers[0].artist);
    expect(onAnswerHandler).toHaveBeenNthCalledWith(2, question.answers[2].artist);
  });
});


