import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "../Home/Home";
import { Game } from "../Game/Game";
import { Settings } from "../Settings/Settings";
import { Playground } from "../Playground/Playground";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/playground">
          <Playground />
        </Route>
      </Switch>
    </Router>
  );
}
