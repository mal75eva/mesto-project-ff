import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import  { openModalWindow, closeModalWindow } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

// DOM узлы  карточки

const placesList = document.querySelector('.places__list');

// DOM узлы модальных окон

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
  
// DOM узлы редактирования профиля 

const formElementEditProfile = document.forms['edit-profile'];
const nameInput = formElementEditProfile.elements.name;
const jobInput = formElementEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// DOM узлы добавления карточки 

const formElementNewCard = document.forms['new-place'];
const placeNameInput = formElementNewCard.elements['place-name'];
const linkInput = formElementNewCard.elements.link;

// Валидация

const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Вывести карточки на страницу

initialCards.forEach(function(cardItem) {
  const listItem = createCard(cardItem, deleteCard, openPopupTypeImage, likeCard);
  placesList.append(listItem);
});

// Открытие модальных окон 

profileEditButton.addEventListener('click', function() {
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent; 

  clearValidation(formElementEditProfile, validationObject);
  openModalWindow(popupTypeEdit);
});

profileAddButton.addEventListener('click', function() {
  clearValidation(formElementNewCard, validationObject);
  openModalWindow(popupTypeNewCard);
});

function openPopupTypeImage(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModalWindow(popupTypeImage);
};

// Редактирование профиля

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); 

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModalWindow(popupTypeEdit);
};

  formElementEditProfile.addEventListener('submit', handleEditProfileFormSubmit); 

// Добавление карточки

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const cards = {
  name: placeNameInput.value,
  link: linkInput.value,
};

  const newCard = createCard(cards, deleteCard, openPopupTypeImage, likeCard);
  placesList.prepend(newCard);

  closeModalWindow(popupTypeNewCard);
  formElementNewCard.reset();
}

formElementNewCard.addEventListener('submit', handleNewCardFormSubmit);

// Закрытие модальных окон

closeButtons.forEach(function(element) {
  element.addEventListener('click', function (evt) {
    const popupElement = evt.target.closest('.popup');
    closeModalWindow(popupElement);
  });
});

// Плавное открытие и закрытие попапов

const popups = [popupTypeEdit, popupTypeNewCard, popupTypeImage]
popups.forEach(function(popupElement){
  popupElement.classList.add('popup_is-animated');
});

// Вызов функции валидации

enableValidation(validationObject); 