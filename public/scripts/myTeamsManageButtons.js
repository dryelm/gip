const deleteTeamButton = document.querySelectorAll('.delete-team');
const completeTeamButton = document.querySelectorAll('.complete-team');

deleteTeamButton.forEach(button => {
    button.addEventListener('click', async function (event) {
        event.preventDefault();
        const teamId = event.target.value;
        await fetch(`api/teams/delete/${teamId}`, {method: 'DELETE'})
            .then(response => {
                if (response.status !== 200){
                    throw new Error(response.status);
                }
                return response.text();
            })
            .then(() => {
                window.location.href = '/myteams';
            }).catch(function (err) {
                console.log(err)
            });
    });
});

completeTeamButton.forEach(button => {
    button.addEventListener('click', async function (event) {
        event.preventDefault();
        const teamId = event.target.value;
        await fetch(`/api/teams/complete/${teamId}`, {method: 'PUT'})
            .then(response => {
                if (response.status !== 200){
                    throw new Error(response.status);
                }
                return response.text();
            })
            .then(() => {
                window.location.href = '/myteams';
            }).catch(function (err) {
                console.log(err)
            });
    });
});