import { getResource } from "../services/services";

function cards() {
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

    getResource('http://localhost:3000/menu')
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
}

export default cards;