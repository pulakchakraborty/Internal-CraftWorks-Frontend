'use strict';


export default class UserService {

    static get $inject(){
        return ['$http', '$window','API_URL', 'Upload'];
    }

    constructor($http,$window,API_URL,Upload) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;
        this.Upload = Upload;
    }

    static get name(){
        return 'UserService';
    }
/*
    signup(signup) {
        return this.$http.post(`${ this.API_URL }/user/signup`, signup);
    }
*/
    signup(signup) {
        let url = `${ this.API_URL }/user/signup`;
        return this.Upload.upload({
            url: url,
            data: signup
        }).then(responce => {
            console.log("inside promise");
            return new Promise((resolve, reject) => {
                console.log("inside return promise");
                resolve(responce.data);
            });
        }, responce => {
            console.log("inside unsuccessful promise");
            return new Promise((resolve, reject) => {
                console.log("inside unsucessful return promise");
                resolve(responce.data);
            });
        });
    }

    login(user, pass) {
        return this.$http.post(`${ this.API_URL }/user/login`, {
            username: user,
            password: pass
        });
    }

    logout(){
        this.$window.localStorage.removeItem('jwtToken');
    }

    getCurrentUser() {
        let token = this.$window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(this.$window.atob(base64)).user;
    }

    // this method would fetch user information from backend
    getCurrentUserInfo(user_id) {

        console.log(user_id);
        let url = `${ this.API_URL}${'/user/'}${ user_id }`;
        return this.$http.get(url).then(responce => {

            //return responce.data;
            return new Promise((resolve, reject) => {
                resolve(responce.data);

            })

        });
    }

    isAuthenticated() {
        return !!this.$window.localStorage['jwtToken'];
    }


}
