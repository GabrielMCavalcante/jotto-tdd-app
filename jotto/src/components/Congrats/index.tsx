import React from "react"
import PropTypes from "prop-types"


const Congrats: React.FC<{ success?: boolean }> = ({ success }) => {
  return (
    <div data-test="congrats-component" className={success ? "alert alert-success" : ""}>
      {
        success
          && (
            <p>Congratulations you guessed the word!</p>
          )
      }
    </div>
  )
}

Congrats.propTypes = {
  success: PropTypes.bool
}

export default Congrats