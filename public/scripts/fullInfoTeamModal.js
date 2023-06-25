const modalWindow = document.querySelector('.modal');
const createSpan = document.getElementsByClassName('close')[0];

const infoButtons = document.querySelectorAll('.full-info');

infoButtons.forEach((button) => {
    button.addEventListener('click', async (event) => {
        event.preventDefault();

        const teamId = event.target.value;

        await fetch(`api/teams/${teamId}`)
            .then(response => response.json())
            .then(teamInfo => {
                const teamName = teamInfo.name;
                const ideaDescription = teamInfo.ideaDescription;
                const teamDescription = teamInfo.description;
                const teamMembers = teamInfo.members;
                const teamSkills = teamInfo.skills;
                const owner = teamInfo.owner;
                const freeSlots = teamInfo.maxCountMembers - teamInfo.members.length;
                const freeSlotsText =
                    freeSlots > 0 ?
                        freeSlots > 1 ?
                            freeSlots < 5 ?
                                `${freeSlots} свободных места` :
                                `${freeSlots} свободных мест` :
                            `${freeSlots} свободное место` :
                        'Нет свободных мест';

                modalWindow.querySelector('#team-name').innerText = teamName;
                modalWindow.querySelector('#team-idea-description').innerText = ideaDescription;
                modalWindow.querySelector('#team-description').innerText = teamDescription;
                modalWindow.querySelector('#team-owner').innerText = `Создатель: ${owner}`;
                modalWindow.querySelector('#team-members').innerText = `Участники: ${teamMembers.join(', ')}`;
                modalWindow.querySelector('#team-skills').innerText = `Навыки: ${teamSkills.join(', ')}`;
                modalWindow.querySelector('#free-slots').innerText = freeSlotsText;

                modalWindow.style.display = 'block';
            }).catch(err => console.log(err));
    });
});

createSpan.onclick = function() {
    modalWindow.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modalWindow ) {
        modalWindow.style.display = "none";

    }
}
