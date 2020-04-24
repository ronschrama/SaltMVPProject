// import React from 'react';

// function Input({ name, type, forwardedRef }) {
//   return (
//     <input
//       ref={forwardedRef}
//       placeholder={name}
//       type={type}
//     />
//   );
// }

// export default Input;

import React from 'react';

function Input(props) {
  return (
    <input
      placeholder={props.name}
      // ref={props.ref}
      onChange={(e) => props.handleChange(e.target.value)}
      type={props.type}
    />
  );
}

export default Input;
