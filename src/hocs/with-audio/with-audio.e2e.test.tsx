import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withAudio from "./with-audio";
import GenreQuestionScreen from "../../Components/genre-question-screen/genre-question-screen";

configure({adapter: new Adapter()});

type props = {
  playButtonClickHandler: () => void;
};

class MockComponent extends React.PureComponent<props, {}> {
  render() {
    const {children, playButtonClickHandler} = this.props;
    return <div>
      <button onClick={playButtonClickHandler} />
      {children}
    </div>;
  }
}

const MockComponentWithAudio = withAudio(MockComponent);

describe(`hoc with-audio work correctly`, () => {
  it(`play will be call if audio on pause`, () => {
    const playButtonClickHandler = jest.fn();
    const component = mount(<MockComponentWithAudio src={``} isPlaying={false} playButtonClickHandler={playButtonClickHandler} />);

    window.HTMLMediaElement.prototype.play = () => Promise.resolve();

    const audioRef = component.instance().audioRef;
    jest.spyOn(audioRef.current, `play`);

    component.instance().componentDidMount();
    component.find(`button`).simulate(`click`);

    expect(playButtonClickHandler).toHaveBeenCalledTimes(1);
    expect(audioRef.current.play).toHaveBeenCalledTimes(1);
  });

  it(`pause will be call if audio playing`, () => {
    const playButtonClickHandler = jest.fn();
    const component = mount(<MockComponentWithAudio src={``} isPlaying={true} playButtonClickHandler={playButtonClickHandler} />);

    window.HTMLMediaElement.prototype.pause = () => {};

    const audioRef = component.instance().audioRef;
    jest.spyOn(audioRef.current, `pause`);

    component.instance().componentDidMount();
    component.find(`button`).simulate(`click`);

    expect(playButtonClickHandler).toHaveBeenCalledTimes(1);
    expect(audioRef.current.pause).toHaveBeenCalledTimes(1);
  });
});
