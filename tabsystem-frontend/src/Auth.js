import { Register, Login, Logout } from "./Api/Auth";

class Auth {
  constructor() {
    this.authenticated = false;
    this.admin = false;
    this.message = "";
    this.registerMessage = "";
    if (localStorage.getItem("token")) {
      this.authenticated = true;
    }
    if (localStorage.getItem("token") && localStorage.getItem("admin")) {
      this.authenticated = true;
      this.admin = true;
    }
  }

  async register(cb, newUser) {
    const data = await Register(newUser);
    console.log(data);
    if (data.success) {
      console.log("register success");
      this.registerMessage = "Successfully registered user.";
      console.log(this.registerMessage);
    } else {
      console.log("register false");
      this.registerMessage = "Something went wrong";
    }
    cb(this.registerMessage);
  }

  async login(cb, user) {
    const data = await Login(user);
    if (data.success) {
      localStorage.setItem("token", data.data.api_token);
      this.authenticated = true;
      if (data.data.user.admin) {
        localStorage.setItem("admin", true);
        this.admin = true;
      }
    } else {
      this.message = "Username or password incorrect.";
      localStorage.removeItem("token");
      this.authenticated = false;
    }

    await cb(this.admin);
  }

  async logout(cb) {
    Logout();
    this.authenticated = false;
    this.admin = false;
    cb();
  }
  isAuthenticated() {
    return this.authenticated;
  }
  isAdmin() {
    return this.admin;
  }
  getMessage() {
    return this.message;
  }
  getRegisterMessage() {
    return this.registerMessage;
  }
}

export default new Auth();
