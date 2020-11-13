import { AnyAction } from "redux";
import { actionTypes } from "../../actions/GuessWord"

interface GuessedWord {
  guessedWord: string,
  letterMatchCount: number
}

export interface State {
  success: boolean,
  guessedWords: GuessedWord[],
  secretWord: string
}

const initialState: State = {
  success: false,
  guessedWords: [],
  secretWord: ""
}

function GuessWordReducer(state = initialState, action: AnyAction) {
  function addGuessedWord(payload: GuessedWord) {
    return {
      ...state,
      guessedWords: [
        ...state.guessedWords,
        { guessedWord: payload.guessedWord, letterMatchCount: payload.letterMatchCount }
      ]
    }
  }

  function setSuccess() {
    return {
      ...state,
      success: true
    }
  }

  function setSecretWord(payload: { secretWord: string }) {
    return {
      ...state,
      secretWord: payload.secretWord
    }
  }

  switch (action.type) {
    case actionTypes.GUESS_WORD: return addGuessedWord(action.payload)
    case actionTypes.CORRECT_GUESS: return setSuccess()
    case actionTypes.SET_SECRET_WORD: return setSecretWord(action.payload)
    default: return state
  }
}

export default GuessWordReducer