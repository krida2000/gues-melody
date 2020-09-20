import * as React from "react";
import * as renderer from "react-test-renderer";
import GenreQuestionScreen from "./genre-question-screen";
import {genreQuestion} from "../../types";

const noop = () => {
  // do nothing
};

const question : genreQuestion = {
  type: `genre`,
  genre: `rock`,
  answers: [
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/f/ff/Anthem_of_Ukraine_instrumental.ogg`,
      genre: `rock`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/f/ff/Anthem_of_Ukraine_instrumental.ogg`,
      genre: `pop`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/f/ff/Anthem_of_Ukraine_instrumental.ogg`,
      genre: `hoc`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/f/ff/Anthem_of_Ukraine_instrumental.ogg`,
      genre: `rock`,
    },
  ]
};

it(`Genre question screen correctly render`, () => {
  const tree = renderer
    .create(
      <GenreQuestionScreen
        mistakes={0}
        onAnswer={noop}
        onChange={noop}
        renderPlayer={(src: string, id : number) => <div />}
        question={question}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
