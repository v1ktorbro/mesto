const popap = document.querySelector('.popap');
const popapOpen = document.querySelector('.profile__btn-edit');
const popapClose = popap.querySelector('.popap__close');
const btnSave = popap.querySelector('.popap__input-save');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__signature');
// Находим форму в DOM
const formElement = document.querySelector('.popap__container');
// переменная, которая отвечает за поле ввода имени в поп-окне
const nameInput = formElement.querySelector('.popap__input-name');
//перменная, которая отвечает за поле ввода "о себе"
const jobInput = formElement.querySelector('.popap__input-signature');

function popapOn() {
  popap.classList.remove('popap_opened');
}

function popapOff() {
  popap.classList.add('popap_opened')
}

//При клике на кнопку Edit поп-ап откроется
popapOpen.addEventListener('click', popapOn);

//При клике на крести поп-ап закроется
popapClose.addEventListener('click', popapOff);

// создаем ф-ю, кот-я будет отвечает за изменение имени и информации о себе
function formEditProfile() {
    //на главной "имя" и "о себе" будут принимать значения, которые пропишут в поп-ап окне
  	profileName.innerHTML = `${nameInput.value}`;
  	profileJob.innerHTML = `${jobInput.value}`;

    popapOff();
}
// функция срабатывает тогда, когда в поп-ап окне нажимается кнопка "Сохранить"
btnSave.addEventListener('click', formEditProfile);

function loadProfileInPopap() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

loadProfileInPopap();