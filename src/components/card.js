import { likeCard, dislikeCard, deleteCard } from "./api.js";

// Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки

function createCard(cardItem, deleteCardFunction, openPopupTypeImage, likeCardFunction, ownerId) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.id = cardItem._id;
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    cardTitle.textContent = cardItem.name;

    const deleteButton = cardElement.querySelector(".card__delete-button");
    if (!(cardItem.owner._id === ownerId)) {
        deleteButton.classList.add("card__delete-button-hidden");
    } else {
        deleteButton.addEventListener("click", () => {
            deleteCardFunction(cardItem._id, cardElement);
        });
    }

    function isOwnerLike(element) {
        return element._id === ownerId;
    }

    const hasOwnerLike = cardItem.likes.some(isOwnerLike);
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    if (hasOwnerLike) {
        cardLikeButton.classList.add("card__like-button_is-active");
    }

    const likeCounter = cardElement.querySelector(".card__like-number");
    likeCounter.textContent = cardItem.likes.length;
    cardLikeButton.addEventListener("click", () => {
        likeCardFunction(cardLikeButton, likeCounter, cardElement.id);
    });

    cardImage.addEventListener("click", openPopupTypeImage);
    return cardElement;
}

// Функция лайк карточки

function likeCardFunction(likeButton, likeCounter, cardId) {
    const likeMethod = likeButton.classList.contains("card__like-button_is-active") ? dislikeCard : likeCard;
    likeMethod(cardId)
        .then((res) => {
            likeButton.classList.toggle("card__like-button_is-active");
            likeCounter.textContent = res.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
}

// Функция удаления карточки

function deleteCardFunction(cardId, cardElement) {
    deleteCard(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => {
            console.log(err);
        });
}

export { createCard, likeCardFunction, deleteCardFunction };