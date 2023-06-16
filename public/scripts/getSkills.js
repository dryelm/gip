const skills = document.getElementById('templateSkills').innerHTML;
const templateSkills = Handlebars.compile(skills);

fetch('/api/skills')
    .then(r => r.json())
    .then(data => {
        document.getElementById('skills-list').innerHTML = templateSkills({skills: data})
    });