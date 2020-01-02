import * as React from "react";
import {Route} from "react-router-dom";
import {Demo} from "@pages/demo/Demo"

const Routers = () => {
  return (
    <Route path="/aos/Demo" component={Demo}/>
  )
}

export default Routers;
