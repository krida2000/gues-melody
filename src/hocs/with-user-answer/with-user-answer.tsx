import {PureComponent} from "react";
import * as React from "react";
import {Subtract} from "utility-types";

type injectedProps = {
  onAnswer: () => void,
  onChange: (i: number, value: boolean) => React.ReactNode,
}

type state = {
  userAnswer: Array<boolean>,
}

const withUserAnswer = (Component) => {
  type P = React.ComponentProps<typeof Component>;

  type store = Subtract<P, injectedProps>;

  class WithUserAnswer extends PureComponent<store, state> {
    constructor(props) {
      super(props);

      this.state = {
        userAnswer: Array(props.question.answers.length).fill(false),
      };

      this.handlerChange = this.handlerChange.bind(this);
      this.handleAnswer = this.handleAnswer.bind(this);
    }

    handlerChange(i, value) {
      let answers = this.state.userAnswer.slice(0);
      answers[i] = value;

      this.setState({userAnswer: answers});
    }

    handleAnswer() {
      const {onAnswer} = this.props;
      const {userAnswer} = this.state;

      onAnswer(userAnswer);
    }

    render() {
      return <Component
        {...this.props}
        onAnswer={this.handleAnswer}
        onChange={this.handlerChange}
      />;
    }
  }

  return WithUserAnswer;
};

export default withUserAnswer;
