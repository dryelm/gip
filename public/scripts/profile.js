// функция для создания редактируемого поля

function makeHrefTelegram(telegram){
    const telegramField = document.querySelector('.telegram a');
    telegramField.href = `https://t.me/${telegram}`;
}
function makeEditable(field) {
    // получаем текущее значение поля
    let value = field.querySelector('a, p').textContent;
    let oldElement = field.querySelector('a, p');
    // создаем новый элемент input
    let input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    // заменяем элемент p на input
    field.replaceChild(input, oldElement);
    // создаем кнопку "Сохранить"
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Сохранить';
    saveButton.className = 'save-button';
    field.appendChild(saveButton);
    // создаем кнопку "Отменить"
    let undoButton = field.closest('.data-field').querySelector('.edit-button');
    undoButton.textContent = 'Отменить';
    undoButton.className = 'edit-button';
    // обрабатываем нажатие на кнопку "Сохранить"
    saveButton.addEventListener('click', async function () {
        // получаем новое значение поля
        let newValue = input.value;
        const username = document.querySelector('.username h2').textContent;
        let data = {
            email: document.querySelector('.email p') ? document.querySelector('.email p').textContent : document.querySelector('.email input').value,
            telegram: document.querySelector('.telegram a ') ? document.querySelector('.telegram a').textContent : document.querySelector('.telegram input').value,
            about: document.querySelector('.about p') ? document.querySelector('.about p').textContent : document.querySelector('.about input').value,
            skills: Array.from(document.querySelectorAll('.skills p')).map(skill => skill.textContent).join(',')
        };
        await fetch(`/api/profile/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        //23 строчки слэшэним
        let len = 23
        if (newValue.length > len) {
            newValue = newValue.split('').reduce((acc, val, index) => {
                return index % len === 0 && index > 0 ? `${acc}\n${val}` : `${acc}${val}`;
            }, '');
        }
        // заменяем элемент input на p с обновленным значением
        let newElement = document.createElement(oldElement.tagName);
        newElement.textContent = newValue;

        field.replaceChild(newElement, input);
        // удаляем кнопку "Сохранить"
        field.removeChild(saveButton);
        undoButton.textContent = 'Изменить';
        makeHrefTelegram(data.telegram);
    });

    // обрабатываем нажатие на кнопку "Отменить"
    undoButton.addEventListener('click', function () {
        // заменяем элемент input на p или h2 с оригинальным значением
        let originalElement = document.createElement(oldElement.tagName);
        originalElement.textContent = value;
        field.replaceChild(originalElement, input);
        // удаляем кнопки "Сохранить"
        field.removeChild(saveButton);
        undoButton.textContent = 'Изменить';
    });
}
// получаем все кнопки "Изменить" на странице
let editButtons = document.querySelectorAll('.edit-button');
// добавляем обработчики событий для всех кнопок "Изменить"
for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', function(event) {
        // получаем поле, которое нужно отредактировать
        let field = this.closest('.data-field > div');
        // проверяем, находится ли поле в режиме редактирования
        if (field.querySelector('input')) {
            // если поле в режиме редактирования, отменяем изменения
            let originalElement = document.createElement(field.querySelector('a, p').tagName);
            originalElement.textContent = field.querySelector('input').value;
            field.replaceChild(originalElement, field.querySelector('input'));
            // удаляем кнопку "Сохранить"
            if (field.querySelector('.save-button')) {
                field.removeChild(field.querySelector('.save-button'));
            }
            // меняем текст кнопки на "Изменить"
            this.textContent = 'Изменить';
        } else {
            // если поле не в режиме редактирования, делаем его редактируемым

            makeEditable(field);
            // меняем текст кнопки на "Отменить"
            this.textContent = 'Отменить';
        }
    });
}




const logoutButton = document.querySelector('.logout-button');
logoutButton.addEventListener('click', async function () {
    await fetch('/logout', {method: 'POST' });
    window.location.href = '/ideas';
});


// функция для создания редактируемого поля
function makeEditableAbout(field) {
    // получаем текущее значение поля
    let value = field.querySelector('p').textContent;
    let oldElement = field.querySelector('p');
    // создаем новый элемент input
    let input = document.createElement('textarea');
    input.type = 'text';
    input.value = value;
    // заменяем элемент p на input
    field.replaceChild(input, oldElement);
    // создаем кнопку "Сохранить"
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Сохранить';
    saveButton.className = 'save-button';
    field.appendChild(saveButton);
    // создаем кнопку "Отменить"
    let undoButton = field.closest('.data-field').querySelector('.edit-button-about');
    undoButton.textContent = 'Отменить';
    undoButton.className = 'edit-button-about';
    // обрабатываем нажатие на кнопку "Сохранить"
    saveButton.addEventListener('click', async function () {
        // получаем новое значение поля
        let newValue = input.value;
        const username = document.querySelector('.username h2').textContent;
        let data = {
            email: document.querySelector('.email p') ? document.querySelector('.email p').textContent : document.querySelector('.email textarea').value,
            telegram: document.querySelector('.telegram p') ? document.querySelector('.telegram p').textContent : document.querySelector('.telegram textarea').value,
            about: document.querySelector('.about p') ? document.querySelector('.about p').textContent : document.querySelector('.about textarea').value,
            skills: Array.from(document.querySelectorAll('.skills p')).map(skill => skill.textContent).join(',')
        };
        await fetch(`/api/profile/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        //23 строчки слэшэним
        let len = 23
        if (newValue.length > len) {
            newValue = newValue.split('').reduce((acc, val, index) => {
                return index % len === 0 && index > 0 ? `${acc}\n${val}` : `${acc}${val}`;
            }, '');
        }
        // заменяем элемент input на p или h2 с обновленным значением
        let newElement = document.createElement(oldElement.tagName);
        newElement.textContent = newValue;
        field.replaceChild(newElement, input);
        // удаляем кнопку "Сохранить"
        field.removeChild(saveButton);
        undoButton.textContent = 'Изменить';
    });

    // обрабатываем нажатие на кнопку "Отменить"
    undoButton.addEventListener('click', function () {
        // заменяем элемент input на p или h2 с оригинальным значением
        let originalElement = document.createElement(oldElement.tagName);
        originalElement.textContent = value;
        field.replaceChild(originalElement, input);
        // удаляем кнопки "Сохранить"
        field.removeChild(saveButton);
        undoButton.textContent = 'Изменить';
    });
}
// получаем все кнопки "Изменить" на странице
let editButtonsAbout = document.querySelectorAll('.edit-button-about');
// добавляем обработчики событий для всех кнопок "Изменить"
for (let i = 0; i < editButtonsAbout.length; i++) {
    editButtonsAbout[i].addEventListener('click', function(event) {
        // получаем поле, которое нужно отредактировать
        let field = this.closest('.data-field > div');
        // проверяем, находится ли поле в режиме редактирования
        if (field.querySelector('textarea')) {
            // если поле в режиме редактирования, отменяем изменения
            let originalElement = document.createElement(field.querySelector('p').tagName);
            originalElement.textContent = field.querySelector('textarea').value;
            field.replaceChild(originalElement, field.querySelector('textarea'));
            // удаляем кнопку "Сохранить"
            if (field.querySelector('.save-button')) {
                field.removeChild(field.querySelector('.save-button'));
            }
            // меняем текст кнопки на "Изменить"
            this.textContent = 'Изменить';
        } else {
            // если поле не в режиме редактирования, делаем его редактируемым

            makeEditableAbout(field);
            // меняем текст кнопки на "Отменить"
            this.textContent = 'Отменить';
        }
    });
}