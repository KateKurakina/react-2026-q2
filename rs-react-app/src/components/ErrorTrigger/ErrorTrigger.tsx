import React from "react";

type Props = {
  shouldCrash: boolean;
};

class ErrorTrigger extends React.Component<Props> {
  render() {
    if (this.props.shouldCrash) {
      throw new Error("Test error");
    }

    return null;
  }
}

export default ErrorTrigger;