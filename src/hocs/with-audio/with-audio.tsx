import {PureComponent} from "react";
import * as React from "react";
import AudioPlayer from "../../Components/audio-player/audio-player.js";
import ArtistQuestionScreen from "../../Components/artist-question-screen/artist-question-screen";
import {Subtract} from "utility-types";

type props = {
  isPlaying: boolean;
  playButtonClickHandler: () => void;
  src: string;
}

type state = {
  isLoading: boolean,
  isPlaying: boolean,
}

const withAudio = (Component) => {
  // type P = React.ComponentProps<typeof Component>;

  // type store = Subtract<P, injectedProps>;

  class WithAudio extends PureComponent<props, state> {
    private audioRef: React.RefObject<HTMLAudioElement>;

    constructor(props) {
      super(props);

      this.audioRef = React.createRef();

      this.state = {
        isLoading: true,
        isPlaying: props.isPlaying,
      };
    }

    componentDidMount() {
      const audio = this.audioRef.current;

      const {src} = this.props;

      audio.src = src;

      audio.oncanplaythrough = () => {
        this.setState({isLoading: false});
      };

      audio.onplay = () => {
        this.setState({isPlaying: true});
      };

      audio.onpause = () => {
        this.setState({isPlaying: false});
      };
    }

    componentWillUnmount() {
      const audio = this.audioRef.current;

      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
      audio.src = ``;
    }

    componentDidUpdate() {
      const audio = this.audioRef.current;

      if (!this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    render() {
      const {isPlaying} = this.state;
      const {playButtonClickHandler} = this.props;

      return <Component
        {...this.props}
        isPlaying={this.state.isPlaying}
        isLoading={this.state.isLoading}
        playButtonClickHandler={() => {
          this.setState({isPlaying: !isPlaying});
          playButtonClickHandler();
        }}
      >
        <audio ref={this.audioRef}/>
      </Component>;
    }
  }

  return WithAudio;
};

export default withAudio;
