import * as React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { RouteComponentProps } from "react-router"

import { TodoActions } from "../../ducks/todos"
import { Header, MainSection } from "../../components"
import * as style from "./style.css"


export namespace App {
  export interface Props extends RouteComponentProps<void> {
    todos: TodoItemData[]
    actions: typeof TodoActions
  }

  export interface State {
    /* empty */
  }
}

@connect(
  ({ todos }) => ({ todos }),
  dispatch => ({ actions: bindActionCreators(TodoActions as any, dispatch) })
)
export class App extends React.Component<App.Props, App.State> {

  render() {
    const { todos, actions, children } = this.props
    return (
      <div className={ style.normal }>
        <Header addTodo={ actions.addTodo } />
        <MainSection todos={todos} actions={actions} />
        {children}
      </div>
    )
  }
}
