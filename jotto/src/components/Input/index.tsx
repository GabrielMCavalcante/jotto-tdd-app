import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../store/reducers/GuessWord"
import { guessWordActions } from "../../store/actions/GuessWord"

function Input() {
  const wordGuessed = useSelector((state: State) => state.success)
  const dispatch = useDispatch()
  const { guessWord } = guessWordActions
  const [userGuess, setUserGuess] = useState("")

  function submitGuess(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(guessWord(userGuess))
    setUserGuess("")
  }

  return (
    wordGuessed
      ? null
      : (
        <form onSubmit={submitGuess} className="form-inline" data-test="input-component">
          <input
            id="guess-input"
            className="mb-2 mx-sm-3"
            data-test="guess-input"
            placeholder="Type a word to guess"
            value={userGuess}
            onChange={e => setUserGuess(e.target.value)}
          />
          <button
            data-test="guess-button"
            type="submit"
            className="btn btn-primary mb-2"
          >Guess</button>
        </form>
      )
  )
}

export default Input