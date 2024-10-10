import React from "react"
import { Switch, Route } from "react-router-dom"
import Login from "./pages/Login"
import Form from "./pages/Form"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/form" component={Form} />
      <Route path="/*" component={NotFound} />
    </Switch>
  )
}

export default App
