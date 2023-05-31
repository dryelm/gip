const source = document.getElementById('template').innerHTML;
const template = Handlebars.compile(source);

fetch('/api/ideas')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ideas').innerHTML = template({ideas: data});
    });

