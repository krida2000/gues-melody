import * as React from "react";
import {PureComponent, Fragment} from "react";
import {Redirect} from "react-router-dom";

type props = {
  replayButtonClickHandler: () => void,
  mistakes: number,
  maxMistakes: number,
};

class LoseScreen extends PureComponent<props, {}> {
  render() {
    const {replayButtonClickHandler, mistakes, maxMistakes} = this.props;

    if(mistakes <= maxMistakes){
      return <Redirect to={`/`} />
    }

    return (
      <Fragment>

          <section className="result">
            <div className="result__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
            </div>
            <h2 className="result__title">Какая жалость!</h2>
            <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий
              раз!</p>
            <button className="replay" type="button" onClick={replayButtonClickHandler}>Попробовать ещё раз</button>
          </section>

      </Fragment>
    );
  }
}

export default LoseScreen;
