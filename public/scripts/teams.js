const source = document.getElementById('template').innerHTML;
const template = Handlebars.compile(source);

fetch('/api/teams')
    .then(response => response.json())
    .then(data => {
        document.getElementById('teams').innerHTML = template({teams: data});
    });
