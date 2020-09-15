import {Fragment, PureComponent} from "react";
import * as React from "react";

type props = {
  playButtonClickHandler: () => void,
  isPlaying: boolean,
  isLoading: boolean,
  children: React.ReactNode,
  src: string,
}

class AudioPlayer extends PureComponent<props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const {playButtonClickHandler, isPlaying, isLoading, children, src} = this.props;

    return <Fragment key={src}>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={() => {
          playButtonClickHandler();
        }}
      />
      <div className="track__status">
        {children}
      </div>
    </Fragment>;
  }
}


export default AudioPlayer;
