// @todo: Темплейт карточки

  const cardTemplate = document.querySelector("#card-template").content;
  
// @todo: DOM узлы

  const placesList = document.querySelector(".places__list");
  
// @todo: Функция создания карточки

  function createCard(cardItem, deleteCard) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    cardTitle.textContent = cardItem.name;
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    return cardElement;
  };

// @todo: Функция удаления карточки

  function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
  }

// @todo: Вывести карточки на страницу

  initialCards.forEach(function(cardItem) {
    const listItem = createCard(cardItem, deleteCard);
    placesList.append(listItem);
  });
