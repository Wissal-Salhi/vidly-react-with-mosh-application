import http from "./httpService"
import jwtDecode from "jwt-decode";

const apiEndpoint = "/auth";

http.setJwt(getJwt());

export async function login(email,password) {
    const {data : jwt} = await http.post(apiEndpoint, {email,password });
    localStorage.setItem('token',jwt);
  }

export function loginWithJwt(jwt){
    localStorage.setItem("token",jwt)
}

export function logout() {
    localStorage.removeItem('token');
}

export function getCurrentUser() {
    try {
        const jwt =  localStorage.getItem('token');  
        return jwtDecode(jwt);
      } catch (ex) {
        return null;
      }
}

export function getJwt() {
    return localStorage.getItem('token');
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
} ;
