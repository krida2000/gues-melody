import * as React from "react";
import {PureComponent} from "react";

type props = {
  errorsCount: number,
  onWelcomeButtonClick: () => void,
}

class WelcomeScreen extends PureComponent<props, {}> {
  render() {
    const {errorsCount, onWelcomeButtonClick} = this.props;

    return (
      <section className="welcome">
        <div className="welcome__logo">
          <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
        </div>
        <button
          onClick={onWelcomeButtonClick}
          className="welcome__button"
        >
          <span className="visually-hidden">Начать игру</span>
        </button>
        <h2 className="welcome__rules-title">Правила игры</h2>
        <p className="welcome__text">Правила просты:</p>
        <ul className="welcome__rules-list">
          <li>Нужно ответить на все вопросы.</li>
          <li>Можно допустить {errorsCount} ошибок.</li>
        </ul>
        <p className="welcome__text">Удачи!</p>
      </section>
    );
  }
}


export default WelcomeScreen;
