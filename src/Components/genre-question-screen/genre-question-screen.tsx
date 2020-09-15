import * as React from "react";
import {PureComponent} from "react";
import Mistakes from "../mistakes/mistakes";
import {genreQuestion} from "../../types";

type props = {
  question: genreQuestion,
  onAnswer: () => void,
  onChange: (i: number, checked: boolean) => void,
  mistakes: number,
  renderPlayer: (src: string, id: number) => React.ReactNode,
};

class GenreQuestionScreen extends PureComponent<props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const {question, onAnswer, mistakes, renderPlayer, onChange} = this.props;

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"/>
          </svg>

          <div className="timer__value">
            <span className="timer__mins">05</span>
            <span className="timer__dots">:</span>
            <span className="timer__secs">00</span>
          </div>

          <Mistakes errorsCount={mistakes} />
        </header>

        <section className="game__screen">
          <h2 className="game__title">Выберите {question.genre} треки</h2>
          <form className="game__tracks" onSubmit={(evt) => {
            evt.preventDefault();
            onAnswer();
          }}>
            {question.answers.map((answer, i) => <div className="track" key={`key-${i}-${answer.src}`}>
              {renderPlayer(answer.src, i)}

              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer" onChange={(evt) => {
                  const checked = evt.target.checked;
                  onChange(i, checked);
                }} value={`answer-${i}`} id={`answer-${i}`}/>
                <label className="game__check" htmlFor={`answer-${i}`}>Отметить</label>
              </div>
            </div>)}

            <button className="game__submit button" type="submit">Ответить</button>
          </form>
        </section>
      </section>
    );
  }
}

export default GenreQuestionScreen;
