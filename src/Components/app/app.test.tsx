import * as React from "react";
import * as renderer from "react-test-renderer";
import {App} from "./app";
import {question} from "../../types"

// import {shallow, configure} from "enzyme";
// import * as Adapter from "enzyme-adapter-react-16";
// import {shallowToJson} from "enzyme-to-json";
//
// configure({
//   adapter: new Adapter(),
// });

const noop = () => {
  // do nothing
};

const questions : Array<question> = [
  {
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
  },
  {
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
    ],
  }];

describe(`App screen correctly render`, () => {
  it(`App screen correctly render`, () => {
    const tree = renderer
      .create(
        <App
          isAuthorizationRequired={false}
          mistakes={0}
          maxMistakes={0}
          onAuth={noop}
          onUserAnswer={noop}
          onWelcomeButtonClick={noop}
          questions={[]} resetGame={noop}
          step={-1}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`App screen with authorization correctly render`, () => {
    const tree = renderer
      .create(
        <App
          isAuthorizationRequired={true}
          mistakes={0}
          maxMistakes={0}
          onAuth={noop}
          onUserAnswer={noop}
          onWelcomeButtonClick={noop}
          questions={[]} resetGame={noop}
          step={-1}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`App screen with lose correctly render`, () => {
    const tree = renderer
      .create(
        <App
          isAuthorizationRequired={false}
          mistakes={1}
          maxMistakes={0}
          onAuth={noop}
          onUserAnswer={noop}
          onWelcomeButtonClick={noop}
          questions={[]} resetGame={noop}
          step={-1}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`App screen with win correctly render`, () => {
    const tree = renderer
      .create(
        <App
          isAuthorizationRequired={false}
          mistakes={0}
          maxMistakes={0}
          onAuth={noop}
          onUserAnswer={noop}
          onWelcomeButtonClick={noop}
          questions={[]} resetGame={noop}
          step={10}
        />).toJSON();

    expect(tree).toMatchSnapshot();
  });
})
