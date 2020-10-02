import * as React from "react";
import {PureComponent} from "react";
import Mistakes from "../mistakes/mistakes";
import {artistQuestion, artistUserAnswer} from "../../types";

const FIRST_PLAYER_ID = 0;

type props = {
  question: artistQuestion,
  onAnswer: (artist: artistUserAnswer) => void,
  mistakes: number,
  renderPlayer: (src : string, id : number) => React.ReactNode,
}

class ArtistQuestionScreen extends PureComponent<props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const {question, onAnswer, mistakes, renderPlayer} = this.props;

    return (
      <section className="game game--artist">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
            />
          </svg>

          <div className="timer__value">
            <span className="timer__mins">05</span>
            <span className="timer__dots">:</span>
            <span className="timer__secs">00</span>
          </div>

          <Mistakes errorsCount={mistakes} />
        </header>

        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <div className="track" key={question.song.src}>
            {renderPlayer(question.song.src, FIRST_PLAYER_ID)}
            </div>
          </div>

          <form className="game__artist">
            {question.answers.map((it, i) => <div className="artist" key={it.artist}>
              <input className="artist__input visually-hidden" type="radio" name="answer" value={`artist-${i}`}
                id={`answer-${i}`} onChange={(evt) => {
                  evt.preventDefault();
                  onAnswer(it.artist);
                }}/>
              <label className="artist__name" htmlFor={`answer-${i}`}>
                <img className="artist__picture" src={it.picture} alt={it.artist}/>
                {it.artist}
              </label>
            </div>)}
          </form>
        </section>
      </section>
    );
  }
}

export {FIRST_PLAYER_ID};
export default ArtistQuestionScreen;
