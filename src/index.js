import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {store} from "./store/store";
import Todos from "./components/Todos/Todos";
import AddTodoForm from "./components/Todos/AddTodoForm";
import { Grid } from "@material-ui/core";
import Header from "./components/header/Header";
const appMountPoint = "appMountPoint";

ReactDOM.render(
  <Provider store={store}>
    <Header/>
    <Grid container direction="row" justify="center" alignItems="center">
      <AddTodoForm />
      <Todos />
      </Grid>
  </Provider>,
  document.getElementById(appMountPoint)
);
