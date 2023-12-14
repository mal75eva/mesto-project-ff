function openModalWindow(popupElement) {
    popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeModalWindowByEsc);
    document.addEventListener("click", closeModalWindowByClickOnOverlay);
}

function closeModalWindow(popupElement) {
    popupElement.classList.remove("popup_is-opened");
    document.addEventListener("keydown", closeModalWindowByEsc);
    document.addEventListener("click", closeModalWindowByClickOnOverlay);
}

function closeModalWindowByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        closeModalWindow(openedPopup);
    }
}

function closeModalWindowByClickOnOverlay(evt) {
    if (evt.target.classList.contains("popup_is-opened")) {
        const openedPopup = document.querySelector(".popup_is-opened");
        closeModalWindow(openedPopup);
    }
}

export { openModalWindow, closeModalWindow };
