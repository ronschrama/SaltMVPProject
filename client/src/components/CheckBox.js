import React from 'react'

function CheckBox({ children }) {
  return (
    <div>
      <input id="check" type="checkbox" />
      <label htmlFor="check">{children}</label>
    </div>
  )
}

export default CheckBox

