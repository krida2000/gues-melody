import {PureComponent} from "react";
import * as React from "react";
import WelcomeScreen from '../welcome-screen/welcome-screen';
import LoseScreen from "../lose-screen/lose-screen";
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withUserAnswer from "../../hocs/with-user-answer/with-user-answer";
import AuthorizationScreen from "../authorization-screen/authorization-screen";
import {ActionCreator} from "../../reducer";
import {connect} from "react-redux";
import {Operation} from "../../reducer";
import {Switch, Route, Redirect} from "react-router-dom";
import {appProps, artistUserAnswer, genreUserAnswer} from "../../types";
import history from '../../history'

class App extends PureComponent<appProps, {}> {
  _getScreen() {

    const {questions, mistakes, maxMistakes, onUserAnswer, step, resetGame, isAuthorizationRequired} = this.props;
    const question = questions[step];

    if(mistakes >= maxMistakes){
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
    const {onAuth, resetGame, isAuthorizationRequired, mistakes, maxMistakes} = this.props;

    return <Switch>
      <Route exact path={`/`} render={() => this._getScreen()}/>
      <Route exact path={`/auth`} render={() => <AuthorizationScreen onAuthorization={onAuth} isAuthorizationRequired={isAuthorizationRequired}/>}/>
      <Route exact path={`/lose`} render={() => <LoseScreen replayButtonClickHandler={resetGame} mistakes={mistakes} maxMistakes={maxMistakes}/>}/>
      <Route exact path={`/win`} render={() => <AuthorizationScreen onAuthorization={onAuth} isAuthorizationRequired={isAuthorizationRequired}/>}/>
    </Switch>;
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
    step: state.step,
    mistakes: state.mistakes,
    questions: state.questions,
    isAuthorizationRequired: state.isAuthorizationRequired,
  });
};

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick: () => {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistakes(userAnswer, question));
  },
  onAuth: (authData) => {
    dispatch(Operation.login(authData));
  },
  resetGame() {
    dispatch(ActionCreator.reset());
    dispatch(Operation.loadQuestions());
  },
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
