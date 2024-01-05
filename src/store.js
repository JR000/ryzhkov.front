import { makeAutoObservable } from "mobx";
import AuthService, { BookService } from "./api.auth.js";

class Store {   
  isAuth = false;
  isAuthInProgress = false;
  authError = null;
  user = null

  sourceNotFound = false

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async login(email, password) {
    this.authError = ""
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.login(email, password);
      localStorage.setItem("token", resp.data.token);
    this.getUser()

      this.isAuth = true;

     } catch (err) {
            if (err.code ==  401)
                this.authError = "Not valid password or username"
            else if (err.code == 'ERR_BAD_REQUEST')
                this.authError = "Email not verified"
            else
                this.authError = "Error"
     } finally {
      this.isAuthInProgress = false;
    } 
  }

  async register(email, password) {
    this.authError = ""
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.register(email, password);

     } catch (err) {
            if (err.code == 400)
              this.authError = "Invalid email"
            else if (err.code ==  401)
                this.authError = "Invalid password or username"
            else if (err.code == 'ERR_BAD_REQUEST')
                this.authError = "Email is not verified"
            else
                this.authError = "Error"
     } finally {
      this.isAuthInProgress = false;
    } 
  }

  async verify_email(token) {
    this.authError = ""
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.verify_email(token);

     } catch (err) {
            if (err.code ==  401)
                this.authError = "Not valid password or username"
            else if (err.code == 'ERR_BAD_REQUEST')
                this.authError = "Email not verified"
            else
                this.authError = "Error"
     } finally {
      this.isAuthInProgress = false;
    } 
  }

  async checkAuth() {
    this.isAuthInProgress = true;
    try {
      const resp = await AuthService.refresh();
      localStorage.setItem("token", resp.data.accessToken);
      this.isAuth = true;
      this.isAuthInProgress = false;

     } catch (err) {

        this.isAuthInProgress = false;

     } finally {
      this.isAuthInProgress = false;
    } 
  }

  async logout() {
    this.isAuthInProgress = true;
    try {
      await AuthService.logout();
      this.isAuth = false;
      localStorage.removeItem("token");
    } catch (err) {
      // console.log("logout error");
    } finally {
      this.isAuthInProgress = false;
    } 
  }
  

  async fetchFolder(path) {
    try {
        this.sourceNotFound = false
        return (await BookService.fetchFolder(path)).data
    } catch (err) {
        this.sourceNotFound = true
    }
  }

  async fetchBookInfo(id) {
    try {
        this.sourceNotFound = false
        return (await BookService.fetchBookInfo(id)).data
    } catch (err) {
        this.sourceNotFound = true
    }
  }

  async getUser() {
    try {
        this.user = (await AuthService.getUser()).data
    } catch (err) {
        this.user = null
    }
  }
}

export default new Store();