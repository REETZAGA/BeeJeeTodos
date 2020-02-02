import {
  Grid,
  Button,
  Modal,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import React, { useEffect, useState, createRef } from "react";
import { connect } from "react-redux";
import { getTodoStart } from "../../actions/actions";
import { getTodoFetch } from "../../store/store";
import axios from "axios";
import testIsLogin from "../../utils/testIsLogin";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const TodoItem = props => {
  const {
    text,
    username,
    email,
    status,
    key,
    login,
    id,
    onAdminEdit,
    page,
    filterData,
    filterType
  } = props;
  const [open, setOpen] = useState(false);
  const [selectedStatus, selectStatus] = useState(status);
  const newTodoTextNode = createRef();

  const handleCloseAdminEditModal = evt => {
    evt.preventDefault();
    setOpen(false);
  };
  const handleOpenAdminEditModal = evt => {
    evt.preventDefault();
    if (testIsLogin().isLogin === true) {
      setOpen(true);
    } else {
      alert("Please sign in as admin");
    }
  };
  const handleStateChange = evt => {
    selectStatus(evt.target.value);
  };
  const handleAdminEdit = evt => {
    evt.preventDefault();
    if (testIsLogin().isLogin) {
      onAdminEdit(
        newTodoTextNode.current.value,
        selectedStatus,
        id,
        login.token,
        {
          page: page,
          sort_field: filterData,
          sort_direction: filterType
        }
      );
    } else {
      alert("Please sign in as admin");
    }
  };
  const loginRender = () => {
    if (login.isLogin) {
      return (
        <>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleOpenAdminEditModal}
              fullWidth={true}
              className="admin-edit-button"
            >
              Edit
            </Button>
          </Grid>
          <Modal
            aria-labelledby="login-modal"
            aria-describedby="login-modal"
            open={open}
            onClose={handleCloseAdminEditModal}
          >
            <div className="modal-window">
              <Grid container spacing={3} alignItems="center" justify="center">
                <Grid item xs={10}>
                  <h1>Edit todo with id: {id}</h1>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    required
                    id="new-todo-text"
                    label="New todo text"
                    variant="outlined"
                    fullWidth
                    inputRef={newTodoTextNode}
                    defaultValue={text}
                  />
                </Grid>
                <Grid item xs={10}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="new-todo-status-label">Status</InputLabel>
                    <Select
                      required
                      id="new-todo-status"
                      labelId="new-todo-status-label"
                      labelWidth={50}
                      value={selectedStatus}
                      onChange={handleStateChange}
                      name="new-todo-status"
                    >
                      <MenuItem value={10}>Completed</MenuItem>
                      <MenuItem value={0}>Not completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={10}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleAdminEdit}
                    fullWidth={true}
                    className="accept-admin-edit"
                  >
                    Accept edit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Modal>
        </>
      );
    }
  };
  return (
    <Grid item lg={10} xs={10} className="todo-list-item" key={key}>
      <Grid item lg={10} xs={10}>
        <span>
          <strong>Todo: </strong>
          {text}
        </span>
      </Grid>
      <Grid item lg={10} xs={10}>
        <span>
          <strong>User Name:</strong>
          {username}
        </span>
      </Grid>
      <Grid item lg={10} xs={10}>
        <span>
          <strong>User Email: </strong>
          {email}
        </span>
      </Grid>
      <Grid item lg={10} xs={10}>
        <span>
          <strong>Status: </strong>
          {status == 0 ? (
            <span className="uncomplited-task">Not completed</span>
          ) : (
            <span className="complited-task">Completed</span>
          )}
        </span>
      </Grid>
      {loginRender()}
    </Grid>
  );
};

const mapStateToProps = state => ({ login: state.login });

const mapDispatchToProps = dispatch => {
  return {
    onAdminEdit: (text, status = 0, id, token, params) => {
      dispatch(getTodoStart());
      dispatch(dispatch => {
        let form = new FormData();
        form.append("token", token);
        form.append("text", text);
        form.append("status", status);
        axios({
          method: "post",
          url: `https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=Tarnavsky`,
          data: form
        }).then(function(response) {
          getTodoFetch(params);
        });
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
