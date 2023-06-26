function initIdeasModal() {
    const createModal = document.getElementById("modal");
    const createSpan = document.getElementsByClassName("close")[0];

    const createButtons = document.querySelectorAll('.idea-buttons .create');

    createButtons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            let response = 200
            await fetch('/api/username').then(res => response = res.status)
            if (response !== 200) {
                window.location.href = "/login";
            }
            const ideasId = event.target.value;

            const form = createModal.querySelector('form');
            form.querySelector('input[name="ideas_id"]').value = ideasId;

            const ideaName = button.closest('.idea').querySelector('.idea-name').textContent;

            createModal.querySelector('h3').textContent = ideaName;

            createModal.style.display = "block";
        });
    });

    const teamsModal = document.getElementById("teamsModal");
    const teamsSpan = teamsModal.querySelector(".close");

    const findButtons = document.querySelectorAll('.idea-buttons .find');

    findButtons.forEach((button) => {
        button.addEventListener('click', async function (event) {
            event.preventDefault();

            const ideasId = event.target.closest('.idea-buttons').querySelector('.create').value;

            await fetch(`/teams/${ideasId}`)
                .then(response => {
                    if (response.status !== 200){
                        throw new Error(response.status);
                    }
                    return response.text();
                })
                .then(teamsListHtml => {
                    teamsModal.querySelector('.modal-info-content').innerHTML = teamsListHtml;

                    teamsModal.style.display = "block";
                }).then(addEvents).catch(function (err) {
                    window.location.href = '/login';
                });
        });
    });

    createSpan.onclick = function() {
        createModal.style.display = "none";
    }

    teamsSpan.onclick = function() {
        teamsModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === createModal || event.target === teamsModal) {
            createModal.style.display = "none";
            teamsModal.style.display = "none";
        }
    }
}

function addEvents() {
    const sendRequestBtns = document.querySelectorAll('.send');

    sendRequestBtns.forEach(btn => btn.addEventListener('click', () => {
        const teamId = btn.value;
        fetch(`/api/teams/${teamId}`, {method: 'PUT'})
            .then(response => {response.status===302? window.location.href = "/login":response.text()});
        btn.replaceWith(document.createTextNode('Заявка отправлена'));
    }));
}
initIdeasModal();
