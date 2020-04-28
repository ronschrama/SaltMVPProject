import Cookies from 'js-cookie';

function isAuthenticated() {
  const authToken = Cookies.get('authToken');
  console.log(authToken, typeof authToken);
  return typeof authToken !== 'undefined';
}

export default isAuthenticated;
