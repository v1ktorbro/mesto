function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popap__container'));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault);
    setEventListener(form);
  })
};
enableValidation();
