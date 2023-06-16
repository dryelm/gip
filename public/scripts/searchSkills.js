// Получаем элементы формы и списка результатов
const searchForm = document.querySelector('.search-bar form');
const searchInput = document.querySelector('.search-bar input');
const skillsList = document.querySelector('#skills-list');
const applyButton = document.querySelector('.apply button');
// Функция для фильтрации и отображения результатов
function searchSkills(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    const skills = skillsList.querySelectorAll('li');
    skills.forEach(skill => {
        if (skill.textContent.toLowerCase().includes(searchTerm)) {
            skill.style.display = 'list-item';
        } else {
            skill.style.display = 'none';
        }
    });
}

function applySkills() {
    const checkedSkills = Array.from(skillsList.querySelectorAll('input:checked'));
    const ideas = document.querySelectorAll('.idea');
    ideas.forEach(idea => {
        const ideaSkills = Array.from(idea.querySelectorAll('.skill'))
            .map(skill => skill.textContent);
        if (checkedSkills.every(skill => ideaSkills.includes(skill.value))) {
            idea.style.display = 'flex';
        }
        else {
            idea.style.display = 'none';
        }
    });

}
// Добавляем обработчик событий для формы
searchForm.addEventListener("input", searchSkills);
applyButton.addEventListener("click", applySkills);