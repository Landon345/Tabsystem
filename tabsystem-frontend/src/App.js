import React from "react";
import "./App.css";
//routing imports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
//Theme imports
import { ThemeProvider } from "emotion-theming";
import tabtheme from "./GlobalStyles/Theme";
//Component imports
import Login from "./Components/Login";
import Home from "./Components/Home";
//Protected Admin Component imports
import Register from "./ProtectedAdminComponents/Register";
import Dashboard from "./ProtectedAdminComponents/Dashboard";
import Tabs from "./ProtectedAdminComponents/Tabs";
import TabDetail from "./ProtectedAdminComponents/TabDetail";
import CreateCategory from "./ProtectedAdminComponents/CreateCategory";
//Protect Component imports
import MyTabs from "./ProtectedComponents/MyTabs";
import MyDashboard from "./ProtectedComponents/MyDashboard";
import CreateCommonItem from "./ProtectedAdminComponents/CommonItems";

function App() {
  return (
    <Router>
      <ThemeProvider theme={tabtheme}>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/mytabs" exact component={MyTabs} />
          <ProtectedRoute path="/mydashboard" exact component={MyDashboard} />
          <ProtectedAdminRoute path="/tabs" exact component={Tabs} />
          <ProtectedAdminRoute path="/register" exact component={Register} />
          <ProtectedAdminRoute path="/dashboard" exact component={Dashboard} />
          <ProtectedAdminRoute
            path="/tabs/detail/:id"
            exact
            component={TabDetail}
          />
          <ProtectedAdminRoute
            path="/createcategory"
            exact
            component={CreateCategory}
          />
          <ProtectedAdminRoute
            path="/commonitem"
            exact
            component={CreateCommonItem}
          />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
