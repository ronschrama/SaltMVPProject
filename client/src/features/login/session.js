import Cookies from 'js-cookie'

export const getSession = () => {
  const jwt = Cookies.get('authToken')
  let session
  try {
    if (jwt) {
      const base64Url = jwt.split('.')[1]
      const base64 = base64Url.replace('-', '+').replace('_', '/')
      session = JSON.parse(window.atob(base64))
    }
  } catch (error) {
    console.log(error)
  }
  return session
}
export const logOut = () => {
  Cookies.remove('authToken')
}

export default getSession;