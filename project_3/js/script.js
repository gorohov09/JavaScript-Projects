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

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        
        updateClock(); //Запустим сами заранее, чтобы установить нужную дату

        function setZeroInDate(num) {
            if (num >= 0 && num < 10)
                return `0${num}`;
            else
                return `${num}`;
        }

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = setZeroInDate(t.days);
            hours.innerHTML = setZeroInDate(t.hours);
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    const deadline = '2022-09-27'; //Дедлайн
    setClock('.timer', deadline);

});

