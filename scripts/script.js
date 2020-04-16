//переменная, кот-я отвечает за весь popap
const popap = document.querySelector('.popap');

// Находим форму в DOM
const formElement = popap.querySelector('.popap__container');

// пееменная, кот-ая отвечает за кнопку Edit
const btnEdit = document.querySelector('.profile__btn-edit');

//переменная, кот-я отвечает за закрытие pop-up в форме "Крестика"
const btnClose = popap.querySelector('.popap__close');

//пеменная, кот-я отвечает за имя профиля в html разметке
const profileName = document.querySelector('.profile__name');

//пеменная, кот-я отвечает за информацию "о себе" в профиле.  html разметка
const profileJob = document.querySelector('.profile__signature');

// переменная, которая отвечает за поле ввода имени в форме pop-up окна
const nameInput = formElement.querySelector('.popap__input-name');

//перменная, которая отвечает за поле ввода "о себе" в форме pup-up окна
const jobInput = formElement.querySelector('.popap__input-signature');

//создаем ф-ю, которая будет отвечать за изменение информации в профиле и в pop-up
function formSubmitHandler(evt) {
  evt.preventDefault(); //когда мы жем на кнопку "сохранить" или 'Enter' форма пытается все засабмитить.
  //из за строки, что я прописал ниже 'formElement.addEventListener('submit', formSubmitHandler);'
  //поэтому мы прерываем стандартное для этой формы действие с помощью 'preventDefault()'

  // при нажатии на кнопку edit функция будет либо менять, либо добавлять класс 'popap_opened' при помощи toggle
  popap.classList.toggle('popap_opened');

  //если у pop-up есть класс с модификатором 'popap_opened' со значением 'display:none' -
  //грузим в html разметку значения, что прописаны у кнопок nameInput и jobInput
  if (popap.classList.contains('popap_opened')) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  } else {
  // иначе поля в кнопках 'Имя' 'О себе' принимают текстовые значения, что прописаны в html разметке
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

//ф-я отвечает за закрытие pop-up (создана для 'крестика')
function close() {
  popap.classList.add('popap_opened');
}
// при клике на 'крестик' pop-up просто закроется, добавив pop-up'y' класс 'popap_opened' со значением 'display:none'
btnClose.addEventListener('click', close);

//при нажатии кнопки 'Edit' в профиле, вызывается ф-я 'formSubmitHandler'
btnEdit.addEventListener('click', formSubmitHandler);

//если в форме нажимают 'сохранить' или 'Enter' у нас происходить отправка события(значения) так как у кнопки 'сохранить' в самом html стоит type='submit'
formElement.addEventListener('submit', formSubmitHandler);
