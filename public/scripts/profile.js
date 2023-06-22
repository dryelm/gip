// функция для создания редактируемого поля
function makeEditable(field) {
    // получаем текущее значение поля
    let value = field.querySelector('h2, p').textContent;
    // создаем новый элемент input
    let input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    // заменяем элемент p или h2 на input
    let oldElement = field.querySelector('h2, p');
    field.replaceChild(input, oldElement);
    // создаем кнопку "Сохранить"
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Сохранить';
    field.appendChild(saveButton);
    // обрабатываем нажатие на кнопку "Сохранить"
    saveButton.addEventListener('click', async function() {
        // получаем новое значение поля
        let newValue = input.value;
        // отправляем новое значение на сервер
        let data = {
            name: document.querySelector('.username h2') ? document.querySelector('.username h2').textContent : document.querySelector('.username input').value,
            email: document.querySelector('.email p') ? document.querySelector('.email p').textContent : document.querySelector('.email input').value,
            telegram: document.querySelector('.telegram p') ? document.querySelector('.telegram p').textContent : document.querySelector('.telegram input').value,
            about: document.querySelector('.about p') ? document.querySelector('.about p').textContent : document.querySelector('.about input').value,
            skills: Array.from(document.querySelectorAll('.skills p')).map(skill => skill.textContent).join(',')
        };
        data[field.className] = newValue;
        await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        // заменяем элемент input на p или h2 с обновленным значением
        let newElement = document.createElement(oldElement.tagName);
        newElement.textContent = newValue;
        field.replaceChild(newElement, input);
        // удаляем кнопку "Сохранить"
        field.removeChild(saveButton);
    });
}

// получаем все кнопки "Изменить" на странице
let editButtons = document.querySelectorAll('.edit-button');
// добавляем обработчики событий для всех кнопок "Изменить"
for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', function(event) {
        // получаем поле, которое нужно отредактировать
        let field = this.closest('.data-field > div');
        // делаем поле редактируемым
        makeEditable(field);
    });
}
