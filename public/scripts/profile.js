// функция для создания редактируемого поля
function makeEditable(field) {
    // получаем текущее значение поля
    let value = field.querySelector('p').textContent;
    let oldElement = field.querySelector('p');
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
            telegram: document.querySelector('.telegram p') ? document.querySelector('.telegram p').textContent : document.querySelector('.telegram input').value,
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
        let len = 30
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
let editButtons = document.querySelectorAll('.edit-button');
// добавляем обработчики событий для всех кнопок "Изменить"
for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', function(event) {
        // получаем поле, которое нужно отредактировать
        let field = this.closest('.data-field > div');
        // проверяем, находится ли поле в режиме редактирования
        if (field.querySelector('input')) {
            // если поле в режиме редактирования, отменяем изменения
            let originalElement = document.createElement(field.querySelector('p').tagName);
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


























// попытки в h2 заголовки отдельно

// function makeEditableh2(field) {
//     // получаем текущее значение поля
//     let value = field.querySelector('h2').textContent;
//     // создаем новый элемент input
//     let input = document.createElement('input');
//     input.type = 'text';
//     input.value = value;
//     // заменяем элемент p или h2 на input
//     let oldElement = field.querySelector('h2');
//     field.replaceChild(input, oldElement);
//     // создаем кнопку "Сохранить"
//     let saveButton = document.createElement('button');
//     saveButton.textContent = 'Сохранить';
//     saveButton.className = 'save-button';
//     field.appendChild(saveButton);
//     // создаем кнопку "Отменить"
//     let undoButton = field.closest('.data-field').querySelector('.edit-button-h2');
//     undoButton.textContent = 'Отменить';
//     undoButton.className = '.edit-button-h2';
//     // обрабатываем нажатие на кнопку "Сохранить"
//     saveButton.addEventListener('click', async function () {
//         // получаем новое значение поля
//         let newValue = input.value;
//         // отправляем новое значение на сервер
//         let data = {
//             name: document.querySelector('.username h2') ? document.querySelector('.username h2').textContent : document.querySelector('.username input').value,
//             email: document.querySelector('.email p') ? document.querySelector('.email p').textContent : document.querySelector('.email input').value,
//             telegram: document.querySelector('.telegram p') ? document.querySelector('.telegram p').textContent : document.querySelector('.telegram input').value,
//             about: document.querySelector('.about p') ? document.querySelector('.about p').textContent : document.querySelector('.about input').value,
//             skills: Array.from(document.querySelectorAll('.skills p')).map(skill => skill.textContent).join(',')
//         };
//         data[field.className] = newValue;
//         await fetch('/users', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });
//         //23 строчки слэшэним
//         if (newValue.length > 20) {
//             newValue = newValue.split('').reduce((acc, val, index) => {
//                 return index % 20 === 0 && index > 0 ? `${acc}\n${val}` : `${acc}${val}`;
//             }, '');
//         }
//         // заменяем элемент input на p или h2 с обновленным значением
//         let newElement = document.createElement(oldElement.tagName);
//         newElement.textContent = newValue;
//         field.replaceChild(newElement, input);
//         // удаляем кнопку "Сохранить"
//         field.removeChild(saveButton);
//         undoButton.textContent = 'Изменить';
//     });
//
//     // обрабатываем нажатие на кнопку "Отменить"
//     undoButton.addEventListener('click', function () {
//         // заменяем элемент input на p или h2 с оригинальным значением
//         let originalElement = document.createElement(oldElement.tagName);
//         originalElement.textContent = value;
//         input.replaceWith(originalElement);
//         // удаляем кнопки "Сохранить"
//         field.removeChild(saveButton);
//         undoButton.textContent = 'Изменить';
//     });
// }
//
// // получаем все кнопки "Изменить" на странице
// let editButtonsh2 = document.querySelectorAll('.edit-button-h2');
//
// // добавляем обработчики событий для всех кнопок "Изменить"
// for (let i = 0; i < editButtonsh2.length; i++) {
//     editButtonsh2[i].addEventListener('click', function(event) {
//         // получаем поле, которое нужно отредактировать
//         let field = this.closest('.data-field > div');
//         // проверяем, находится ли поле в режиме редактирования
//         if (field.querySelector('input')) {
//             // если поле в режиме редактирования, отменяем изменения
//             let originalElement = document.createElement(field.querySelector('h2').tagName);
//             originalElement.textContent = field.querySelector('input').value;
//             field.replaceChild(originalElement, field.querySelector('input'));
//             // удаляем кнопку "Сохранить"
//             if (field.querySelector('.save-button')) {
//                 field.removeChild(field.querySelector('.save-button'));
//             }
//             // меняем текст кнопки на "Изменить"
//             this.textContent = 'Изменить';
//         } else {
//             // если поле не в режиме редактирования, делаем его редактируемым
//             makeEditableh2(field);
//             // меняем текст кнопки на "Отменить"
//             this.textContent = 'Отменить';
//         }
//     });
// }
// function makeEditableh2(field) {
//     // получаем текущее значение поля
//     let value = field.querySelector('h2').textContent;
//     // создаем новый элемент input
//     let input = document.createElement('input');
//     input.type = 'text';
//     input.value = value;
//     // заменяем элемент p или h2 на input
//     let oldElement = field.querySelector('h2');
//     field.replaceChild(input, oldElement);
//     // создаем кнопку "Сохранить"
//     let saveButton = document.createElement('button');
//     saveButton.textContent = 'Сохранить';
//     saveButton.className = 'save-button';
//     field.appendChild(saveButton);
//     // обрабатываем нажатие на кнопку "Сохранить"
//     saveButton.addEventListener('click', async function () {
//         // получаем новое значение поля
//         let newValue = input.value;
//         // отправляем новое значение на сервер
//         let data = {
//             name: document.querySelector('.username h2') ? document.querySelector('.username h2').textContent : document.querySelector('.username input').value,
//             email: document.querySelector('.email p') ? document.querySelector('.email p').textContent : document.querySelector('.email input').value,
//             telegram: document.querySelector('.telegram p') ? document.querySelector('.telegram p').textContent : document.querySelector('.telegram input').value,
//             about: document.querySelector('.about p') ? document.querySelector('.about p').textContent : document.querySelector('.about input').value,
//             skills: Array.from(document.querySelectorAll('.skills p')).map(skill => skill.textContent).join(',')
//         };
//         data[field.className] = newValue;
//         await fetch('/users', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });
//         //23 строчки слэшэним
//         if (newValue.length > 20) {
//             newValue = newValue.split('').reduce((acc, val, index) => {
//                 return index % 20 === 0 && index > 0 ? `${acc}\n${val}` : `${acc}${val}`;
//             }, '');
//         }
//         // заменяем элемент input на p или h2 с обновленным значением
//         let newElement = document.createElement(oldElement.tagName);
//         newElement.textContent = newValue;
//         field.replaceChild(newElement, input);
//         // удаляем кнопку "Сохранить"
//         field.removeChild(saveButton);
//     });
// }
// // получаем все кнопки "Изменить" на странице
// let editButtonsh2 = document.querySelectorAll('.edit-button-h2');
// // добавляем обработчики событий для всех кнопок "Изменить"
// for (let i = 0; i < editButtonsh2.length; i++) {
//     editButtonsh2[i].addEventListener('click', function(event) {
//         // получаем поле, которое нужно отредактировать
//         let field = this.closest('.data-field > div');
//         // делаем поле редактируемым
//         makeEditableh2(field);
//     });
// }



















// хуй знает багается с textarea
// User
// profile.js:149 Uncaught (in promise) TypeError: Cannot read properties of null (reading 'value')
// at HTMLButtonElement.<anonymous> (profile.js:149:144)
function makeEditableAboutMe(field) {
    // получаем текущее значение поля
    let value = field.querySelector('h2, p').textContent;
    // создаем новый элемент textarea
    let textarea = document.createElement('textarea');
    textarea.textContent = 'text'
    textarea.value = value;
    // заменяем элемент p на textarea
    let oldElement = field.querySelector('h2, p');
    field.replaceChild(textarea, oldElement);
    // создаем кнопку "Сохранить"
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Сохранить';
    saveButton.className = 'save-button';
    field.appendChild(saveButton);
    // обрабатываем нажатие на кнопку "Сохранить"
    saveButton.addEventListener('click', async function () {
        // получаем новое значение поля
        let newValue = textarea.textContent;
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
        //30 строчки слэшэним
        if (newValue.length > 30) {
            newValue = newValue.split('').reduce((acc, val, index) => {
                return index % 30 === 0 && index > 0 ? `${acc}\n${val}` : `${acc}${val}`;
            }, '');
        }
        // заменяем элемент textarea на p с обновленным значением
        let newElement = document.createElement('p');
        newElement.textContent = newValue;
        field.replaceChild(newElement, textarea);
        // удаляем кнопку "Сохранить"
        field.removeChild(saveButton);
    });
}

// получаем все кнопки "Изменить" на странице
let editButtonsAboutMe = document.querySelectorAll('.edit-button-special');

// добавляем обработчики событий для всех кнопок "Изменить"
for (let i = 0; i < editButtonsAboutMe.length; i++) {
    editButtonsAboutMe[i].addEventListener('click', function(event) {
        // получаем поле, которое нужно отредактировать
        let field = this.closest('.data-field > div');
        // делаем поле редактируемым
        makeEditableAboutMe(field);
    });
}

const logoutButton = document.querySelector('.logout-button');
logoutButton.addEventListener('click', async function () {
    await fetch('/logout', {method: 'POST' });
    window.location.href = '/ideas';
});