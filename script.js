document.addEventListener('DOMContentLoaded', () => {
  const ideaInput = document.getElementById('idea-input');
  const addButton = document.getElementById('add-button');
  const calendarContainer = document.getElementById('calendar-container');

  // Функція для додавання ідеї
  const addIdea = () => {
    const ideaText = ideaInput.value.trim();
    if (ideaText === '') return;

    const currentDate = new Date().toLocaleDateString();
    const ideaCard = document.createElement('div');
    ideaCard.classList.add('idea-card');

    ideaCard.innerHTML = `
      <p>${ideaText}</p>
      <p class="idea-date">Додано: ${currentDate}</p>
      <button class="edit-button">Редагувати</button>
    `;

    calendarContainer.appendChild(ideaCard);
    ideaInput.value = '';

    // Додаємо функціонал кнопки "Редагувати"
    const editButton = ideaCard.querySelector('.edit-button');
    editButton.addEventListener('click', () => {
      const ideaParagraph = ideaCard.querySelector('p:first-child');
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = ideaParagraph.textContent;

      ideaCard.replaceChild(editInput, ideaParagraph);
      editInput.focus();

      editInput.addEventListener('blur', () => {
        ideaParagraph.textContent = editInput.value.trim() || 'Без назви';
        ideaCard.replaceChild(ideaParagraph, editInput);
      });
    });
  };

  // Додавання ідеї по кліку на кнопку
  addButton.addEventListener('click', addIdea);

  // Додавання ідеї по клавіші Enter
  ideaInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addIdea();
    }
  });
});