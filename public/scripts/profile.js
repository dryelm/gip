const source = document.getElementById('template').innerHTML;
const template = Handlebars.compile(source);
const username = window.location.pathname.split('/').pop();
fetch(`/api/profile/${username}`)
    .then(r => r.json())
    .then(data => {
    document.getElementById('profile').innerHTML = template(data);
});


