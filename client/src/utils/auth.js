import decode from "jwt-decode";

class AuthService {
  // Retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if the user is still logged in
  loggedIn() {
    // Checks for a valid, saved token
    const token = this.getToken();

    // Use type coersion to check if token is NOT undefined and the token is NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  // Check if token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // Retrieve token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  // Set token to localStorage and reload page to homepage
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  // Clear token from localStorage & force logout w/reload
  logout() {
    localStorage.removeItem("id_token");

    window.location.assign("/");
  }
}

export default new AuthService();
