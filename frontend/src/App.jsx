import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Requests } from "./Requests";
import { DecisionForm } from "./DecisionForm";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Route path="/" component={Requests} />
        <Route path="/requests/:id" component={DecisionForm} />
      </main>
    </BrowserRouter>
  );
}

export default App;
