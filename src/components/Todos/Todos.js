import React, { component, Component } from "react";
import {
  TextField,
  Button,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import { connect } from "react-redux";
import "./todos.scss";
import TodoItem from "./TodoItem";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { getTodoStart, getTodo } from "../../actions/actions";
import { getTodoFetch } from "../../store/store";

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterData: "",
      filterType: "",
      currentPage: 1
    };
  }
  renderTodos = () => {
    const { fetched, fetching, errors, todos } = this.props.todosBody;
    if (fetching) {
      return <h1>Loading...</h1>;
    }
    if (fetched && !fetching) {
      const { status } = todos;
      const { tasks, total_tasks_count } = todos.message;
      const { currentPage, filterData, filterType } = this.state;
      if (status === "ok") {
        if (total_tasks_count == 0) {
          return <h1>You todo list is empty</h1>;
        } else {
          return tasks.map((task, index) => {
            return (
              <TodoItem
                text={task.text}
                username={task.username}
                email={task.email}
                status={task.status}
                key={index}
                id={task.id}
                page={currentPage}
                filterData={filterData}
                filterType={filterType}
              />
            );
          });
        }
      }
    }
  };
  handlePageClick = data => {
    const selected = data.selected + 1;
    this.setState({ currentPage: selected });
    this.props.onChangePage(
      selected,
      this.state.filterData,
      this.state.filterType
    );
  };
  countTasks = () => {
    const { fetched, fetching, todos } = this.props.todosBody;
    if (fetched && !fetching) {
      return Math.ceil(todos.message.total_task_count / 3);
    } else {
      return 0;
    }
  };
  handleFilterChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };
  handleFilterSubmit = event => {
    event.preventDefault();
    this.props.onFilter(this.state.filterData, this.state.filterType);
  };
  render() {
    return (
      <>
        <Grid item xs={12}>
          <form>
            <Grid
              container
              justify={"center"}
              alignItems={"center"}
              spacing={3}
            >
              <Grid item lg={2} xs={10}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="filter-data-label">Filter Data</InputLabel>
                  <Select
                    id="filter-data"
                    labelId="filter-data-label"
                    labelWidth={80}
                    value={this.state.filterData}
                    onChange={this.handleFilterChange}
                    name="filterData"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="username">username</MenuItem>
                    <MenuItem value="email">email</MenuItem>
                    <MenuItem value="status">status</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={2} xs={10}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="filter-type-label">Filter Type</InputLabel>
                  <Select
                    labelId="filter-type-label"
                    id="filter-type"
                    labelWidth={80}
                    value={this.state.filterType}
                    onChange={this.handleFilterChange}
                    name="filterType"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="asc">asc</MenuItem>
                    <MenuItem value="desc">desc</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={1} xs={10}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth={true}
                  onClick={this.handleFilterSubmit}
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
          </form>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
            className="todo-list"
          >
            {this.renderTodos()}
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
            className="todo-list"
          >
          <Grid item lg={10} xs={10}>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.countTasks()}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
          </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}
const mapStateToProps = state => ({ todosBody: state.todos });
const mapDispatchToProps = dispatch => {
  return {
    onAddTodo: (username, email, text, status) => {
      dispatch(addTodo(username, email, text, status));
    },
    onChangePage: (page, filterData = null, filterType = null) => {
      dispatch(dispatch => {
        dispatch(getTodoStart());
        getTodoFetch({
          page: page,
          sort_field: filterData,
          sort_direction: filterType
        });
      });
    },
    onFilter: (filterData, filterType) => {
      dispatch(dispatch => {
        dispatch(getTodoStart());
        getTodoFetch({
          sort_field: filterData,
          sort_direction: filterType
        });
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
