// Функция показать ошибку

function showInputError(formElement, inputElement, errorMessage, validationObject) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(validationObject.inputErrorClass);
    errorElement.classList.add(validationObject.errorClass);
}

// Функция скрыть ошибку

function hideInputError(formElement, inputElement, validationObject) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationObject.inputErrorClass);
    errorElement.classList.remove(validationObject.errorClass);
    errorElement.textContent = "";
}

// Функция проверки валидности

function isValid(formElement, inputElement, validationObject) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationObject);
    } else {
        hideInputError(formElement, inputElement, validationObject);
    }
}

// Функция добавления обработчиков всем полям формы

function setEventListeners(formElement, validationObject) {
    const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
    const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationObject.inactiveButtonClass);

    inputList.forEach(function (inputElement) {
        inputElement.addEventListener("input", function () {
            isValid(formElement, inputElement, validationObject);
            toggleButtonState(inputList, buttonElement, validationObject);
        });
    });
}

// Функция добавления обработчиков всем формам

function enableValidation(validationObject) {
    const formList = Array.from(document.querySelectorAll(validationObject.formSelector));
    formList.forEach(function (formElement) {
        setEventListeners(formElement, validationObject);
    });
}

// Функция проверки на наличие невалидных инпутов

function hasInvalidInput(inputList) {
    return inputList.some(function (inputElement) {
        return !inputElement.validity.valid;
    });
}

// Функция переключения кнопки

function toggleButtonState(inputList, buttonElement, validationObject) {
    if (hasInvalidInput(inputList)) {
        disableButtonMethod(buttonElement, validationObject);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationObject.inactiveButtonClass);
    }
}

//  Функция очистки ошибок валидации

function clearValidation(formElement, validationObject) {
    const inputList = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
    const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);

    inputList.forEach(function (inputElement) {
        hideInputError(formElement, inputElement, validationObject);
    });
    disableButtonMethod(buttonElement, validationObject);
}

function disableButtonMethod(button, validationConfig) {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
}

export { enableValidation, clearValidation };
