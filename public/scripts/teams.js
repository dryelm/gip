const sendRequestBtns = document.querySelectorAll('.send');

sendRequestBtns.forEach(btn => btn.addEventListener('click', () => {
    const teamId = btn.value;
    fetch(`/api/teams/${teamId}`, {method: 'PUT'})
        .then(response => {response.status===302? window.location.href = "/login":response.text()});
    btn.replaceWith(document.createTextNode('Заявка отправлена'));
}));