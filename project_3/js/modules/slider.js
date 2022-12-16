function slider() {
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
        if (offset == replaceNotNumber(width) * (slides.length - 1)){
            offset = 0;
            slideIndex = 1;
        } else {
            offset += replaceNotNumber(width);
            slideIndex++;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        showPositionSlideAndDots(slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0){
            offset = replaceNotNumber(width) * (slides.length - 1);
            slideIndex = slides.length;
        } else {
            offset -= replaceNotNumber(width);
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

    function replaceNotNumber(str) {
        return +str.replace(/\D/g, '');
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
}

export default slider;