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

                modalWindow.querySelector('.modal-content h3').innerText = teamName;
                modalWindow.querySelector('.modal-content h5').innerText = ideaDescription;
                modalWindow.querySelector('.modal-content h6').innerText = teamDescription;
                modalWindow.querySelector('#team-owner').innerText = `Owner: ${owner}`;
                modalWindow.querySelector('#team-members').innerText = `Members: ${teamMembers.join(', ')}`;
                modalWindow.querySelector('#team-skills').innerText = `Skills: ${teamSkills.join(', ')}`;
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
