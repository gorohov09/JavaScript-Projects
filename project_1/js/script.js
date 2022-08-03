"use strict";

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: true,

    start: function(){
        personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?','');

        while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
            personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?','');
        }
    },

    rememberMyFilms: function(){
        for (let i = 0; i < 2; i++){
            const a = prompt('Один из последних просмотренных фильмов?','').trim();
            const b = prompt('На сколько оцените его?','');
        
            if (a == '' || a.length > 50 || b == ''){
                alert('Некорректный ввод! Повтори попытку!');
                i--;
                continue;
            }
            else{
                personalMovieDB.movies[a] = b;
            }
        }
    },
    detectPersonalLevel: function(){
        if (personalMovieDB.count < 10){
            console.log('Просмотрено довольно мало фильмов');
        }
        else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30){
            console.log('Вы классический зритель');
        }
        else if (personalMovieDB.count > 30){
            console.log('Вы киноман');
        }
        else{
            console.log('Произошла ошибка');
        }
    },
    showMyDB: function(hidden){
        if (hidden != false){
            console.log(personalMovieDB);
        }
    },
    writeYourGenres: function(){
        for (let i = 0; i < 1; i++){
            let genres = prompt(`Введите ваши любимые жанры через запятую`);
            if (genres == '' || genres == null){
                console.log('Вы ввели некорректные данные или не ввели их вообще');
                i--;
            }
            else{
                personalMovieDB.genres = genres.split(', ');
                personalMovieDB.genres.sort();
            }
        }

        personalMovieDB.genres.forEach((item, i) => {
            console.log(`Любимый жанр ${i +1} - это ${item}`);
        });
    },
    
    toggleVisibleMyDB: function(){
        if (personalMovieDB.privat){
            personalMovieDB.privat = false;
        }
        else{
            personalMovieDB.privat = true;
        }
    }
};

personalMovieDB.rememberMyFilms();
console.log(personalMovieDB);