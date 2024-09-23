const projects = document.querySelectorAll(".projectBox");
const siteUrl = "https://9dfd-31-37-125-61.ngrok-free.app";

projects.forEach((project) =>{
    project.addEventListener("click", (e) =>{
        window.location.replace(siteUrl + `/projects/${e.currentTarget.children[2].value}`);
    })
})