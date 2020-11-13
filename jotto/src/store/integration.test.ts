import { storeFactory } from "../utils/tests"
import { guessWordActions } from "./actions/GuessWord"

describe("guessWord action dispatcher", () => {
  const secretWord = "party"
  const wrongGuess = "train"

  describe("when no words were guessed", () => {
    let store: any
    const initialState = { 
      secretWord,
      success: false,
      guessedWords: [] 
    }
    beforeEach(() => {
      store = storeFactory(initialState)
    })

    test("updates state correctly for wrong guess", () => {
      store.dispatch(guessWordActions.guessWord(wrongGuess))
      const expectedState = { 
        ...initialState, 
        guessedWords: [
          { guessedWord: wrongGuess, letterMatchCount: 3 }
        ] 
      }

      expect(store.getState()).toEqual(expectedState)
    })

    test("updates state correctly for correct guess", () => {
      store.dispatch(guessWordActions.guessWord(secretWord))
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [
          { guessedWord: secretWord, letterMatchCount: 5 }
        ]
      }

      expect(store.getState()).toEqual(expectedState)
    })
  })
 
  describe("when some words were guessed", () => {
    const guessedWords = [
      { guessedWord: "agile", letterMatchCount: 1 }
    ]
    
    const initialState = { 
      success: false,
      guessedWords,
      secretWord
    }

    let store: any
    beforeEach(() => {
      store = storeFactory(initialState)
    })

    test("updates state correctly for wrong guess", () => {
      store.dispatch(guessWordActions.guessWord(wrongGuess))

      const expectedState = {
        ...initialState,
        guessedWords: [
          ...initialState.guessedWords,
          { guessedWord: wrongGuess, letterMatchCount: 3 }
        ]
      }

      expect(store.getState()).toEqual(expectedState)
    })

    test("updates state correctly for correct guess", () => {
      store.dispatch(guessWordActions.guessWord(secretWord))

      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [
          ...initialState.guessedWords,
          { guessedWord: secretWord, letterMatchCount: 5 }
        ]
      }

      expect(store.getState()).toEqual(expectedState)
    })
  })
})