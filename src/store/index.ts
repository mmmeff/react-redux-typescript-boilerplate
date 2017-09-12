import { createStore, applyMiddleware, Store } from "redux"
import { logger } from "../middleware"
import rootReducer, { RootState } from "../ducks"

export function configureStore(initialState?: RootState): Store<RootState> {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const createStoreWithMiddleware = applyMiddleware(logger)(create)
  const store = createStoreWithMiddleware(rootReducer, initialState) as Store<RootState>

  if (module.hot) {
    module.hot.accept("../ducks", () => {
      const nextReducer = require("../ducks")
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
