const buttons = document.querySelectorAll('.send');
buttons.forEach(button => {
    const teamId = button.value;
    button.addEventListener('click', function () {
        fetch(`/api/teams/${teamId}`, {method: 'PUT', redirect:"follow"})
            .then(response => {
                if (response.status === 404) {
                    window.location.href = '/login';
                } else {
                    return response.json();
                }
            })
    });
});
