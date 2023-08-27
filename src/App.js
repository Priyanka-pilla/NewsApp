//import logo from './logo.svg';
import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <News pageSize={8} />
      </div>
    );
  }
}

/*Always Use React Router when you want to navigate between pages in the navbar wiothout reloading and use a unique key for navigation*/
