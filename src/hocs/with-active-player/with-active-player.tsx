import {PureComponent} from "react";
import {Subtract} from "utility-types";
import * as React from "react";
import AudioPlayer from "../../Components/audio-player/audio-player";
import withAudio from "../with-audio/with-audio";
import {userAnswer, question} from "../../types";
import questions from "../../mocks/questions";

type store = {
  onAnswer: (userAnswer: userAnswer) => void,
  question: question,
  mistakes: number,
};

type injectedProps = {
  renderPlayer: (src: string, id: number) => React.ReactNode,
}

type state = {
  activePlayer: number,
}

const AudioPlayerWithAudio = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;

  type store = Subtract<P, injectedProps>;

  class WithActivePlayer extends PureComponent<store, state> {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };
    }

    render() {
      return <Component
        {...this.props}
        renderPlayer = {(src, id) => {
          return <AudioPlayerWithAudio
            src={src}
            playButtonClickHandler={() => {
            this.setState({activePlayer: id === this.state.activePlayer ? -1 : id});
          }}
            isPlaying={id === this.state.activePlayer}
            key={src}
          />;
        }}
      />;
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
