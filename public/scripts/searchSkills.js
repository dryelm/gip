const searchForm = document.querySelector('.search-bar form');
const searchInput = document.querySelector('.search-bar input');
const skillsList = document.querySelector('#skills-list');
const applyButton = document.querySelector('.apply button');

function searchSkills(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    const skills = skillsList.querySelectorAll('li');
    skills.forEach(skill => {
        if (skill.textContent.toLowerCase().includes(searchTerm)) {
            skill.style.display = '';
        } else {
            skill.style.display = 'none';
        }
    });
}

function applySkills(event) {
    event.preventDefault();
    const checkedSkills = Array.from(skillsList.querySelectorAll('input:checked'));
    const ideas = document.querySelectorAll('.idea');
    ideas.forEach(idea => {
        const ideaSkills = Array.from(idea.querySelectorAll('.skill'))
            .map(skill => skill.textContent);
        if (checkedSkills.every(skill => ideaSkills.includes(skill.value))) {
            idea.style.display = '';
        }
        else {
            idea.style.display = 'none';
        }
    });

}

searchForm.addEventListener("input", searchSkills);
applyButton.addEventListener("click", applySkills);