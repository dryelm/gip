function makeHrefTelegram(telegram){
    const telegramField = document.querySelector('.telegram a');
    telegramField.href = `https://t.me/${telegram}`;
}

function makeEditable(field) {
    let value = field.querySelector('a, p').textContent;
    let oldElement = field.querySelector('a, p');
    let input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    field.replaceChild(input, oldElement);
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Сохранить';
    saveButton.className = 'save-button';
    field.appendChild(saveButton);
    let undoButton = field.closest('.data-field').querySelector('.edit-button');
    undoButton.textContent = 'Отменить';
    undoButton.className = 'edit-button';
    saveButton.addEventListener('click', async function () {
        let newValue = input.value;
        const username = document.querySelector('.username h2').textContent;
        let data = {
            email: document.querySelector('.email p') ? document.querySelector('.email p').textContent : document.querySelector('.email input').value,
            telegram: document.querySelector('.telegram a ') ? document.querySelector('.telegram a').textContent : document.querySelector('.telegram input').value,
            skills: Array.from(document.querySelectorAll('.skills p')).map(skill => skill.textContent).join(',')
        };
        await fetch(`/api/profile/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let len = 23
        if (newValue.length > len) {
            newValue = newValue.split('').reduce((acc, val, index) => {
                return index % len === 0 && index > 0 ? `${acc}\n${val}` : `${acc}${val}`;
            }, '');
        }
        let newElement = document.createElement(oldElement.tagName);
        newElement.textContent = newValue;
        field.replaceChild(newElement, input);
        field.removeChild(saveButton);
        undoButton.textContent = 'Изменить';
        makeHrefTelegram(data.telegram);
    });

    undoButton.addEventListener('click', function () {
        let originalElement = document.createElement(oldElement.tagName);
        originalElement.textContent = value;
        field.replaceChild(originalElement, input);
        field.removeChild(saveButton);
        undoButton.textContent = 'Изменить';
    });
}
let editButtons = document.querySelectorAll('.edit-button');
for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', function(event) {
        let field = this.closest('.data-field > div');
        if (field.querySelector('input')) {
            let originalElement = document.createElement(field.querySelector('a, p').tagName);
            originalElement.textContent = field.querySelector('input').value;
            field.replaceChild(originalElement, field.querySelector('input'));
            if (field.querySelector('.save-button')) {
                field.removeChild(field.querySelector('.save-button'));
            }
            this.textContent = 'Изменить';
        } else {
            makeEditable(field);
            this.textContent = 'Отменить';
        }
    });
}




const logoutButton = document.querySelector('.logout-button');
logoutButton.addEventListener('click', async function () {
    await fetch('/logout', {method: 'POST' });
    window.location.href = '/ideas';
});


function makeEditableAbout(field) {
    let value = field.querySelector('p').textContent;
    let oldElement = field.querySelector('p');
    let input = document.createElement('textarea');
    input.type = 'text';
    input.value = value;
    field.replaceChild(input, oldElement);
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Сохранить';
    saveButton.className = 'save-button';
    field.appendChild(saveButton);
    let undoButton = field.closest('.data-field').querySelector('.edit-button-about');
    undoButton.textContent = 'Отменить';
    undoButton.className = 'edit-button-about';
    saveButton.addEventListener('click', async function () {
        let newValue = input.value;
        const username = document.querySelector('.username h2').textContent;
        let data = {
            about: document.querySelector('.about p') ? document.querySelector('.about p').textContent : document.querySelector('.about textarea').value,
        };
        await fetch(`/api/profile/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let len = 23
        if (newValue.length > len) {
            newValue = newValue.split('').reduce((acc, val, index) => {
                return index % len === 0 && index > 0 ? `${acc}\n${val}` : `${acc}${val}`;
            }, '');
        }
        let newElement = document.createElement(oldElement.tagName);
        newElement.textContent = newValue;
        field.replaceChild(newElement, input);
        field.removeChild(saveButton);
        undoButton.textContent = 'Изменить';
    });

    undoButton.addEventListener('click', function () {
        let originalElement = document.createElement(oldElement.tagName);
        originalElement.textContent = value;
        field.replaceChild(originalElement, input);
        field.removeChild(saveButton);
        undoButton.textContent = 'Изменить';
    });
}
let editButtonsAbout = document.querySelectorAll('.edit-button-about');
for (let i = 0; i < editButtonsAbout.length; i++) {
    editButtonsAbout[i].addEventListener('click', function(event) {
        let field = this.closest('.data-field > div');
        if (field.querySelector('textarea')) {
            let originalElement = document.createElement(field.querySelector('p').tagName);
            originalElement.textContent = field.querySelector('textarea').value;
            field.replaceChild(originalElement, field.querySelector('textarea'));
            if (field.querySelector('.save-button')) {
                field.removeChild(field.querySelector('.save-button'));
            }
            this.textContent = 'Изменить';
        } else {
            makeEditableAbout(field);
            this.textContent = 'Отменить';
        }
    });
}