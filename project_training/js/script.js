'use strict';

const box = document.getElementById('box'),
      btns = document.getElementsByTagName('button'),
      circles = document.getElementsByClassName('circle'),
      wrapper = document.querySelector('.wrapper'),
      hearts = wrapper.querySelectorAll('.heart'),
      oneHeart = wrapper.querySelector('.heart');

// box.style.backgroundColor = 'blue';
// box.style.width = '500px';

const num = 500;
box.style.cssText = `background-color: blue; width: ${num}px`;

btns[1].style.borderRadius = '100%';
circles[0].style.backgroundColor = 'red';

// for (let i = 0; i < hearts.length; i++){
//     hearts[i].style.backgroundColor = 'blue';
// }

hearts.forEach(item => {
    item.style.backgroundColor = 'pink';
});

const div = document.createElement('div');
// const text = document.createTextNode('Тут был я');

div.classList.add('black');
wrapper.append(div);

div.innerHTML = "<h1>Hello world</h1>";

div.insertAdjacentHTML('', '<h2>Hello</h2>');
// div.textContent = "hello";

// hearts[0].before(div);
// hearts[0].after(div);

// circles[1].remove(); 

// btns[0].replaceWith(btns[1]);