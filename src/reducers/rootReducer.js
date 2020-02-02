import { combineReducers } from "redux";
import testIsLogin from "../utils/testIsLogin";

const todosInitialState = {
  fetched: false,
  fetching: false,
  todos: [],

  errors: null
};

const todos = (state = todosInitialState, action) => {
  switch (action.type) {
    case "GET_TODO_START":
      return {
        fetched: false,
        fetching: true,
        todos: state.todos
      };
    case "GET_TODO":
      return {
        ...state,
        fetched: true,
        fetching: false,
        todos: action.payload
      };
    case "ADD_TODO":
      return {
        ...state,
        fetched: true,
        fetching: false,
        todos: {
          message: {
            tasks: [action.payload, ...state.todos.message.tasks],
            total_task_count: state.todos.message.total_task_count
          }
        }
      };
    default:
      return state;
  }
};


const loginInitialState = testIsLogin();

const login = (state = loginInitialState, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        isLogin: false,
        tryLogin: true,
        token: state.token,
        error: state.error
      };
    case "LOGIN_FINISH":
      return {
        isLogin: true,
        tryLogin: false,
        token: action.payload,
        error: null
      };
    case "LOGIN_ERROR":
      return {
        isLogin: false,
        tryLogin: false,
        token: state.token,
        error: action.payload
      };
    case "LOG_OUT":
      return {
        isLogin: false,
        tryLogin: false,
        token: null,
        error: null
      };
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  login
});
export default todoApp;
