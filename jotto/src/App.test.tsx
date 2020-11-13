import React from "react"
import { mount } from "enzyme"
import { Provider } from "react-redux"
import App from "./App"
import { storeFactory } from "./utils/tests"
import { Store, AnyAction } from "redux"
import { State } from "./store/reducers/GuessWord"

describe("App component", () => {
  let mockStore: Store<State, AnyAction> & { dispatch: unknown }

  function setup(customState = {}) {
    const defaultState = {
      success: false,
      guessedWords: [],
      secretWord: ""
    }

    const initialState = { ...defaultState, ...customState }

    mockStore = storeFactory(initialState)
    return mount(<Provider store={mockStore}><App /></Provider>)
  }

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  test("renders correctly", () => {
    expect(setup()).toHaveLength(1)
  })

  test("`getSecretWord` runs on App mount", async () => {
    setup()

    expect(mockStore.getState().secretWord).toBe("")

    await sleep(500)

    expect(mockStore.getState().secretWord).not.toBe("")
  })
})