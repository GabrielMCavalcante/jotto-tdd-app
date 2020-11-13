import { ReactWrapper, ShallowWrapper } from "enzyme"
import checkPropTypes from "check-prop-types"
import rootReducer from "../store/reducers"
import { createStoreWithMiddlewares } from "../store/configureStore"

function findByTestAttr(
  wrapper: ShallowWrapper | ReactWrapper,
  val: string
) {
  return wrapper.find(`[data-test="${val}"]`)
}

function checkProps(component: React.FC<any>, props: any) {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  const propError = checkPropTypes(component.propTypes, props, "prop", component.name)
  expect(propError).toBeUndefined()
}

function storeFactory(initialState = {}) {
  return createStoreWithMiddlewares(rootReducer, initialState as any)
}

export { findByTestAttr, checkProps, storeFactory }