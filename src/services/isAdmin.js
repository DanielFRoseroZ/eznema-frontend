import parseJwt from '../utils/parseJWT';


export default function isAdmin(token) {
  if (token !== undefined) {
      const user = parseJwt(token);
      if (user.role === "ADMIN") {
        return true;
      } else {
        return false;
      }
  } else {
    return false;
  }
}