import * as React from "react";
import {configure, mount, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withActivePlayer from "./with-active-player"

configure({adapter: new Adapter()});

type props = {
  renderPlayer: (src: string, id: number) => React.ReactNode;
};

class MockComponent extends React.PureComponent<props, {}> {
  render() {
    const {renderPlayer} = this.props;
    return <div>{renderPlayer(``, 0)}</div>;
  }
}

const MockComponentWrapped = withActivePlayer(MockComponent);

describe(`hoc with-active-player work correctly`, () => {
  it(`component have state activePlayer`, () => {
    const component = mount(<MockComponentWrapped />);

    expect(component.state().activePlayer).toEqual(-1);
  });

  it(`state activePlayer change correctly`, () => {
    const component = mount(<MockComponentWrapped />);

    const player = component.childAt(0).childAt(0);

    player.props().children.props.playButtonClickHandler();

    expect(component.state().activePlayer).toEqual(0);
  });
});
