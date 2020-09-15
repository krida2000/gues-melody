import * as React from "react";
import {PureComponent} from "react";

type props = {
  errorsCount: number,
}

class Mistakes extends PureComponent<props, {}> {
  render() {
    const {errorsCount} = this.props;

    return (
      <div className="game__mistakes">
        {Array(errorsCount).fill(null).map((it, i) => <div className="wrong" key={`error-${i}`}/>)}
      </div>
    );
  }
}


export default Mistakes;
