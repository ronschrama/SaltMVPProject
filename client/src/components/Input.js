import React from 'react';

function Input({ name, handleChange, type }) {
  return (
    <input
      placeholder={name}
      onChange={(e) => handleChange(e.target.value)}
      type={type}
    />
  );
}

export default Input;
