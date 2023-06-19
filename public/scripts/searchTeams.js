const searchFormHeader = document.querySelector('.search');
const searchInputHeader = searchFormHeader.querySelector('input[type="text"]');
const teamsContainer = document.querySelector('.teams');

searchFormHeader.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchText = searchInputHeader.value.toLowerCase();
    const teamElements = teamsContainer.querySelectorAll('.team');
    teamElements.forEach(teamElement => {
        const name = teamElement.querySelector('.team-name').textContent.toLowerCase();
        const description = teamElement.querySelector('.team-description').textContent.toLowerCase();
        const skills = Array.from(teamElement.querySelectorAll('.skill')).map(skillElement => skillElement.textContent.toLowerCase());
        if (name.includes(searchText) || description.includes(searchText) || skills.some(skill => skill.includes(searchText))) {
            teamElement.style.display = '';
        } else {
            teamElement.style.display = 'none';
        }
    });
});
