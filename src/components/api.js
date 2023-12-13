//Загрузка информации о пользователе с сервера

 function getUserData() {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/users/me', {
        method: 'GET',
        headers: {
            authorization: '00a50603-3b89-411f-9cf8-279a0dd3be9f',
            'Content-Type': 'application/json'
        },
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
 }

// Загрузка карточек с сервера

function getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/cards', {
        method: 'GET',
        headers: {
            authorization: '00a50603-3b89-411f-9cf8-279a0dd3be9f',
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
}

// Редактирование профиля

function editProfileData(profileName, profileJob) {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '00a50603-3b89-411f-9cf8-279a0dd3be9f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: profileName,
            about: profileJob,
          })
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
}

// Добавление новой карточки

function addNewCard(cardName, cardLink) {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/cards', {
        method: 'POST',
        headers: {
            authorization: '00a50603-3b89-411f-9cf8-279a0dd3be9f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardName,
            link: cardLink
          })
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
}

// Удаление карточки

function deleteCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-2/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '00a50603-3b89-411f-9cf8-279a0dd3be9f',
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
}

// Постановка лайка

function likeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-2/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: '00a50603-3b89-411f-9cf8-279a0dd3be9f',
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
}

// Удаление лайка

function dislikeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-2/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '00a50603-3b89-411f-9cf8-279a0dd3be9f',
            'Content-Type': 'application/json'
        }
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
}

function updateAvatar(url) {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: '00a50603-3b89-411f-9cf8-279a0dd3be9f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: url
          })
    })
    .then((res) => {
        if(res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    })
}

export { getUserData, getInitialCards, editProfileData, addNewCard, deleteCard, likeCard, dislikeCard, updateAvatar }