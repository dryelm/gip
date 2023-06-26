const viewRequestsButtons = document.querySelectorAll('.view-requests');
const modal = document.querySelectorAll('.modal');
const requestsModal = document.querySelector('#requests-modal');
const closeModalButton = document.querySelectorAll('.close');

viewRequestsButtons.forEach(button => {
    button.addEventListener('click', () => {
        const teamId = button.value;

        fetch(`/api/teams/${teamId}/requests`)
            .then(response => response.text())
            .then(requestsListHtml => {
                requestsModal.querySelector('.modal-info-content').innerHTML = requestsListHtml;
                requestsModal.style.display = 'block';
            }).then(addActions);
    });
});

closeModalButton.forEach(btn => btn.addEventListener('click', () => {
    modal.forEach(m => m.style.display = 'none');
}));

function addActions() {
    const acceptBtns = document.querySelectorAll('.accept');
    const rejectBtns = document.querySelectorAll('.reject');
    const teamId = document.querySelector('.requests').id;

    acceptBtns.forEach(btn => btn.addEventListener('click', () => {
        const username = btn.value;

        fetch(`/api/teams/${teamId}/requests/accept/${username}`, {method: 'DELETE'})
            .then(response => response.text());
        btn.closest('.member-info').style.display = 'none';
    }));

    rejectBtns.forEach(btn => btn.addEventListener('click', () => {
        const username = btn.value;

        fetch(`/api/teams/${teamId}/requests/decline/${username}`, {method: 'DELETE'})
            .then(response => response.text());
        btn.closest('.member-info').style.display = 'none';
    }));
}