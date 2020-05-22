const formObject = {
  formSelector: '.popap__container',
  inputSelector: '.popap__input',
  submitButtonSelector: '.popap__input-save', // кнопка 'сохранить' | 'создать'
  inactiveButtonClass: 'popap__input-save_inactive',
  inputErrorClass: 'popap__input-name_type_error', //красная линия под инпутом
  errorSpanClass: 'popap__input-error_active' //span с текстом ошибки
};

function checkInputValidity(form, input) {
  if (!input.checkValidity()) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

//проверяем есть ли хоть один невалидный инпут
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.checkValidity();
  })
};

function showInputError(form, input, errorMessage) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(formObject.inputErrorClass);
  errorElement.classList.add(formObject.errorSpanClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(formObject.inputErrorClass);
  errorElement.classList.remove(formObject.errorSpanClass);
  errorElement.textContent = '';
};

//очищалка ошибок у инпутов
function clearInputError(inputsList, form, btnElem) {
  inputsList.forEach((input) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(formObject.inputErrorClass);
    //если в форме если хоть один невалидный инпут и кнопка не содержит класс с инактивацией кнопки
    if (hasInvalidInput(inputsList) && !btnElem.classList.contains(formObject.inactiveButtonClass)) {
      btnElem.classList.add(formObject.inactiveButtonClass);
    } else {
      btnElem.classList.remove(formObject.inactiveButtonClass);}
  })
};

const formEdit = popapEdit.querySelector('.popap__container'); //форма редактирования профиля

function toggleButtonState (inputList, btnElem) {
  if(hasInvalidInput(inputList)) {
    btnElem.disabled = true;
    btnElem.classList.add(formObject.inactiveButtonClass);
  } else {
    btnElem.disabled = false;
    btnElem.classList.remove(formObject.inactiveButtonClass);
  }
};

function setEventListener(form) {
  const inputList = Array.from(form.querySelectorAll(formObject.inputSelector));
  const btnElem = form.querySelector(formObject.submitButtonSelector);
  toggleButtonState(inputList, btnElem);
  inputList.forEach((input) => {
    input.addEventListener('input', ()=> {
      checkInputValidity(form, input);
      toggleButtonState(inputList, btnElem);
    })
  })
};

const popaps = document.querySelectorAll('.popap'); //собираем все попапы чтобы накинуть на них оверлей

//ф-я для закртия поп-ап окна клавишей 'Esc'
function escHandler(evt) {
  if (evt.key === 'Escape') {
    popapEdit.classList.add('popap_closed');
    popapPlus.classList.add('popap_closed');
    popapImage.classList.add('popap-image_closed');
  }
};

function overlayPopap(evt) {
  if (evt.target.classList.contains('popap')) {
    evt.target.classList.add('popap_closed');
    document.removeEventListener('keydown', escHandler);
  }
  if (evt.target.classList.contains('popap-image')) {
    evt.target.classList.add('popap-image_closed');
    document.removeEventListener('keydown', escHandler);
  }
};

popapImage.addEventListener('click', overlayPopap);
popaps.forEach((popap) => {
  popap.addEventListener('mousedown', overlayPopap);
});

function enableValidation (formObject) {
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault);
    setEventListener(form);
  })
};
enableValidation(formObject);
