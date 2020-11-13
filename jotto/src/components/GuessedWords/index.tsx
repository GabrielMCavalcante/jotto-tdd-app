import React from "react"
import PropTypes from "prop-types"

interface GuessedWord {
  guessedWord: string,
  letterMatchCount: number
}

interface GuessedWordsProps {
  guessedWords: GuessedWord[]
}

const GuessedWords: React.FC<GuessedWordsProps> = ({ guessedWords }) => {
  return (
    <div data-test="guessed-words-component">
      {
        guessedWords.length === 0
          ? (
            <p data-test="guessed-words-instructions">
              Type a word and click the button to guess it!
            </p>
          )
          : (
            <div data-test="guessed-words">
              <table className="table table-sm">
                <thead className="thead-light">
                  <tr>
                    <th>Guess</th>
                    <th>Matching Letters</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    guessedWords.map((word, i) => (
                      <tr key={i} data-test="guessed-word">
                        <td>{word.guessedWord}</td><td>{word.letterMatchCount}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

          )
      }
    </div>
  )
}

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(PropTypes.shape({
    guessedWord: PropTypes.string.isRequired,
    letterMatchCount: PropTypes.number.isRequired
  }).isRequired).isRequired
}

export default GuessedWords