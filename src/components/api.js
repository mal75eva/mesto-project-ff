//Конфиг

const config = {
    baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-2",
    headers: {
        authorization: "00a50603-3b89-411f-9cf8-279a0dd3be9f",
        "Content-Type": "application/json",
    },
};

//Результат запроса

function getResult(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

//Загрузка информации о пользователе с сервера

function getUserData() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers,
    })
    .then(getResult);
}

// Загрузка карточек с сервера

function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers,
    })
    .then(getResult);
}

// Редактирование профиля

function editProfileData(profileName, profileJob) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: profileName,
            about: profileJob,
        }),
    })
    .then(getResult);
}

// Добавление новой карточки

function addNewCard(cardName, cardLink) {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink,
        }),
    })
    .then(getResult);
}

// Удаление карточки

function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then(getResult);
}

// Постановка лайка

function likeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers,
    })
    .then(getResult);
}

// Удаление лайка

function dislikeCard(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then(getResult);
}

// Обновление аватара

function updateAvatar(url) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: url,
        }),
    })
    .then(getResult);
}

export { getUserData, getInitialCards, editProfileData, addNewCard, deleteCard, likeCard, dislikeCard, updateAvatar };
