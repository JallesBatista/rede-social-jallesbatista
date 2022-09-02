import { Home } from "../../../pages/login-cadastro/index.js";
import { instance } from "../axios.js";
import { Render } from "../render/render.js";



export class Requests {
    static async login(data){
        const userLogin = await instance
            .post("/users/login/", data)
            .then((resp) => {
                console.log(resp)
                localStorage.setItem("@kenzieRedeSocial:token", resp.data.token)
                localStorage.setItem("@kenzieRedeSocial:userId", resp.data.user_uuid)
                return resp
            })
            .catch(err => {
                console.log(err)
                Render.modalErro("Credenciais Inválidas.")
                Home.modalRemove()
            })

        return userLogin
    }

    static async cadastro(data){
        const userCadastro = await instance
            .post("/users/", data)
            .then((resp) =>{
                console.log(resp)
                return resp
            })
            .catch(err => {
                console.log(err)
                Render.modalErro(err.response.data.email[0])
                Home.modalRemove()
            })

        return userCadastro
    }



    
}