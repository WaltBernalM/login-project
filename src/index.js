import React from 'react';
import ReactDOM from "react-dom" // Use react-dom for React 16
import "./index.css"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from "./context/auth.context"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
