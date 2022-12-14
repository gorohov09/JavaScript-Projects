function timer() {
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
}

module.exports = timer;