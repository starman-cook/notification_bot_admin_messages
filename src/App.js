import React from 'react'
import AdminMessages from "./containers/AdminMessages/AdminMessages";
import Layout from "./components/Layout/Layout";
import {Switch, Route} from "react-router-dom";
import HomePage from "./containers/HomePage/HomePage";
import LogsPage from "./containers/LogsPage/LogsPage";
import GenerateCommandPage from "./containers/GenerateCommandPage/GenerateCommandPage";


function App() {

  return (
    <Layout>
        <Switch>
            <Route path={"/"} exact component={HomePage} />
            <Route path={"/admin_messages"} exact component={AdminMessages} />
            <Route path={"/logs"} exact component={LogsPage} />
            <Route path={"/generateCommand"} exact component={GenerateCommandPage} />
        </Switch>
    </Layout>
  );
}

export default App;
