import moxios from "moxios"
import { actionTypes, guessWordActions } from "."
import { storeFactory } from "../../../utils/tests"

describe("Guess word actions", () => {
  const guessedWord = "train"
  const secretWord = "party"

  const { getSecretWord, guessWord } = guessWordActions

  describe("`guessWord` action creator", () => {
    const initialState = {
      secretWord,
      success: false,
      guessedWords: []
    }

    let dispatch: jest.Mock<any, any>
    beforeEach(() => {
      dispatch = jest.fn()
    })

    test("dispatches action `GUESS_WORD` with correct payload", () => {
      guessWord(guessedWord)(dispatch, () => initialState)

      const expectedPayload = {
        guessedWord,
        letterMatchCount: 3
      }

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.GUESS_WORD,
        payload: expectedPayload
      })
    })

    test("dispatches action `CORRECT_GUESS` when secret word was guessed", () => {
      guessWord(secretWord)(dispatch, () => initialState)

      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.CORRECT_GUESS
      })
    })
  })

  describe("`getSecretWord` action creator", () => {
    const initialState = {
      secretWord: "",
      success: false,
      guessedWords: []
    }

    let store: any
    beforeEach(() => {
      moxios.install()
      store = storeFactory(initialState)

      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({ 
          status: 200,
          response: secretWord
        })
      })
    })

    afterEach(() => {
      moxios.uninstall()
    })

    test("dispatches action `SET_SECRET_WORD` with correct payload", () => {
      const dispatch = jest.fn()
      const expectedPayload = { secretWord }

      return getSecretWord()(dispatch)
        .then(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: actionTypes.SET_SECRET_WORD,
            payload: expectedPayload
          })
        })
    })

    test("adds response word to state", () => {
      return store.dispatch(getSecretWord())
        .then(() => {
          const newState = store.getState()

          expect(newState.secretWord).toBe(secretWord)
        })
    })
  })
})