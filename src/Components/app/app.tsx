import {PureComponent} from "react";
import * as React from "react";
import WelcomeScreen from '../welcome-screen/welcome-screen';
import LoseScreen from "../lose-screen/lose-screen";
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";
import AuthorizationScreen from "../authorization-screen/authorization-screen";
import {connect} from "react-redux";
import {ActionCreator as GameActionCreator} from "../../reducer/game/game"
import {Operation as DataOperation} from "../../reducer/data/data"
import {Operation as UserOperation} from "../../reducer/user/user"
import {Switch, Route, Redirect, BrowserRouter} from "react-router-dom";
import {appProps, artistUserAnswer, genreUserAnswer} from "../../types";
import history from '../../history'
import WinScreen from "../win-screen/win-screen";

class App extends PureComponent<appProps, {}> {
  _getScreen() {

    const {questions, mistakes, maxMistakes, onUserAnswer, step, resetGame, isAuthorizationRequired} = this.props;
    const question = questions[step];

    if(mistakes > maxMistakes){
      return <Redirect to={`/lose`} />;
    }

    if (isAuthorizationRequired) {
      return <Redirect to={`/auth`} />;
    }

    if (step === -1) {
      const {onWelcomeButtonClick} = this.props;

      return <WelcomeScreen
        errorsCount={maxMistakes}
        onWelcomeButtonClick={() => onWelcomeButtonClick()}
      />;
    }

    if (step === 10) {
      return <Redirect to={`/win`} />;
    }

    if (questions[step] && questions[step].type === `artist`) {
      const ArtistQuestionScreenWithActivePlayer = withActivePlayer(ArtistQuestionScreen);

      return <ArtistQuestionScreenWithActivePlayer onAnswer={(userAnswer: artistUserAnswer) => onUserAnswer(userAnswer, question)}
        question={questions[step]}
        mistakes={mistakes}/>;
    }

    if (questions[step] && questions[step].type === `genre`) {
      const GenreQuestionScreenWithActivePlayerAndAnswer = withUserAnswer(withActivePlayer(GenreQuestionScreen));

      return <GenreQuestionScreenWithActivePlayerAndAnswer onAnswer={(userAnswer: genreUserAnswer) => onUserAnswer(userAnswer, question)}
        question={questions[step]}
        mistakes={mistakes}/>;
    }

    resetGame();

    return null;
  }

  render() {
    const {onAuth, resetGame, isAuthorizationRequired, mistakes, maxMistakes, step} = this.props;

    return <BrowserRouter>
      <Switch>
        <Route exact path={`/`} render={() => this._getScreen()}/>
        <Route exact path={`/auth`} render={() => <AuthorizationScreen onAuthorization={onAuth} isAuthorizationRequired={isAuthorizationRequired}/>}/>
        <Route exact path={`/lose`} render={() => <LoseScreen replayButtonClickHandler={resetGame} mistakes={mistakes} maxMistakes={maxMistakes}/>}/>
        <Route exact path={`/win`} render={() => <WinScreen replayButtonClickHandler={resetGame} mistakes={mistakes} maxMistakes={maxMistakes} steep={step}/>}/>
      </Switch>
    </BrowserRouter>;
  }
}

// App.propTypes = {
//   questions: PropTypes.array.isRequired,
//   mistakes: PropTypes.number.isRequired,
//   maxMistakes: PropTypes.number.isRequired,
//   gameTime: PropTypes.number.isRequired,
//   step: PropTypes.number.isRequired,
//   isAuthorizationRequired: PropTypes.bool.isRequired,
//   onUserAnswer: PropTypes.func.isRequired,
//   onWelcomeButtonClick: PropTypes.func.isRequired,
//   resetGame: PropTypes.func.isRequired,
//   onAuth: PropTypes.func.isRequired,
//   // questions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.shape({
//   //   type: `artist`,
//   //   song: {
//   //     artist: PropTypes.string.isRequired,
//   //     src: PropTypes.string.isRequired
//   //   },
//   //   answers: PropTypes.arrayOf({
//   //     picture: PropTypes.string.isRequired,
//   //     artist: PropTypes.string.isRequired
//   //   }),
//   // }), PropTypes.shape({
//   //   type: `genre`,
//   //   genre: PropTypes.string.isRequired,
//   //   answers: PropTypes.arrayOf({
//   //     src: PropTypes.string.isRequired,
//   //     genre: PropTypes.string.isRequired
//   //   }),
//   // })])).isRequired,
// };

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    step: state.game.step,
    mistakes: state.game.mistakes,
    questions: state.data.questions,
    isAuthorizationRequired: state.user.isAuthorizationRequired,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick: () => {
    dispatch(GameActionCreator.incrementStep());
  },
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(GameActionCreator.incrementStep());
    dispatch(GameActionCreator.incrementMistakes(userAnswer, question));
  },
  onAuth: (authData) => {
    dispatch(UserOperation.login(authData));
  },
  resetGame() {
    dispatch(GameActionCreator.reset());
    dispatch(DataOperation.loadQuestions());
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
