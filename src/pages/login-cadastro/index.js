import { Render } from "../../scripts/models/render/render.js"
import { Requests } from "../../scripts/models/requires/request.js"

class Home{
    static btnMenuVerif(){
        const btnMenuLogin  = document.querySelector(".button-menu--login")
        const btnMenuCadastro  = document.querySelector(".button-menu--cadastro ")
        const cardLogin = document.querySelector(".card-login")
        if(cardLogin.style.display !== "none"){
            btnMenuLogin.style.backgroundColor = "#495057"
            btnMenuCadastro.style.backgroundColor = "#212529"
        }else{
            btnMenuCadastro.style.backgroundColor = "#495057"
            btnMenuLogin.style.backgroundColor = "#212529"
        }
    }

    static CadastroLoginToggle(){
        const btnAbrirCadastroList = document.querySelectorAll("[data-redirect-control]")
        const cardLogin = document.querySelector(".card-login")
        const cardCadastro = document.querySelector(".card-cadastro")
        const inputsLogin = document.querySelectorAll(".card-login .input-group input")
        const inputsCadastro = document.querySelectorAll(".card-cadastro .input-group input")
        
        btnAbrirCadastroList.forEach(btn => {
            btn.addEventListener("click", (event)=>{
                let dataRedirectControlValue = btn.getAttribute("data-redirect-control")
                if(dataRedirectControlValue == "cadastro"){
                    cardCadastro.style.display = "block"
                    cardLogin.style.display = "none"
                    this.btnMenuVerif()
                    inputsLogin.forEach(input => input.value = "")
                }else{
                    cardCadastro.style.display = "none"
                    cardLogin.style.display = "block"
                    this.btnMenuVerif()
                    inputsCadastro.forEach(input => input.value = "")
                }
            })

        })

    } 

    static async loginCadastro(){
        const formLogin = document.querySelector(".card-login form")
        const formCadastro  = document.querySelector(".card-cadastro form")
        const inputs  = document.querySelectorAll(".card .input-group")

        formLogin.addEventListener("submit", async(event)=>{
            event.preventDefault()
            const emailLogin = document.getElementById("email-login")
            const senhaLogin = document.getElementById("senha-login")

            const data = {
                email: emailLogin.value,
                password: senhaLogin.value
            }

           await Requests.login(data)

            
        })

        formCadastro.addEventListener("submit", async(event)=>{
            event.preventDefault()
            const cadastroNome = document.getElementById("nome-cadastro")
            const cadastroEmail= document.getElementById("email-cadastro")
            const cadastroSenha = document.getElementById("senha-cadastro")
            const cadastroJob = document.getElementById("job-cadastro")
            const cadastroUrl = document.getElementById("url-cadastro")

            const data = {
                username: `${cadastroNome.value}`, 
                email: `${cadastroEmail.value}`,
                password: `${cadastroSenha.value}`,
                work_at: `${cadastroJob.value}`,
                image: `${cadastroUrl.value}`
            }

           await Requests.cadastro(data)

            
        })
    }
}

Home.btnMenuVerif()
Home.CadastroLoginToggle()

Home.loginCadastro()
let modeloLogin= {
    "email": "teste@gmail.com", 
    "password": "1234"
}

let modeloCadastro= {
    "username": "testeacasaasd", 
    "email": "testeabcasdmkasdkjd@gmail.com",
    "password": "1234",
    "work_at": "Develop",
    "image": "https://picsum.photos/200/300"
}

// Requests.login(modeloLogin)
// Requests.cadastro(modeloCadastro)

