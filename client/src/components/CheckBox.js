import React from 'react'

function CheckBox({ children }) {
  return (
    <div>
      <input id="check" type="checkbox" />
      <label for="check">{children}</label>
    </div>
  )
}

export default CheckBox

