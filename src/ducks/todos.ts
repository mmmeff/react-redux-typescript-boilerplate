import { handleActions, createAction } from "redux-actions"

// ACTIONS
export const ADD_TODO = "TODOS/ADD"
export const EDIT_TODO = "TODOS/EDIT"
export const DELETE_TODO = "TODOS/DELETE"
export const COMPLETE_TODO = "TODOS/COMPLETE"
export const COMPLETE_ALL = "TODOS/COMPLETE_ALL"
export const CLEAR_COMPLETED = "TODOS/CLEAR_COMPLETED"


// REDUCERS
const initialState: TodoStoreState = [{
  id: 0,
  text: "Use Redux",
  completed: false
}]

export default handleActions<TodoStoreState, TodoItemData>({
  [ADD_TODO]: (state, action) => {
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      ...action.payload,
    }, ...state]
  },
  [DELETE_TODO]: (state, action) => {
    return state.filter(todo => todo.id !== action.payload)
  },
  [EDIT_TODO]: (state, action) => {
    return state.map(todo => {
      return todo.id === action.payload.id
        ? { ...todo, text: action.payload.text }
        : todo
    })
  },
  [COMPLETE_TODO]: (state, action) => {
    return state.map(todo => {
      return todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    })
  },
  [COMPLETE_ALL]: (state, action) => {
    const areAllMarked = state.every(todo => todo.completed);
    return state.map(todo => {
      return {
        ...todo,
        completed: !areAllMarked
      }
    })
  },
  [CLEAR_COMPLETED]: (state, action) => {
    return state.filter(todo => todo.completed === false)
  }
}, initialState)


// ACTION CREATORS
export const TodoActions = {
    addTodo: createAction<TodoItemData>(ADD_TODO),
    editTodo: createAction<TodoItemData>(EDIT_TODO),
    deleteTodo: createAction<TodoItemId>(DELETE_TODO),
    completeTodo: createAction<TodoItemId>(COMPLETE_TODO),
    completeAll: createAction(COMPLETE_ALL),
    clearCompleted: createAction(CLEAR_COMPLETED)
}