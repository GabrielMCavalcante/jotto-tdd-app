import React from "react"
import { mount } from "enzyme"
import { Provider } from "react-redux"
import Input from "."
import { findByTestAttr, storeFactory } from "../../utils/tests"
import { Store, AnyAction } from "redux"
import { State } from "../../store/reducers/GuessWord"

describe("Input component", () => {
  let mockStore: Store<State, AnyAction> & { dispatch: unknown }

  function setup(initialState = {}) {
    const defaultState = {
      success: false,
      guessedWords: [],
      secretWord: "party"
    }

    const state = { ...defaultState, ...initialState }

    mockStore = storeFactory(state)

    return mount(<Provider store={mockStore}><Input /></Provider>)
  }

  test("renders correctly", () => {
    const wrapper = setup({ success: false })
    expect(wrapper.length).toBe(1)
  })

  describe("when word has not been correctly guessed", () => {
    const wrapper = setup({ success: false })

    test("renders input box", () => {
      expect(findByTestAttr(wrapper, "guess-input").length).toBe(1)
    })

    test("renders guess button", () => {
      expect(findByTestAttr(wrapper, "guess-button").length).toBe(1)
    })
  })

  describe("when word has been guessed", () => {
    const wrapper = setup({ success: true })

    test("does not render input box", () => {
      expect(findByTestAttr(wrapper, "guess-input").length).toBe(0)
    })

    test("does not render guess button", () => {
      expect(findByTestAttr(wrapper, "guess-button").length).toBe(0)
    })
  })
})