async function main() {
// список всех доступных навыков
    const allSkills = await fetch('/api/skills')
        .then(response => response.json())
        .then(skills => skills.map(skill => skill.name));


// выбранные и невыбранные навыки
    const username = await fetch('/api/username').then(response => response.json()).then(data => data.username);
    let selectedSkills = await fetch('/api/profile/' + username)
        .then(response => response.json())
        .then(data => data.skills);
    let unselectedSkills = [...allSkills].filter(skill => !selectedSkills.includes(skill));


    const selectedSkillsDiv = document.querySelector('#selected-skills');
    const unselectedSkillsDiv = document.querySelector('#unselected-skills');
    const searchInput = document.querySelector('#search');
    const applyButton = document.querySelector('#apply');

// функция для отображения выбранных и невыбранных навыков
    function displaySkills() {
        // очистить содержимое div'ов
        selectedSkillsDiv.innerHTML = '';
        unselectedSkillsDiv.innerHTML = '';

        // отобразить выбранные навыки
        for (const skill of selectedSkills) {
            const skillDiv = document.createElement('div');
            skillDiv.classList.add('skill');
            skillDiv.textContent = skill;
            selectedSkillsDiv.appendChild(skillDiv);
            skillDiv.addEventListener('click', () => {
                // при клике на навык переместить его из списка невыбранных в список выбранных
                unselectedSkills.push(skill);
                selectedSkills = selectedSkills.filter(s => s !== skill);
                displaySkills();
            });
        }

        // отобразить невыбранные навыки
        for (const skill of unselectedSkills) {
            const skillDiv = document.createElement('div');
            skillDiv.classList.add('skill');
            skillDiv.textContent = skill;
            skillDiv.addEventListener('click', () => {
                // при клике на навык переместить его из списка невыбранных в список выбранных
                selectedSkills.push(skill);
                unselectedSkills = unselectedSkills.filter(s => s !== skill);
                displaySkills();
            });
            unselectedSkillsDiv.appendChild(skillDiv);
        }
    }

// функция для фильтрации списка невыбранных навыков по поисковому запросу
    function filterUnselectedSkills() {
        const searchQuery = searchInput.value.toLowerCase();
        unselectedSkills = allSkills.filter(skill => skill.toLowerCase().includes(searchQuery));
        displaySkills();
    }

    function applySkills(event) {
        event.preventDefault();
        const checkedSkills = Array.from(selectedSkillsDiv.querySelectorAll('div.skill'));
        const skills = checkedSkills.map(skill => skill.textContent);
        fetch('/api/profile/' + username, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({skills: skills})
        }).then(() => {
            window.location.href = '/profile/user/' + username;
        });
    }

// обработчик события ввода для поля поиска
    searchInput.addEventListener('input', filterUnselectedSkills);
    applyButton.addEventListener('click', applySkills);
// отобразить все навыки при загрузке страницы
    displaySkills();
}

main().then();