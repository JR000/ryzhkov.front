import { instance } from "./api.config.js";

const API_HOST = "http://localhost:5001"

const AuthService =  {

    login (email, password) {
        return instance.post("/api/login", null, {params: {email, password}})
    },

    register (email, password) {
        return instance.post("/api/register", null, {params: {email, password}})
    },

    verify_email (token) {
        return instance.post("/api/verify", null, {params: {token}})
    },
    
    
    getUser() {
        return instance.get("/api/user")
    }
}

const BookService = {
    fetchFolder (path) {
        return instance.get("/api/folder/" + path)
    },
    fetchBookInfo (id) {
        return instance.get("/api/book/" + id)
    }
}

export { BookService } 
export default AuthService