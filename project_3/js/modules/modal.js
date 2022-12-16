//Функция, для открывания модального окна
const openModal = (modalSelector, modalTimerId) => {
    const modal = document.querySelector(modalSelector);
    console.log(modal);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
};

    //Функция для закрывания модального окна
const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

function modal(triggerSelector, modalSelector, modalTimerId) {
    //Получение элементов с верстки
    const btnsOpenModal = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    //Назначение кнопкам события - открытие модального окна
    btnsOpenModal.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    //Закрытие модального окна, если кликнули по пустой области(вне диалогового кона)
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    //Закрытие модального окна при клике на ESC
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')){
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); //Удаление события
        }
    }

    //Открытие модального окна, когда долистали до конца
    window.addEventListener('scroll', showModalByScroll); //Событие выполняется один раз
}

export default modal;
export  {closeModal};
export {openModal};