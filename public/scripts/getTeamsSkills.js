const skills = document.getElementById('templateSkills').innerHTML;
const templateSkills = Handlebars.compile(skills);

fetch('/api/skills/teamsSkills')
    .then(r => r.json()).then(data=> data.filter(elem => elem["count"] !== 0))
    .then(data => {
        document.getElementById('skills-list').innerHTML = templateSkills({skills: data})
    });