import * as React from "react";
import {configure, mount, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withUserAnswer from "./with-user-answer";

configure({adapter: new Adapter()});

const question = {
  type: `genre`,
  genre: `correct`,
  answers: [
  {
    src: ``,
    genre: `correct`,
  },
  {
    src: ``,
    genre: `correct`,
  },
  {
    src: ``,
    genre: `incorrect`,
  },
  {
    src: ``,
    genre: `incorrect`,
  },
],
};

class MockComponent extends React.PureComponent {
  render() {
    return <div />;
  }
}

const MockComponentWrapped = withUserAnswer(MockComponent);

describe(`hoc with-user-answer work correctly`, () => {
  it(`component correctly work with state userAnswer`, () => {
    const onAnswerMock = jest.fn();
    const component = mount(<MockComponentWrapped onAnswer={onAnswerMock} question={question} />);
    const childComponent = component.childAt(0);

    // console.log(component.childAt(0).props());

    expect(component.state().userAnswer).toEqual([false, false, false, false]);

    childComponent.props().onChange(0, true);
    expect(component.state().userAnswer).toEqual([true, false, false, false]);

    childComponent.props().onChange(0, true);
    expect(component.state().userAnswer).toEqual([true, false, false, false]);

    childComponent.props().onChange(2, true);
    expect(component.state().userAnswer).toEqual([true, false, true, false]);

    childComponent.props().onAnswer();
    expect(onAnswerMock).toHaveBeenCalledTimes(1);
    expect(onAnswerMock).toHaveBeenNthCalledWith(1, [true, false, true, false])
  });
});
