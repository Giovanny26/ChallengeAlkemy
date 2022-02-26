import axios from "axios";

export default class LoginService{
    baseUrl = "http://challenge-react.alkemy.org/";
    login(payload){
        return axios.post(this.baseUrl, payload).then (res => res);
    }
}