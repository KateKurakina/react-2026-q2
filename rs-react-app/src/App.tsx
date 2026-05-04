import React from "react";
import Header from './components/Header/Header';
import Results from "./components/Results/Results";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

type State = {
  search: string;
}



class App extends React.Component<object, State> {
  state: State = {
    search: '',
  };

  handleSearch = (value: string) => {
    this.setState({ search: value });
  }

    throwError = () => {
    throw new Error('Test error');
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

            <button onClick={this.throwError}>
              Test Error
            </button>
          </div>
        </ErrorBoundary>
    );
  }
}

export default App;