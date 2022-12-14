function modal() {
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
}

module.exports = modal;