import getLetterMatchCount from "./getLetterMatchCount"

describe("`getLetterMatchCount` helper function", () => {
  test("returns correct count when no letters match", () => {
    expect(getLetterMatchCount("mouse", "train")).toBe(0)
  })

  test("returns correct count when some letters match", () => {
    expect(getLetterMatchCount("mouse", "chase")).toBe(2)
  })

  test("returns correct count when all letters match", () => {
    expect(getLetterMatchCount("mouse", "mouse")).toBe(5)
  })

  test("returns correct count when there are duplicate letters", () => {
    expect(getLetterMatchCount("souls", "daisy")).toBe(1)
  })
})