const options = Array.from(document.querySelector("#difficulty").children);
const difficulty = document.querySelector("#difficultyIn");

console.log(difficulty.value)
options.forEach((option) => {
    if(option.value == difficulty.value){
        option.setAttribute('selected', true);
        console.log("ssd")
    }
})