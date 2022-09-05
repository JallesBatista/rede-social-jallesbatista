import { instance, token } from "../axios.js";
import { Render } from "../render/render.js";

export class Requests {

    static userId = localStorage.getItem("@kenzieRedeSocial:userId")

    static loginCheck(){
        if(!token){
               window.location.assign("/src/pages/login-cadastro/index.html")
        }else {

        }
    }
    
    static async login(data){
        const userLogin = await instance
            .post("/users/login/", data)
            .then((resp) => {
                // console.log(resp)
                localStorage.setItem("@kenzieRedeSocial:token", resp.data.token)
                localStorage.setItem("@kenzieRedeSocial:userId", resp.data.user_uuid)
                window.location.assign("/src/pages/dashboard/index.html")
                return resp
            })
            .catch(err => {
                console.log(err)
                Render.modalErro("Credenciais Inválidas.")
                Render.modalRemove()
            })

        return userLogin
    }

    static async cadastro(data){
        const userCadastro = await instance
            .post("/users/", data)
            .then((resp) =>{
                // console.log(resp)
                return resp
            })
            .catch(err => {
                console.log(err)
                Render.modalErro(err.response.data.email[0])
                Render.modalErroRemove()
            })

        return userCadastro
    }

    
    static async getUsers(limit, offset){
        const usersData = await instance
        .get(`/users/?limit=${limit}&offset=${offset}`)
        .then((resp) => {
                // console.log(resp)
                return resp
            })
            .catch((err)=> {
                console.log(err)
            })
        return usersData
    }
    
    static async mainUserData(){
        const userData = await instance
        .get(`/users/${this.userId}/`)
        .then((resp) => {
            // console.log(resp)
            return resp
        })
        .catch((err)=> {
            console.log(err)
        })
        return userData
    }
    
    static async getPosts(limit, offset){
        const postsData = await instance
        .get(`/posts/?limit=${limit}&offset=${offset}`)
        .then((resp) => {
            // console.log(resp)
            return resp
        })
        .catch((err)=> {
            console.log(err)
        })
        return postsData
    }
    
    static async postPublish(data){
        const userPost = await instance
        .post("/posts/", data)
        .then((resp) =>{
            // console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
        })

    return userPost
    }

    static async like(data){
        const postLike = await instance
        .post("/likes/", data)
        .then((resp) =>{
            // console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
        })

        return postLike
    }   

    static async deslike(data){
       await instance
        .delete(`/likes/${data}/`)
        .then((resp) =>{
            // console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
        })

    }

    static async follow(data){
        const userFollow = await instance
        .post("/users/follow/", data)
        .then((resp) =>{
            // console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
        })

        return userFollow
    }
    
    static async unfollow(data){
        const userUnfollow = await instance
        .delete(`/users/unfollow/${data}/`, )
        .then((resp) =>{
            // console.log(resp)
            return resp
        })
        .catch(err => {
            console.log(err)
        })

        return userUnfollow
    }
}