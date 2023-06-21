const searchFormHeader = document.querySelector('.search');
const searchInputHeader = searchFormHeader.querySelector('input[type="text"]');
const ideasContainer = document.querySelector('.ideas');

searchFormHeader.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchText = searchInputHeader.value.toLowerCase();
    const ideaElements = ideasContainer.querySelectorAll('.idea');
    ideaElements.forEach(ideaElement => {
        const name = ideaElement.querySelector('.idea-name').textContent.toLowerCase();
        const description = ideaElement.querySelector('.idea-description').textContent.toLowerCase();
        const skills = Array.from(ideaElement.querySelectorAll('.skill')).map(skillElement => skillElement.textContent.toLowerCase());
        if (name.includes(searchText) || description.includes(searchText) || skills.some(skill => skill.includes(searchText))) {
            ideaElement.style.display = '';
        } else {
            ideaElement.style.display = 'none';
        }
    });
});

console.log("Hello from searchIdeas.js");