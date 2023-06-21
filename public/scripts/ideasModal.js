function initIdeasModal() {
    // Получаем элементы модального окна и кнопки закрытия
    const modal = document.getElementById("modal");
    const span = document.getElementsByClassName("close")[0];

    // Получаем все кнопки "Создать команду"
    const createButtons = document.querySelectorAll('.idea-buttons .create');

    // Добавляем обработчик событий к каждой кнопке "Создать команду"
    createButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            // Отменяем действие по умолчанию
            event.preventDefault();

            // Получаем значение ideas_id из атрибута value кнопки
            const ideasId = event.target.value;

            // Обновляем форму в модальном окне
            const form = modal.querySelector('form');
            form.querySelector('input[name="ideas_id"]').value = ideasId;

            // Get the idea name from the button's parent element
            // Update the modal's h3 text with the idea name
            modal.querySelector('h3').textContent =
                button.closest('.idea').querySelector('.idea-name').textContent;

            // Открываем модальное окно
            modal.style.display = "block";
        });
    });

    // Закрываем модальное окно при клике на кнопку закрытия
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Закрываем модальное окно при клике вне его области
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

}

initIdeasModal();


console.log("Hello from ideasModal.js")

