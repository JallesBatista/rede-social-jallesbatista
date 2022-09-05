import { Requests } from "../requires/request.js"

export class Render{
    static postPageCount =  1

    static modalErro(data){
        let dataFormat = data.split("")
        data = `${dataFormat[0].toUpperCase()}${data.slice(1)}`

        const body = document.querySelector("body")
        const divWrapper = document.createElement("div")
        divWrapper.classList.add("modal-wrapper")

        const divModal   = document.createElement("div")
        divModal.classList.add("modalErro")

        const divContent = document.createElement("div")
        divContent.classList.add("content")

        const modalTitle = document.createElement("p")
        modalTitle.classList.add("font-text-1")
        modalTitle.innerText = "Acesso não autorizado"

        const modalContent = document.createElement("span")
        modalContent.classList.add("font-text-2")
        modalContent.innerText = data

        const btn = document.createElement("button")
        btn.classList.add("button-modalErro")
        btn.classList.add("modal-remove")
        btn.classList.add("font-text-2")
        btn.innerText = "Entendi"

        divContent.append(modalTitle, modalContent)
        divModal.append(divContent, btn)
        divWrapper.appendChild(divModal)
      
        body.appendChild(divWrapper)
    }

    static modalPost(name, job,image,title,content){
        const body = document.querySelector("body")

        const divWrapper = document.createElement("div")
        divWrapper.classList.add("modal-wrapper")

        const divModal = document.createElement("div")
        divModal.classList.add("modalPost")
        divModal.classList.add("post__item")
        divModal.classList.add("flex-column")

        const divProfile    = document.createElement("div")
        divProfile.classList.add("user__profile")

        const imgProfile    = document.createElement("img")
        imgProfile.src    = image
        imgProfile.alt    = name

        const divBio    = document.createElement("div")
        divBio.classList.add("user__bio")
        divBio.classList.add("flex-column")

        const nameProfile   = document.createElement("p")
        nameProfile.classList.add("font-title-2")
        nameProfile.innerText   = name

        const jobProfile    = document.createElement("span")
        jobProfile.classList.add("font-text-2")
        jobProfile.innerText = job

        const divContent    = document.createElement("div")
        divContent.classList.add("post__content")
        divContent.classList.add("flex-column")

        const titlePost = document.createElement("h2")
        titlePost.classList.add("font-title-1")
        titlePost.innerText = title

        const contentPost = document.createElement("p")
        contentPost.classList.add("font-text-1")
        contentPost.innerText =  content

        const btnModal  = document.createElement("button")
        btnModal.classList.add("modal-remove")
        btnModal.classList.add("modalPost-button")
        btnModal.innerText = "X"

        divContent.append(titlePost, contentPost)
        divBio.append(nameProfile, jobProfile)
        divProfile.append(imgProfile, divBio)
        divModal.append(divProfile, divContent, btnModal)
        divWrapper.appendChild(divModal)

        body.appendChild(divWrapper)
    }

    static modalRemove(){
        const modal = document.querySelector(".modal-wrapper")
        const btnModal = document.querySelectorAll(".modal-remove")

        btnModal.forEach(btn => {
            btn.addEventListener("click", (event)=>{
                modal.remove()
            })
        })
    }

    static async renderUserProfile(){
        const data = await Requests.mainUserData()
        let image       = data.data.image
        let username    = data.data.username
        let job         = data.data.work_at
        let followCount = data.data.followers_amount

        const divMainUserProfile = document.querySelector(".mainUser .user__profile")
        
        const imageProfile = document.createElement("img")
        imageProfile.src    = image
        imageProfile.alt    = username

        const divBio    = document.createElement("div")
        divBio.classList.add("user__bio")
        divBio.classList.add("flex-column")

        const nameProfile   = document.createElement("p")
        nameProfile.classList.add("font-title-2")
        nameProfile.innerText   = username

        const jobProfile    = document.createElement("span")
        jobProfile.classList.add("font-text-2")
        jobProfile.innerText = job

        const followers     = document.createElement("span")
        followers.classList.add("mainUser__follows")
        followers.classList.add("font-text-3")
        followers.innerText = `${followCount} seguidores.`

        divBio.append(nameProfile, jobProfile)
        divMainUserProfile.append(imageProfile, divBio, followers)
    }

    static async renderRelatedProfiles(){
        
        const getUsers = await Requests.getUsers()
        const limit = 3
        const usersCount = getUsers.data.count
        const usersRandomNum = () => Math.round(Math.random()*usersCount) - limit
        const offset    =  usersRandomNum()
        
        const database = await Requests.getUsers(limit, offset)
        const data = database.data.results

        const desktopList   = document.querySelector(".profilesDesktop__list")
        const mobileList    = document.querySelector(".profilesMobile__list")

        data.forEach(user => {

            let image       = user.image
            let username    = user.username
            let job         = user.work_at
            let uuid        = String(user.uuid)
            
            const tagLi = document.createElement("li")
            tagLi.id  = uuid

            const divProfile    = document.createElement("div")
            divProfile.classList.add("user__profile")

            const imgProfile    = document.createElement("img")
            imgProfile.src    = image
            imgProfile.alt    = username

            const divBio    = document.createElement("div")
            divBio.classList.add("user__bio")
            divBio.classList.add("flex-column")
    
            const nameProfile   = document.createElement("p")
            nameProfile.classList.add("font-title-2")
            nameProfile.innerText   = username
    
            const jobProfile    = document.createElement("span")
            jobProfile.classList.add("font-text-2")
            jobProfile.innerText = job

            const btnFollow     = document.createElement("button")
            btnFollow.innerText = "Seguir"
            btnFollow.classList.add("button-outline")
            btnFollow.classList.add("font-text-button") 
            btnFollow.classList.add("button-follow")
            btnFollow.id    =   uuid

            divBio.append(nameProfile, jobProfile)
            divProfile.append(imgProfile, divBio)

            tagLi.append(divProfile, btnFollow)

            desktopList.appendChild(tagLi)

            // MOBILE LIST

            const tagLiFlexColumn = document.createElement("li") 
            tagLiFlexColumn.classList.add("flex-column")
            tagLiFlexColumn.id  = uuid

            const divProfileMobile    = document.createElement("div")
            divProfileMobile.classList.add("user__profile")

            const imgProfileMobile    = document.createElement("img")
            imgProfileMobile.src    = image
            imgProfileMobile.alt    = username

            const divBioMobile    = document.createElement("div")
            divBioMobile.classList.add("user__bio")
            divBioMobile.classList.add("flex-column")
    
            const nameProfileMobile   = document.createElement("p")
            nameProfileMobile.classList.add("font-title-2")
            nameProfileMobile.innerText   = username
    
            const jobProfileMobile    = document.createElement("span")
            jobProfileMobile.classList.add("font-text-2")
            jobProfileMobile.innerText = job

            const btnFollowMobile     = document.createElement("button")
            btnFollowMobile.innerText = "Seguir"
            btnFollowMobile.classList.add("button-outline")
            btnFollowMobile.classList.add("font-text-button") 
            btnFollowMobile.classList.add("button-follow")
            btnFollowMobile.id    =   uuid

            divBioMobile.append(nameProfileMobile, jobProfileMobile)
            divProfileMobile.append(imgProfileMobile, divBioMobile)

            tagLiFlexColumn.append(divProfileMobile, btnFollowMobile)

            mobileList.appendChild(tagLiFlexColumn)
        })


        return data
    }

    static async renderPosts(){
        const limit = 10
        const getPosts = await Requests.getPosts(limit,0)
        const postCount = getPosts.data.count 
        const offset = postCount - (limit * this.postPageCount)
        const dataBase =  await Requests.getPosts(limit,offset)   
        const postData = dataBase.data.results

        postData.forEach(post => {
            
            let username    = post.author.username
            let job         = post.author.work_at
            let image       = post.author.image
            let postUuid    = post.uuid
            let title       = post.title
            let description = post.description
            let likesCount  = post.likes.length

            const postList = document.querySelector(".posts__list")
        
            const tagLi = document.createElement("li")
            tagLi.classList.add("post__item")
            tagLi.classList.add("flex-column")
            tagLi.id  = postUuid
    
            const divProfile    = document.createElement("div")
            divProfile.classList.add("user__profile")
    
            const imgProfile    = document.createElement("img")
            imgProfile.src  = image
            imgProfile.alt  = username

            const divBio    = document.createElement("div")
            divBio.classList.add("user__bio")
            divBio.classList.add("flex-column")

            const profileName   = document.createElement("p")
            profileName.classList.add("font-title-2")
            profileName.innerText   = username

            const profileJob   = document.createElement("span") 
            profileJob.classList.add("font-text-2")
            profileJob.innerText = job

            const divContent =  document.createElement("div")
            divContent.classList.add("post__content")
            divContent.classList.add("flex-column")

            const postTitle = document.createElement("h2")
            postTitle.classList.add("font-title-1")
            postTitle.innerText = title

            const postDescription   = document.createElement("p")
            postDescription.classList.add("font-text-1")
            postDescription.innerText   = description

            const divButtons    = document.createElement("div")
            divButtons.classList.add("post__buttons")

            const buttonModal   = document.createElement("button")
            buttonModal.classList.add("button-grey1")
            buttonModal.innerText   = "Abrir Post"
            buttonModal.id  = postUuid

            const buttonLike    = document.createElement("button")
            buttonLike.classList.add("button-like")
            buttonLike.classList.add("font-text-2")
            buttonLike.id = postUuid

            const buttonLikeImg = document.createElement("img")
            buttonLikeImg.src = "/src/assets/vector.svg"

            let svgNS = "http://www.w3.org/2000/svg"
            const heart = document.createElementNS(svgNS, "svg")
            heart.setAttributeNS(null,"width", 23 )
            heart.setAttributeNS(null,"height", 20 )
            heart.setAttributeNS(null,"viewBox", "0 0 23 20" )
            heart.setAttributeNS(null,"fill", "none" )

            const path = document.createElementNS(svgNS ,"path")
            path.setAttributeNS(null ,"d", "M16.7134 0C14.4034 0 12.3978 1.30143 11.3793 3.21286C10.3609 1.30143 8.35526 0 6.04526 0C2.70685 0 0 2.71857 0 6.07143C0 14.2857 11.3793 20 11.3793 20C11.3793 20 22.7586 14.2857 22.7586 6.07143C22.7586 2.71857 20.0518 0 16.7134 0Z")
            path.setAttributeNS(null, "fill", "#212529")
            path.setAttributeNS(null,"fill-opacity", "0.5")


            
            const LikeNumber = document.createElement("span")
            LikeNumber.classList.add("number")
            LikeNumber.innerText = likesCount
            
            
            heart.appendChild(path)
            buttonLike.append(heart, LikeNumber)
            divButtons.append(buttonModal, buttonLike)

            divContent.append(postTitle, postDescription)

            divBio.append(profileName, profileJob)
            divProfile.append(imgProfile, divBio)

            tagLi.append(divProfile, divContent, divButtons)
            postList.appendChild(tagLi)
        })

        this.postPageCount++
        return postData
    }
}

