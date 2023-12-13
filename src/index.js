import './pages/index.css';
//import { initialCards } from './components/cards.js';
import { createCard, likeCardFunction /*deleteCard, likeCard*/ } from './components/card.js';
import  { openModalWindow, closeModalWindow } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserData, getInitialCards, editProfileData, addNewCard, deleteCard, updateAvatar } from './components/api.js';

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
const popupTypeEditImage = document.querySelector('.popup_type_edit-image');
  
// DOM узлы редактирования профиля 

const formElementEditProfile = document.forms['edit-profile'];
const nameInput = formElementEditProfile.elements.name;
const jobInput = formElementEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const editProfileSubmitButton = formElementEditProfile.querySelector('.popup__button');


// DOM узлы добавления карточки 

const formElementNewCard = document.forms['new-place'];
const placeNameInput = formElementNewCard.elements['place-name'];
const linkInput = formElementNewCard.elements.link;
const newCardSubmitButton = formElementNewCard.querySelector('.popup__button');

// Валидация

const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//DOM узлы редактирования аватара

const imageEditButton = document.querySelector('.profile__image-edit-button');
const formElementUpdateAvatar = document.forms['update-avatar'];
const updateAvatarFormInput = formElementUpdateAvatar.elements.url;
const imageEditSubmitButton = formElementUpdateAvatar.querySelector('.popup__button');

// Вывести карточки на страницу

//initialCards.forEach(function(cardItem) {
  //const listItem = createCard(cardItem, deleteCard, openPopupTypeImage, likeCard);
  //placesList.append(listItem);
//});

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

imageEditButton.addEventListener('click', function() {
  clearValidation(formElementUpdateAvatar, validationObject);
  openModalWindow(popupTypeEditImage);
})

// Редактирование профиля

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); 
  editProfileSubmitButton.textContent = 'Сохранение...';
  
  editProfileData(nameInput.value, jobInput.value)
  .then((res) => {
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    closeModalWindow(popupTypeEdit);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    editProfileSubmitButton.textContent = 'Сохранить';
  });
};

  formElementEditProfile.addEventListener('submit', handleEditProfileFormSubmit); 

// Добавление карточки

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  newCardSubmitButton.textContent = 'Сохранение...';

  const cards = {
  name: placeNameInput.value,
  link: linkInput.value,
};

addNewCard(cards.name, cards.link)
.then((cards) => {
  const ownerId = cards.owner._id;
  const newCard = createCard(cards, deleteCard, openPopupTypeImage, likeCardFunction, ownerId);
  placesList.prepend(newCard);
  closeModalWindow(popupTypeNewCard);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  newCardSubmitButton.textContent = 'Сохранить';
});
  //formElementNewCard.reset();
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

// Загрузка данных пользователя и карточек

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cardData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    const ownerId = userData._id;

    cardData.forEach((cardItem) => {
      const listItem = createCard(cardItem, deleteCard, openPopupTypeImage, likeCardFunction, ownerId);
      placesList.append(listItem);
    })
  })
  .catch((err) => {
    console.log(err);
  });

// Редактирование аватара

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  imageEditSubmitButton.textContent = 'Сохранение...';

  updateAvatar(updateAvatarFormInput.value)
  .then((res) => {
    profileImage.style.backgroundImage = `url('${res.avatar}')`;
    closeModalWindow(popupTypeEditImage);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    imageEditSubmitButton.textContent = 'Сохранить';
  });
}

formElementUpdateAvatar.addEventListener('submit', handleEditAvatarFormSubmit);