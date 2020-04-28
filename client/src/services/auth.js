import Cookies from 'js-cookie';

function isAuthenticated() {
  const authToken = Cookies.get('authToken');

  return typeof authToken !== 'undefined' ;
}

export default isAuthenticated;
