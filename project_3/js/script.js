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
          modal = document.querySelector('.modal');

    //Функция, для открывания модального окна
    const openModal = (e) => {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    };

    //Функция для закрывания модального окна
    const closeModal = () => {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    //Назначение кнопкам события - открытие модального окна
    btnsOpenModal.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    //Закрытие модального окна, если кликнули по пустой области(вне диалогового кона)
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
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

    const getMenuCards = async (url) => {
        const res = await fetch(url);

        if (!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getMenuCards('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(
                    img,
                    altimg,
                    title,
                    descr,
                    price,
                    '.menu .container'
                ).render();
            });
        });

    //Используем библиотеку axios
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(
    //                 img,
    //                 altimg,
    //                 title,
    //                 descr,
    //                 price,
    //                 '.menu .container'
    //             ).render();
    //         });
    //     });

    //Forms
    
    //Получение форм
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    //Передача каждой формы в метод postData()
    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //Отмена стандартного поведения

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.append(statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json) //Вынесли код
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    //Slider

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'), //Главная обертка для слайдов
          slidesField = document.querySelector('.offer__slider-inner'), //Поле с нашими слайдами
          width = window.getComputedStyle(slidesWrapper).width; 

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10){
        total.textContent = `0${slides.length}`;
    }
    else{
        total.textContent = `${slides.length}`;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0){
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    showPositionSlideAndDots(slideIndex);

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)){
            offset = 0;
            slideIndex = 1;
        } else {
            offset += +width.slice(0, width.length - 2);
            slideIndex++;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        showPositionSlideAndDots(slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0){
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            slideIndex = slides.length;
        } else {
            offset -= +width.slice(0, width.length - 2);
            slideIndex--;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        showPositionSlideAndDots(slideIndex);
    });

    function showPositionSlideAndDots(n){
        if (n < 10){
            current.textContent = `0${n}`;
        }
        else{
            current.textContent = `${n}`;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    //Навигация по нажатию на определенную точку на слайдере
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset += +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            showPositionSlideAndDots(slideTo);
        });
    });

    // const getMyApi = async (url) => {
    //     const res = await fetch(url);

    //     if (!res.ok){
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }

    //     return await res.json();
    // };

    // getMyApi('http://localhost:5264/api/employees/all')
    //     .then(data => console.log(data));

    // // fetch('http://localhost:8080/example', {
    // //         mode: 'no-cors',
    // //         method: "post",
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

});

