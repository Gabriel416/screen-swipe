import React, { Component } from "react";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";

class Home extends Component {
  render() {
    return (
      <div className="home w-90 w-80-m w-70-l">
        <Header />
        <Searchbar />
      </div>
    );
  }
}

export default Home;
