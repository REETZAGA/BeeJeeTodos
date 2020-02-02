import React, { useEffect, useState, createRef } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Typography,
  Modal,
  TextField
} from "@material-ui/core";
import { connect } from "react-redux";
import {
  loginStart,
  loginFinish,
  loginError,
  logOut
} from "../../actions/actions";
import axios from "axios";

const Header = props => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const loginNode = createRef();
  const passwordNode = createRef();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogin = evt => {
    evt.preventDefault();
    const login = loginNode.current.value;
    const password = passwordNode.current.value;
    if (login.length == 0 || password.length == 0) {
      alert("Login or Password is Empty");
    } else {
      props.onLogin(login, password);
    }
  };
  const handleLogout = evt => {
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    props.onLogout();
  };

  useEffect(() => {
    if (!props.login.error && props.login.isLogin) {
      let date = new Date();
      date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
      let expires = date.toGMTString();
      document.cookie = `token=${props.login.token};expires=${expires}`;
      setOpen(false);
      setError(null);
    }
    if (props.login.error) {
      setError(props.login.error.password);
    }
  });

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container spacing={3} justify="space-between">
          <Typography variant="h6">BeeJee Todos</Typography>
          <Modal
            aria-labelledby="login-modal"
            aria-describedby="login-modal"
            open={open}
            onClose={handleClose}
          >
            <div className="modal-window">
              <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={10}>
                  <h1>Sign-In</h1>
                  {error ? <h1>{error}</h1> : null}
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    required
                    id="login"
                    label="Login"
                    variant="outlined"
                    fullWidth
                    inputRef={loginNode}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    required
                    id="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    inputRef={passwordNode}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleLogin}
                    fullWidth={true}
                  >
                    Sign-in
                  </Button>
                </Grid>
                <Grid item xs={10}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleClose}
                    fullWidth={true}
                  >
                    Close modal
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Modal>
          {!props.login.isLogin ? (
            <Button color="inherit" onClick={handleOpen}>
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = state => ({ login: state.login });

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (username, password) => {
      dispatch(loginStart());
      dispatch(dispatch => {
        let form = new FormData();
        form.append("username", username);
        form.append("password", password);
        axios({
          method: "post",
          url:
            "https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=Tarnavsky",
          data: form
        }).then(function(response) {
          if (response.data.status == "error") {
            dispatch(loginError(response.data.message));
          }
          if (response.data.status !== "error") {
            dispatch(loginFinish(response.data.message.token));
          }
        });
      });
    },
    onLogout: () => {
      dispatch(logOut());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
