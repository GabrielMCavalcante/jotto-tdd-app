import { ThunkDispatch } from "redux-thunk"
import getLetterMatchCount from "../../helpers/getLetterMatchCount"
import { State } from "../../reducers/GuessWord"
import axios from "axios"

export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
  GUESS_WORD: "GUESS_WORD",
  SET_SECRET_WORD: "SET_SECRET_WORD"
}

export const guessWordActions = {
  guessWord(guessedWord: string) {
    return function (dispatch: ThunkDispatch<any, any, any>, getState: () => State) {
      const state = getState()
      const secretWord = state.secretWord

      const letterMatchCount = getLetterMatchCount(guessedWord, secretWord)

      dispatch({ type: actionTypes.GUESS_WORD, payload: { guessedWord, letterMatchCount } })

      if (guessedWord === secretWord) {
        dispatch({ type: actionTypes.CORRECT_GUESS })
      }
    }
  },
 
  getSecretWord() {
    return async function (dispatch: ThunkDispatch<any, any, any>) {
      const response = await axios.get("http://localhost:3030")
      dispatch({
        type: actionTypes.SET_SECRET_WORD,
        payload: { secretWord: response.data }
      })
    }
  }
}