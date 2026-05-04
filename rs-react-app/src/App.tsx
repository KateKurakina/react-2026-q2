import React from "react";
import Header from './components/Header/Header';
import Results from "./components/Results/Results";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ErrorTrigger from "./components/ErrorTrigger/ErrorTrigger";

type State = {
  search: string;
  hasCrash: boolean;
}

class App extends React.Component<object, State> {
  state: State = {
    search: '',
    hasCrash: false,
  };

  handleSearch = (value: string) => {
    this.setState({ search: value });
  }

    throwError = () => {
      this.setState({ hasCrash: true});
  }


  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <Header
            onSearch={this.handleSearch}
            currentSearch={this.state.search}
          />

          <Results search={this.state.search} />

          <button className="button__error" onClick={this.throwError}>
            Test Error
          </button>

          <ErrorTrigger shouldCrash={this.state.hasCrash} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;