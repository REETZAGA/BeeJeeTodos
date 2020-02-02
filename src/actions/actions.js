export const getTodoStart = () => ({ type: "GET_TODO_START" });
export const getTodo = todo => ({ type: "GET_TODO", payload: todo });
export const addTodo = newtodo => ({
  type: "ADD_TODO",
  payload: newtodo
});
export const loginStart = () => ({ type: "LOGIN_START" });
export const loginFinish = token => ({ type: "LOGIN_FINISH", payload: token });
export const loginError = error => ({ type: "LOGIN_ERROR", payload: error });
export const logOut = () => ({type: "LOG_OUT"})
