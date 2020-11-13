import React from "react"
import { shallow } from "enzyme"
import Congrats from "."
import { findByTestAttr, checkProps } from "../../utils/tests"

const defaultProps = { success: false }

describe("Congrats component", () => {

  function setup(props = {}) {
    const setupProps = { ...defaultProps, ...props }
    return shallow(<Congrats {...setupProps} />)
  }

  const wrapper = setup()

  test("renders correctly", () => {
    expect(findByTestAttr(wrapper, "congrats-component").length).toBe(1)
  })

  test("does not throw warning with expected props", () => {
    const expectedProps = { success: false }
    checkProps(Congrats, expectedProps)
  })

  describe("When rendering success text", () => { 
    test("does not render when `success` prop is false", () => {
      const tempWrapper = setup({ success: false })

      expect(tempWrapper.text()).toBe("")
    })
  
    test("renders when `success` prop is true", () => {
      const tempWrapper = setup({ success: true })

      expect(tempWrapper.text().length).toBeGreaterThan(0)
    })
  })
})