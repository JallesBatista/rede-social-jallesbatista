import { Render } from "../../scripts/models/render/render.js";
import { Requests } from "../../scripts/models/requires/request.js";
import { Verify } from "../../scripts/models/verify/verify.js";


class Dashboard{

    static logOut(){
        const btnLogout = document.querySelector(".button-menu--logout")
        btnLogout.addEventListener("click", ()=>{
            localStorage.clear()
            window.location.assign("/src/pages/login-cadastro/index.html")
        })
    }
    static userPublish(){
        const title = document.getElementById("message-title")
        const content = document.getElementById("message-content")
        const messageForm   = document.querySelector(".mainUser__message")

        messageForm.addEventListener("submit", (event)=>{
            event.preventDefault()

            const data = {
                title : title.value,
                description: content.value
            }

            Requests.postPublish(data)
            title.value =  ""
            content.value = ""
        })
    }

    static postPagination(){
        window.addEventListener("scroll", ()=>{
            if(Math.ceil(window.scrollY + window.innerHeight) == document.documentElement.scrollHeight){
                Verify.likeCheck()
            }
        })
    }

    static openPost(){
        const btnPost   = document.querySelectorAll(".post__buttons .button-grey1")
        btnPost.forEach(btn => {
            btn.addEventListener("click", (event)=>{
                const posts     = document.querySelectorAll(".posts__list .post__item")
                posts.forEach(post =>{
                    if(post.id == btn.id){
                        let name    = post.childNodes[0].childNodes[1].childNodes[0].innerText
                        let job     = post.childNodes[0].childNodes[1].childNodes[1].innerText
                        let image   = post.childNodes[0].childNodes[0].currentSrc
                        let title   = post.childNodes[1].childNodes[0].innerText
                        let content = post.childNodes[1].childNodes[1].innerText

                       Render.modalPost(name,job,image,title,content)
                       Render.modalRemove()
                    }
                })
            })
        })
    }
    
    static async like(){
        const btnLike = document.querySelectorAll(".button-like")
        btnLike.forEach(btn =>{
            btn.addEventListener("click", async()=>{
                let data ={
                    "post_uuid" : `${btn.id}`
                    }

                if(!btn.classList.contains("liked")){
                    btn.classList.add("liked")
                    btn.childNodes[1].innerText =   +btn.childNodes[1].innerText + 1
                    await Requests.like(data)
                    .then(resp => btn.setAttribute("like", resp.data.uuid))
                }
                else if(btn.classList.contains("liked")){
                    btn.childNodes[1].innerText =   +btn.childNodes[1].innerText - 1
                    btn.classList.remove("liked")
                    const likeId = btn.getAttribute("like")
                    await Requests.deslike(likeId)
                    .then(resp => btn.removeAttribute("like"))
                }
            })
        })
    }


    static async follow(){
        const btnFollow = document.querySelectorAll(".button-follow")
        btnFollow.forEach(btn =>{
            btn.addEventListener("click", async()=>{
                let data = {
                    following_users_uuid: btn.id
                }

                if(btn.innerText == "Seguir"){
                    btn.innerText = "Seguindo"
                    btn.classList.remove("button-outline")
                    btn.classList.add("button-primary")
                    await Requests.follow(data)
                    .then(resp => btn.setAttribute("follow", resp.data.uuid))
                }
                else{
                    btn.innerText = "Seguir"
                    btn.classList.add("button-outline")
                    btn.classList.remove("button-primary")
                    const followId = btn.getAttribute("follow")
                    Requests.unfollow(followId)
                    .then(resp => btn.removeAttribute("follow"))
                }   
            })
        })
    }
}

Verify.loginCheck()
Dashboard.logOut()

Render.renderUserProfile()
Dashboard.userPublish()


Verify.likeCheck()
.then(resp => {
    Dashboard.openPost()
    Dashboard.like()
    Dashboard.postPagination()
})

Verify.followCheck()
.then(resp => Dashboard.follow())
