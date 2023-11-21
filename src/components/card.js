// Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;
  

// Функция создания карточки

  function createCard(cardItem, deleteCard, openPopupTypeImage, likeCard) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    cardTitle.textContent = cardItem.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    const cardLikeButton = cardElement.querySelector(".card__like-button");
    cardLikeButton.addEventListener('click', likeCard);

    cardImage.addEventListener('click', openPopupTypeImage);
    return cardElement;
  };

// Функция удаления карточки

  function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
  };

// Функция лайк карточки
  
  function likeCard(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  };

  export { createCard, deleteCard, likeCard }