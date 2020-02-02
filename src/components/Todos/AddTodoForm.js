import React from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";
import { getTodoStart } from "../../actions/actions";
import { getTodoFetch } from "../../store/store";
import { validateEmail } from "../../utils/validate";
// /https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Tarnavsky

const AddTodoForm = props => {
  const { onAddTodo, login } = props;
  const todoTextNode = React.createRef();
  const emailNode = React.createRef();
  const nameNode = React.createRef();
  const handleClick = evt => {
    evt.preventDefault();
    const text = todoTextNode.current.value;
    const email = emailNode.current.value;
    const name = nameNode.current.value;
    if(validateEmail(email) ==- false){
      alert("Pls enter correct email");
    }else {
      onAddTodo(name, email, text);
    }
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item lg={10} xs={10}>
        <form id="add-todo-form" noValidate autoComplete="off">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
              <TextField
                required
                id="todo-text"
                label="Todo Text"
                variant="outlined"
                fullWidth
                inputRef={todoTextNode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="todo-email"
                label="Email"
                variant="outlined"
                fullWidth
                inputRef={emailNode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="todo-username"
                label="Todo Name"
                variant="outlined"
                fullWidth
                inputRef={nameNode}
              />
            </Grid>
            <Grid item lg={12} xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleClick}
                fullWidth={true}
              >
                Add Todo
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = state => {
  return { todosBody: state.todos };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTodo: (username, email, text) => {
      dispatch(getTodoStart());
      dispatch(dispatch => {
        let form = new FormData();
        form.append("username", username);
        form.append("email", email);
        form.append("text", text);
        axios({
          method: "post",
          url:
            "https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Tarnavsky",
          data: form
        }).then(function(response) {
          console.log(response);
          if(response.data.status == "ok"){
            alert("Todo added")
            getTodoFetch();
          }
          
        });
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoForm);
