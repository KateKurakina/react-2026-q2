import React from "react";
import Header from './components/Header/Header';
import Results from "./components/Results/Resuts";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Results />
      </div>
    );
  }
}

export default App;