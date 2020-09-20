import * as React from "react";
import {PureComponent, Fragment} from "react";
import {Redirect} from "react-router-dom";

type props = {
  replayButtonClickHandler: () => void,
  mistakes: number,
  maxMistakes: number,
  steep: number,
};

class WinScreen extends PureComponent<props, {}> {
  render() {
    const {replayButtonClickHandler, mistakes, maxMistakes, steep} = this.props;

    if(steep < 10){
      return <Redirect to={`/`} />
    }

    return (
      <Fragment>

        <section className="result">
      <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <h2 className="result__title">Ура победа!</h2>
    <p className="result__total result__total--fail">Вы ответили на все вопросы, сделав всего {mistakes} шибок из допустимых {maxMistakes}!</p>
    <button className="replay" type="button" onClick={replayButtonClickHandler}>Попробовать ещё раз</button>
    </section>

    </Fragment>
  );
  }
}

export default WinScreen;
