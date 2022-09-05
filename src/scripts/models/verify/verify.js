import { token } from "../axios.js"
import { Render } from "../render/render.js"
import { Requests } from "../requires/request.js"


export class Verify{

    static loginCheck(){
        if(token && window.location.href.includes("login-cadastro/index.html")){
            window.location.assign("/src/pages/dashboard/index.html")
        }else if(!token && window.location.href.includes("dashboard/index.html")){
            window.location.assign("/src/pages/login-cadastro/index.html")
        }
    }
    
    static async followCheck(){
        const mainUser = await  Requests.mainUserData()
        const following = mainUser.data.following
        let mainUserFollowList = []
        following.forEach(follow => mainUserFollowList.push({user_uuid: follow.following_users_id.uuid , follow_id: follow.uuid}))
        
        const relatedProfiles = await Render.renderRelatedProfiles()
        const btnFollow     = document.querySelectorAll(".button-follow")
        
        mainUserFollowList.forEach(followed => {

            relatedProfiles.forEach(profile => {

                if(followed.user_uuid == profile.uuid){

                    btnFollow.forEach(btn => {

                        if(btn.id == profile.uuid){

                            btn.innerText = "Seguindo"
                            btn.classList.remove("button-outline")
                            btn.classList.add("button-primary")
                            btn.setAttribute("follow", followed.follow_id)
                        }
                    })

                }
                
            })
        })
        
    
    }

    static async likeCheck(){
        const postData  = await Render.renderPosts()
        const btnLike = document.querySelectorAll(".button-like")
        
        postData.forEach(post => {
            const likes = post.likes
            
            likes.forEach(like => {

                if(like.user.uuid == Requests.userId){

                    btnLike.forEach(btn => {

                        if(btn.id == post.uuid){
                            
                            btn.classList.add("liked")
                            btn.setAttribute("like", like.uuid)
                        }
                    })
                }
            })
        })
    }
}