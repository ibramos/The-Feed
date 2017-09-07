import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import Header from "./Header";
import Dashboard from "./Dashboard";
import NewSurvey from "./surveys/NewSurvey";
import LandingPage from "./LandingPage";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={NewSurvey} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
