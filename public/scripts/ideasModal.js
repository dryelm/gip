function initIdeasModal() {
    // Get the create team modal element and the close button
    const createModal = document.getElementById("modal");
    const createSpan = document.getElementsByClassName("close")[0];

    // Get all the "Create team" buttons
    const createButtons = document.querySelectorAll('.idea-buttons .create');

    // Add an event listener to each "Create team" button
    createButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            // Prevent the default action
            event.preventDefault();

            // Get the ideasId from the value attribute of the button
            const ideasId = event.target.value;

            // Update the form in the create team modal window
            const form = createModal.querySelector('form');
            form.querySelector('input[name="ideas_id"]').value = ideasId;

            // Get the idea name from the button's parent element
            const ideaName = button.closest('.idea').querySelector('.idea-name').textContent;

            // Update the create team modal's h3 text with the idea name
            createModal.querySelector('h3').textContent = ideaName;

            // Display the create team modal window
            createModal.style.display = "block";
        });
    });

    // Get the teams modal element and the close button
    const teamsModal = document.getElementById("teamsModal");
    const teamsSpan = teamsModal.querySelector(".close");

    // Get all the "Find team" buttons
    const findButtons = document.querySelectorAll('.idea-buttons .find');

    // Add an event listener to each "Find team" button
    findButtons.forEach((button) => {
        button.addEventListener('click', async function (event) {
            // Prevent the default action
            event.preventDefault();

            // Get the ideasId from the value attribute of the "Create team" button in the same .idea-buttons element
            const ideasId = event.target.closest('.idea-buttons').querySelector('.create').value;

            // Make an AJAX request to the server to get the list of teams for the idea
            await fetch(`/teams/${ideasId}`)
                .then(response => {
                    if (response.status !== 200){
                        throw new Error(response.status);
                    }
                    return response.text();
                })
                .then(teamsListHtml => {
                    // Update the teams modal window's content with the list of teams
                    teamsModal.querySelector('.modal-content .teams').innerHTML = teamsListHtml;

                    // Display the teams modal window
                    teamsModal.style.display = "block";
                }).catch(function (err) {
                    window.location.href = '/login';
                });
        });
    });

    // Close the create team modal window when its close button is clicked
    createSpan.onclick = function() {
        createModal.style.display = "none";
    }

    // Close the teams modal window when its close button is clicked
    teamsSpan.onclick = function() {
        teamsModal.style.display = "none";
    }

    // Close both modal windows when clicked outside of them
    window.onclick = function(event) {
        if (event.target === createModal || event.target === teamsModal) {
            createModal.style.display = "none";
            teamsModal.style.display = "none";
        }
    }
}

initIdeasModal();
