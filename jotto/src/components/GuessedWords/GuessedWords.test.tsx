import React from "react"
import { shallow } from "enzyme"
import GuessedWords from "."
import { checkProps, findByTestAttr } from "../../utils/tests"

const defaultProps = {
  guessedWords: [
    {
      guessedWord: "train",
      letterMatchCount: 3
    }
  ]
}

describe("GuessedWords component", () => {
  function setup(props = {}) {
    return shallow(<GuessedWords {...{...defaultProps, ...props}}/>)
  }

  test("renders correctly", () => {
    const wrapper = setup()

    expect(wrapper.length).toBe(1)
  })

  test("does not throw warning with expected props", () => {
    checkProps(GuessedWords, defaultProps)
  })

  describe("When there are no words guessed", () => {
    const wrapper = setup({ guessedWords: [] })
    
    test("renders correctly", () => {
      expect(findByTestAttr(wrapper, "guessed-words-component").length).toBe(1)
    })

    test("renders instructions to guess a word", () => {
      expect(findByTestAttr(wrapper, "guessed-words-instructions").length).toBe(1)  
    })
  })

  describe("When there are some words guessed", () => {
    const guessedWords = [
      { guessedWord: "house", letterMatchCount: 3 },
      { guessedWord: "night", letterMatchCount: 0 },
      { guessedWord: "cause", letterMatchCount: 2 },
      { guessedWord: "cause", letterMatchCount: 2 },
      { guessedWord: "cause", letterMatchCount: 2 },
      { guessedWord: "cause", letterMatchCount: 2 },
    ]
    const wrapper = setup({ guessedWords })

    test("renders correctly", () => {
      expect(findByTestAttr(wrapper, "guessed-words-component").length).toBe(1)
    })

    test("renders 'guessed words' section", () => {
      expect(findByTestAttr(wrapper, "guessed-words").length).toBe(1)
    })

    test("renders correct number of guessed words", () => {
      const guessedWordsSectionNode = findByTestAttr(wrapper, "guessed-word")
      
      expect(guessedWordsSectionNode.length).toBe(guessedWords.length)
    })
  })
})