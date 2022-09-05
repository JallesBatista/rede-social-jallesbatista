import { Requests } from "../../scripts/models/requires/request.js"
import { Verify } from "../../scripts/models/verify/verify.js"

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

        formLogin.addEventListener("submit", async(event)=>{
            event.preventDefault()
            const emailLogin = document.getElementById("email-login")
            const senhaLogin = document.getElementById("senha-login")

            const data = {
                email: emailLogin.value,
                password: senhaLogin.value
            }

          Requests.login(data)
        })

        formCadastro.addEventListener("submit", async(event)=>{
            event.preventDefault()
            const cadastroNome = document.getElementById("nome-cadastro")
            const cadastroEmail= document.getElementById("email-cadastro")
            const cadastroSenha = document.getElementById("senha-cadastro")
            const cadastroJob = document.getElementById("job-cadastro")
            const cadastroUrl = document.getElementById("url-cadastro")

            const data = {
                username: cadastroNome.value, 
                email: cadastroEmail.value,
                password: cadastroSenha.value,
                work_at: cadastroJob.value,
                image: cadastroUrl.value
            }
           Requests.cadastro(data)
           
        })

    }
}
Verify.loginCheck()

Home.btnMenuVerif()
Home.CadastroLoginToggle()
Home.loginCadastro()

