import { likeCard, dislikeCard } from './api.js';

// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;
  
// Функция создания карточки

  function createCard(cardItem, deleteCard, openPopupTypeImage, likeCardFunction, ownerId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.id = cardItem._id;
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    cardTitle.textContent = cardItem.name;
    const cardId = cardItem._id;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (!(cardItem.owner._id === ownerId)) {
      deleteButton.classList.add('card__delete-button-hidden');
    } else {
      deleteButton.addEventListener('click', () => {
        deleteCard(cardId)
        .then ((res) => {
          cardElement.remove();
          console.log(res);
        })
        .catch ((err) => {
          console.log(err);
        })
      });
    }

    //cardLikeButton.addEventListener('click', likeCard);

    function ownerLike(element) {
      return element._id === ownerId;
    }

    const hasOwnerLike = cardItem.likes.find(ownerLike);
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    if (hasOwnerLike) {
      cardLikeButton.classList.add('card__like-button_is-active');
    }
    
    const likeCounter = cardElement.querySelector('.card__like-number');
    likeCounter.textContent = cardItem.likes.length;
    cardLikeButton.addEventListener('click', () => {
      likeCardFunction(cardLikeButton, likeCounter, cardElement.id);
    })

    cardImage.addEventListener('click', openPopupTypeImage);
    return cardElement;
  };

// Функция лайк карточки

  function likeCardFunction(likeButton, likeCounter, cardId) {
 
    if (likeButton.classList.contains('card__like-button_is-active')) {
      dislikeCard(cardId)
      .then((res) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      likeCard(cardId)
      .then((res) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

// Функция удаления карточки

  //function deleteCard(evt) {
    //evt.target.closest('.places__item').remove();
  //};

// Функция лайк карточки
  
  //function likeCard(evt) {
    //evt.target.classList.toggle("card__like-button_is-active");
  //};

  export { createCard, likeCardFunction/*deleteCard, likeCard*/ }