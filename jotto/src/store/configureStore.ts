import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"

export const middlewares = [thunk]
const middlewareApplier = applyMiddleware(...middlewares)
export const createStoreWithMiddlewares = middlewareApplier(createStore)

export default createStoreWithMiddlewares(rootReducer)