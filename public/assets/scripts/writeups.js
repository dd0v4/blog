const writeups = document.querySelectorAll(".projectBox");
const siteUrl = "http://localhost:1338";


writeups.forEach((writeup) =>{
    writeup.addEventListener("click", (e) =>{
        window.location.replace(siteUrl + `/write-ups/${e.currentTarget.children[2].value}`);
    })
})