export {
  formObject, configFormPlus, renderLoading,
};

const formObject = {
  formSelector: '.popap__container',
  inputSelector: '.popap__input',
  submitButtonSelector: '.popap__input-save', // кнопка 'сохранить' | 'создать'
  inactiveButtonClass: 'popap__input-save_inactive',
  inputErrorClass: 'popap__input-name_type_error', //красная линия под инпутом
  errorSpanClass: 'popap__input-error_active', //span с текстом ошибки
};

const configFormPlus = (popap, formObject) => {
  const form = document.querySelector(popap);
  const inputList = form.querySelectorAll(".popap__input");
  inputList.forEach(input => input.value = "");
  //т.к в форме создания карточек изначально инфа отсутствует, кнопка будет неактивной при открытии
  const btnCreate = form.querySelector(".popap__input-save");
  btnCreate.classList.add(formObject.inactiveButtonClass);
};

const renderLoading = (isLoading, popapSelector, text) => {
  const popap = document.querySelector(popapSelector);
  const btnSave = popap.querySelector('.popap__text-color');
  if(isLoading) {
    btnSave.textContent = 'Сохранение...';
  } else {
    btnSave.textContent = text;
  }
};
