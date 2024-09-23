const options = Array.from(document.querySelector("#language").children);
const language = document.querySelector("#langIn");

console.log(language.value)
options.forEach((option) => {
    if(option.value == language.value){
        option.setAttribute('selected', true);
    }
});



document.querySelector("#previewbtn").addEventListener("click", (e) =>{
    let quillContent = quill.root.innerHTML.trim();
    document.querySelector("#preview").innerHTML = quillContent;
});