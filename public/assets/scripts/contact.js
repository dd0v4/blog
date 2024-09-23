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
    event.preventDefault();
    const quillContent = quill.root.innerHTML.trim();
    document.querySelector('#message').value = quillContent;
    document.querySelector('#projectForm').submit();
});



