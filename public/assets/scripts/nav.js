const navbtn = document.querySelector("#navbtn");
const nav = document.querySelector("nav");
const navbtnRetracted = document.querySelector("#navbtnRetracted");


navbtn.addEventListener("click", (e) => {
    nav.style.display = "none";
    navbtnRetracted.style.display = "block";
});

navbtnRetracted.addEventListener("click", (e) => {
    nav.style.display = "block";
    navbtnRetracted.style.display = "none";
});