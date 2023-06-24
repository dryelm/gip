const buttons = document.querySelectorAll('.send');
buttons.forEach(button => {
    const teamId = button.value;
    button.addEventListener('click', function () {
        fetch(`/api/teams/${teamId}`, {method: 'PUT'})
            .then(response => response.json())
    });
});
