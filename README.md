# [Место Russia auth](https://v1ktorbro.github.io/mesto/index.html)

## Используемый стэк :

**JavaScript, CSS3, API fetch, БЭМ nested**

## О проеке

В приложении ["Mesto Russia"](https://v1ktorbro.github.io/mesto/index.html) можно поменять информацию о пользователе, изменить аватар, разместить свою любимую пикчу, а так же удалить ее.
Все запросы делаются при помощи API fetch.

Перед отправкой данных на сервер вся информация проходит валидацию формы.
Посмотреть логику валидации можно [здесь](https://github.com/v1ktorbro/mesto/blob/master/src/components/FormValidator.js).

Проект отображается корректно как и на компьютере, так и на телефоне. Реализована адаптивная(резиновая) вёрстка. 

### Структура проекта

    blocks/     | CSS для бллоков. Проект оформлен по структуре БЭМ nested;
    fonts/      | шрифт Inter;
    images/     | svg изображения размещенные на странице;
    vendor/     | normalize.css
    src/        | логика приложения;
        components/ | компоненты страницы;
        pages/      | index.css, index.js;
        utils/      | находятся нужные переменные, которые отделены от основного кода;
        index.html


### Авторы

* **Яндекс.Практикум** *гуру и наставник* - [Yandex.Practikum](https://praktikum.yandex.ru);

* **Виктор Абросимов** *писарь* - [linkedin](https://www.linkedin.com/in/victor-abrosimov-631b6b1a4/);
