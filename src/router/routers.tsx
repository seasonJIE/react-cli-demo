import * as React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Demo} from "@pages/demo/Demo"

const Routers = () => {
  return (
    <Router>
      <Route path="/demo" component={Demo}/>
    </Router>
  )
}

export default Routers;
