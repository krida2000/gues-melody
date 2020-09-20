type userAnswer = Array<boolean> | string;
type artistUserAnswer = string;
type genreUserAnswer = Array<boolean>;

type artistQuestionAnswer = {
  picture: string,
  artist: string
};

type genreQuestionAnswer = {
  src: string,
  genre: string
};

type genreQuestion = {
  type: `genre`,
  genre: string,
  answers: Array<genreQuestionAnswer>
}

type artistQuestion = {
  type: `artist`,
  song: {
    artist: string,
    src: string,
  },
  answers: Array<artistQuestionAnswer>
}

type question = artistQuestion | genreQuestion;

type appProps = {
  questions: Array<question>,
  mistakes: number,
  maxMistakes: number,
  step: number,
  isAuthorizationRequired: boolean,
  onUserAnswer: (userAnswer: userAnswer, question: question) => void,
  onWelcomeButtonClick: () => void,
  resetGame: () => void,
  onAuth: (authData: authorizationData) => void,
};

type authorizationData = {
  login: string,
  password: string,
}

export {appProps, artistUserAnswer, genreUserAnswer, userAnswer, question, artistQuestion, genreQuestion, authorizationData}
