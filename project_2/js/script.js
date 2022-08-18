'use strict';

document.addEventListener('DOMContentLoaded', () => {

    //База данных

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    //Получение элементов со страницы

    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]'),
          confirmBtn = addForm.querySelector('.add button'),
          deleteIcon = document.querySelector('.delete');

    //Обработчики событий

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21){
                newFilm = newFilm.slice(0, 22) + '...';
            }

            if (favorite)
                console.log('Добавлен любимый фильм');

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
        }
            

        event.target.reset(); //Очистили форму
    });
    
    //Функции Function Expression

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        genre.textContent = "драма";
    
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    const createMovieList = (films, parent) => {
        parent.innerHTML = '';
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${++i} ${film}
                <div class="delete"></div>
            </li>`;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove(); //Удаление со страницы
                movieDB.movies.splice(i, 1); //Удаление из БД
                createMovieList(films, parent); //Перестроение списка
            });
        });
    };

    //Вызовы функций

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});




