import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Signup from "./Pages/Auth/Signup";
import Signin from "./Pages/Auth/Signin";
import PageNotFund from "./Components/PageNotFund";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import Profile from "./Pages/Chat/Profile";
// import ParentComponent from './Pages/ParentComponent';

function App() {
  return (
    <div className="chats-tab-open">
      {/* <ParentComponent /> */}
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/Profile' component={Profile} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route component={PageNotFund} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
