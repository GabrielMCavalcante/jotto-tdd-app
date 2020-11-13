import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import GuessedWords from "./components/GuessedWords"
import Congrats from "./components/Congrats"
import Input from "./components/Input"
import { State } from "./store/reducers/GuessWord"
import { guessWordActions } from "./store/actions/GuessWord"

function App() {
  const guessedWords = useSelector((state: State) => state.guessedWords)
  const success = useSelector((state: State) => state.success)
  const { getSecretWord } = guessWordActions
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSecretWord())
  }, [])

  return (
    <div className="container">
      <h1>Jotto</h1>
      <Input />
      <Congrats success={success}/>
      <GuessedWords guessedWords={guessedWords}/>
    </div>
  )
}

export default App
