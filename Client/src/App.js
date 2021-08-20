import React, { Component } from "react";
import "./App.css";
import MyForm from "./components/MyForm";
import Title from "./components/Title";

class App extends Component {
  state = {
    visible: true
  };

  render() {
    return (
      <div className="App">
        <Title />
        <MyForm />
      </div>
    );
  }
}

export default App;