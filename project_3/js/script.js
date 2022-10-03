"use strict";

window.addEventListener('DOMContentLoaded', () => {

    //Табы
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader');

    //Скрытие табов
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    //Показать определенный таб(i - индекс)
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target; //Получаем объект, по которому кликнули мышкой

        if (target && target.classList.contains('tabheader__item')){ //Проверяем, что кликнули по табу
            tabs.forEach((item, i) => { //Перебираем все табы
                if (target == item){ //Если таб совпал с тем, по которому кликнули
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    //Таймер

    //Получение информации для отображения
    function getTimeRemaining(endtime){
        const t = Date.parse(endtime); //Получим колличество мл.с нашего дедлайна
        const now = new Date().getTime(); //Получим кол-во мл.с у пользователя(сейчас)
        const time = t - now;

        if (time < 0){
            return {
                'total': 0,
                'days': 0,
                'hours': 0,
                'minutes': 0,
                'seconds': 0
            };
        }

        const days = Math.floor(time / (1000 * 60 * 60 * 24)), //Получаем кол-во суток которое осталось до дедлайна
              hours = Math.floor((time / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((time / 1000 / 60) % 60),
              seconds = Math.floor((time / 1000) % 60);

        return {
            'total': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    //Установка времени
    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        
        updateClock(); //Запустим сами заранее, чтобы установить нужную дату

        //Служебная функция для установки 0, например: 5 часов -> 05 часов
        function getZeroInDate(num) {
            if (num > 0 && num < 10)
                return `0${num}`;
            else
                return `${num}`;
        }

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZeroInDate(t.days);
            hours.innerHTML = getZeroInDate(t.hours);
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    const deadline = '2023-09-27'; //Дедлайн
    setClock('.timer', deadline);

    //Modal

    //Получение элементов с верстки
    const btnsOpenModal = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          btnCloseModal = document.querySelector('[data-close]');

    //Функция, для открывания модального окна
    const openModal = (e) => {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    };

    //Функция для закрывания модального окна
    const closeModal = () => {
        // modal.classList.add('hide');
        // modal.classList.remove('show');
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    };

    //Назначение кнопкам события - открытие модального окна
    btnsOpenModal.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    //Назначение кнопке события - закрытие модального окна
    btnCloseModal.addEventListener('click', closeModal);

    //Закрытие модального окна, если кликнули по пустой области(вне диалогового кона)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    //Закрытие модального окна при клике на ESC
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    //Открытие модального окна, через какое-то время
    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll); //Удаление события
        }
    }

    //Открытие модального окна, когда долистали до конца
    window.addEventListener('scroll', showModalByScroll); //Событие выполняется один раз


    //Карточки меню(используем классы)

    class MenuCard {

        constructor(imageSrc, imageAlt, title, descr, price, parentSelector, ...classes){
            this.imageSrc = imageSrc;
            this.imageAlt = imageAlt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27; //Статический курс валют
            this.changeToUAH(); //Выполнится самым последним
        }

        //Дополнительный функционал для перевода из долларов в гривны
        changeToUAH(){
            this.price = this.price * this.transfer;
        }

        //Рендеринг верстки
        render() {
            const element = document.createElement('div');

            if (this.classes.length == 0)
                this.classes.push('menu__item');

            //Назначаем классы нашему элементу
            this.classes.forEach(className => element.classList.add(className));

            element.innerHTML = `
                <img src=${this.imageSrc} alt=${this.imageAlt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            //Добавляем вновь созданный элемент внутрь родителя
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg", 
        "vegy", 
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container').render();

    new MenuCard(
        "img/tabs/elite.jpg", 
        "elite", 
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        500,
        '.menu .container',
        'menu__item').render();

    new MenuCard(
        "img/tabs/vegy.jpg", 
        "vegy", 
        'Меню "Хочу и буду"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container',
        'menu__item').render();
    

});

