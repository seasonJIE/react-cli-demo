import * as React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {DemoHook} from "@pages/demo/demoHook"
import Demo from "@pages/demo/demo"

const Routers = () => {
  return (
    <Router>
      <Route path="/demoHook" component={DemoHook}/>
      <Route path="/demo" component={Demo}/>
    </Router>
  )
}

export default Routers;
