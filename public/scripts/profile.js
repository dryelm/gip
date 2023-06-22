 // функция для создания редактируемого поля
        function makeEditable(field) {
            // получаем текущее значение поля
            let value = field.querySelector('h2, p').textContent;
            // создаем новый элемент input
            let input = document.createElement('input');
            input.type = 'text';
            input.value = value;
            // заменяем элемент p или h2 на input
            field.replaceChild(input, field.querySelector('h2, p'));
            // создаем кнопку "Сохранить"
            let saveButton = document.createElement('button');
            saveButton.textContent = 'Сохранить';
            field.appendChild(saveButton);
            // обрабатываем нажатие на кнопку "Сохранить"
            saveButton.addEventListener('click', function() {
                // получаем новое значение поля
                let newValue = input.value;
                // отправляем новое значение на сервер
                // ...
                // заменяем элемент input на p или h2 с обновленным значением
                let newElement = document.createElement(field.querySelector('h2') ? 'h2' : 'p');
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
                let field = this.closest('.data-field');
                // делаем поле редактируемым
                makeEditable(field);
            });
        }
