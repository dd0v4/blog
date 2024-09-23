const escapeQuotes = (content) => {
    return content.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

let projectContent = document.querySelector("#contentEdit");
let quill = new Quill('#editor', {
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image', 'code-block'],
            ['clean']
        ],
        syntax: true,
        imageResize: {
            displaySize: true
        }
    },
    theme: 'snow'
});



document.querySelector('#projectForm').addEventListener('submit', (event) => {
    let date = new Date;
    event.preventDefault();
    const quillContent = quill.root.innerHTML.trim();
    document.querySelector('#content').value = quillContent;
    document.querySelector("#uploadDate").value = date;
    document.querySelector('#projectForm').submit();
});

document.querySelector("#previewbtn").addEventListener("click", (e) =>{
    let quillContent = quill.root.innerHTML.trim();
    document.querySelector("#preview").innerHTML = quillContent;
});


if (document.querySelector("#contentEdit")) {
    console.log(document.querySelector("#contentEdit"))
    if (projectContent.value !== "") {
        let delta = quill.clipboard.convert(projectContent.value);
        quill.setContents(delta, 'silent');
    }
}
