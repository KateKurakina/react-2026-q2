import React from "react";
import Header from './components/Header/Header';
import Results from "./components/Results/Results";

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

  render() {
    return (
      <div className="app">
        <Header
          onSearch={this.handleSearch}
          currentSearch={this.state.search}
        />
        <Results search={this.state.search} />
      </div>
    );
  }
}

export default App;