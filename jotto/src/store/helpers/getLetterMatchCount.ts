export default function getLetterMatchCount(wordGuessed: string, secretWord: string) {
  let count = 0
  const wordGuessedSet = new Set(wordGuessed.split(''))
  const secretWordSet = new Set(secretWord.split(''))

  for (const letter of wordGuessedSet.values()) {
    if (secretWordSet.has(letter)) {
      count++
    }
  }

  return count
}