import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from './Header'
import Dashboard from './Dashboard'
import NewSurvey from './NewSurvey'
import LandingPage from './LandingPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={NewSurvey} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
