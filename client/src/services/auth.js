import Cookies from 'js-cookie';

function isAuthenticated() {
  const authToken = Cookies.get('authToken');

  return authToken !== 'undefined';
}

export default isAuthenticated;
