
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

        btnAbrirCadastroList.forEach(btn => {
            btn.addEventListener("click", (event)=>{
                let dataRedirectControlValue = btn.getAttribute("data-redirect-control")
                if(dataRedirectControlValue == "cadastro"){
                    cardCadastro.style.display = "block"
                    cardLogin.style.display = "none"
                    this.btnMenuVerif()
                }else{
                    cardCadastro.style.display = "none"
                    cardLogin.style.display = "block"
                    this.btnMenuVerif()
                }
            })

        })

    }
    
}

Home.btnMenuVerif()
Home.CadastroLoginToggle()