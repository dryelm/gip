const viewRequestsButtons = document.querySelectorAll('.view-requests');
const modal = document.querySelectorAll('.modal');
const requestsModal = document.querySelector('#requests-modal');
const closeModalButton = document.querySelectorAll('.close');

viewRequestsButtons.forEach(button => {
    button.addEventListener('click', () => {
        // get teamId from the data attribute
        const teamId = button.value;

        fetch(`/api/teams/${teamId}/requests`)
            .then(response => response.text())
            .then(requestsListHtml => {
                // Update the requests modal window's content with the list of requests
                requestsModal.querySelector('.modal-info-content').innerHTML = requestsListHtml;

                // Display the requests modal window
                requestsModal.style.display = 'block';
            });
    });
});

closeModalButton.forEach(btn => btn.addEventListener('click', () => {
    modal.forEach(m => m.style.display = 'none');
}));
