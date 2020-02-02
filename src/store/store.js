import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import todos from "../reducers/rootReducer";
import { getTodo } from "../actions/actions";
import axios from "axios";

export const store = createStore(todos, applyMiddleware(thunk));

export const getTodoFetch = (params = null) => {
  store.dispatch(dispatch => {
    axios
      .get(
        "https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Tarnavsky",
        {
          params: params
        }
      )
      .then(response => {
        dispatch(getTodo(response.data));
      });
  });
};

getTodoFetch();
