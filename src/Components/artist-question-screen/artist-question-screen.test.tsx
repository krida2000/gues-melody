import * as React from "react";
import * as renderer from "react-test-renderer";
import ArtistQuestionScreen from "./artist-question-screen";
import {artistQuestion} from "../../types";

const noop = () => {
  // do nothing
};

const question : artistQuestion = {
  type: `artist`,
  song: {
    artist: `Jim Beam`,
    src: `https://upload.wikimedia.org/wikipedia/commons/f/ff/Anthem_of_Ukraine_instrumental.ogg`
  },
  answers: [
    {
      picture: `http://placehold.it/134x134`,
      artist: `Jim Beam`,
    },
    {
      picture: `http://placehold.it/134x134`,
      artist: `Jon Snow`,
    },
    {
      picture: `http://placehold.it/134x134`,
      artist: `Nicolai Sobolev`,
    },
  ]
};

it(`Artist question screen correctly render`, () => {
  const tree = renderer
    .create(
      <ArtistQuestionScreen
        mistakes={0}
        onAnswer={noop}
        renderPlayer={(src: string, id : number) => <div />}
        question={question}
      />).toJSON();

  expect(tree).toMatchSnapshot();
});
