export class Render{
    static modalErro(data){
        let dataFormat = data.split("")
        data = `${dataFormat[0].toUpperCase()}${data.slice(1)}`

        const body = document.querySelector("body")
        const divWrapper = document.createElement("div")
        divWrapper.classList.add("modalErro-wrapper")

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
        btn.classList.add("font-text-2")
        btn.innerText = "Entendi"

        divContent.append(modalTitle, modalContent)
        divModal.append(divContent, btn)
        divWrapper.appendChild(divModal)
      
        body.appendChild(divWrapper)
    }
}