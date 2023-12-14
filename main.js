(()=>{"use strict";var e={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-2",headers:{authorization:"00a50603-3b89-411f-9cf8-279a0dd3be9f","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}function o(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}var r=document.querySelector("#card-template").content;function c(e,t,n,o,c){var a=r.querySelector(".card").cloneNode(!0);a.id=e._id;var i=a.querySelector(".card__image"),u=a.querySelector(".card__title");i.src=e.link,i.alt=e.name,u.textContent=e.name;var l=a.querySelector(".card__delete-button");e.owner._id!==c?l.classList.add("card__delete-button-hidden"):l.addEventListener("click",(function(){t(e._id,a)}));var s=e.likes.some((function(e){return e._id===c})),d=a.querySelector(".card__like-button");s&&d.classList.add("card__like-button_is-active");var p=a.querySelector(".card__like-number");return p.textContent=e.likes.length,d.addEventListener("click",(function(){o(d,p,a.id)})),i.addEventListener("click",n),a}function a(e,t,r){(e.classList.contains("card__like-button_is-active")?o:n)(r).then((function(n){e.classList.toggle("card__like-button_is-active"),t.textContent=n.likes.length})).catch((function(e){console.log(e)}))}function i(n,o){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(n).then((function(){o.remove()})).catch((function(e){console.log(e)}))}function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",s),document.addEventListener("click",d)}function l(e){e.classList.remove("popup_is-opened"),document.addEventListener("keydown",s),document.addEventListener("click",d)}function s(e){"Escape"===e.key&&l(document.querySelector(".popup_is-opened"))}function d(e){e.target.classList.contains("popup_is-opened")&&l(document.querySelector(".popup_is-opened"))}function p(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}function f(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):_(t,n)}function m(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){p(e,n,t)})),_(o,t)}function _(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var v=document.querySelector(".places__list"),h=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),S=document.querySelectorAll(".popup__close"),g=document.querySelector(".popup_type_edit"),C=document.querySelector(".popup_type_new-card"),E=document.querySelector(".popup_type_image"),q=document.querySelector(".popup__image"),L=document.querySelector(".popup__caption"),k=document.querySelector(".popup_type_edit-image"),x=document.forms["edit-profile"],A=x.elements.name,w=x.elements.description,U=document.querySelector(".profile__title"),T=document.querySelector(".profile__description"),j=document.querySelector(".profile__image"),O=x.querySelector(".popup__button"),B=document.forms["new-place"],P=B.elements["place-name"],D=B.elements.link,I=B.querySelector(".popup__button"),M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},N=document.querySelector(".profile__image-edit-button"),J=document.forms["update-avatar"],G=J.elements.url,H=J.querySelector(".popup__button");function V(e){q.src=e.target.src,q.alt=e.target.alt,L.textContent=e.target.alt,u(E)}h.addEventListener("click",(function(){A.value=U.textContent,w.value=T.textContent,m(x,M),u(g)})),b.addEventListener("click",(function(){m(B,M),u(C)})),N.addEventListener("click",(function(){m(J,M),u(k)})),x.addEventListener("submit",(function(n){var o,r;n.preventDefault(),O.textContent="Сохранение...",(o=A.value,r=w.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o,about:r})}).then(t)).then((function(e){U.textContent=e.name,T.textContent=e.about,l(g)})).catch((function(e){console.log(e)})).finally((function(){O.textContent="Сохранить"}))})),B.addEventListener("submit",(function(n){n.preventDefault(),I.textContent="Сохранение...";var o,r,u={name:P.value,link:D.value};(o=u.name,r=u.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:o,link:r})}).then(t)).then((function(e){var t=c(e,i,V,a,e.owner._id);v.prepend(t),l(C)})).catch((function(e){console.log(e)})).finally((function(){I.textContent="Сохранить"}))})),S.forEach((function(e){e.addEventListener("click",(function(e){l(e.target.closest(".popup"))}))})),[g,C,E].forEach((function(e){e.classList.add("popup_is-animated")})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);f(n,o,t.inactiveButtonClass),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?p(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));r.textContent=n,t.classList.add(o.inputErrorClass),r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),f(n,o,t)}))}))}(t,e)}))}(M),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then(t)]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],u=o[1];U.textContent=r.name,T.textContent=r.about,j.style.backgroundImage="url('".concat(r.avatar,"')");var l=r._id;u.forEach((function(e){var t=c(e,i,V,a,l);v.append(t)}))})).catch((function(e){console.log(e)})),J.addEventListener("submit",(function(n){var o;n.preventDefault(),H.textContent="Сохранение...",(o=G.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then(t)).then((function(e){j.style.backgroundImage="url('".concat(e.avatar,"')"),l(k)})).catch((function(e){console.log(e)})).finally((function(){H.textContent="Сохранить"}))}))})();