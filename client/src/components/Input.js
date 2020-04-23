import React, { propTypes } from 'react';

function Input({ name, handleChange, type }) {
  return (
    <input
      placeholder={name}
      onChange={(e) => handleChange(e.target.value)}
      type={type}
    />
  );
}

Input.propTypes = {
  
};
export default Input;
