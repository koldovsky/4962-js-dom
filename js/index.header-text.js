const h1 = document.querySelector('h1');

const greetings = [
    'Привіт!',
    'Вітаю!',
    'Привітання!',
    'Доброго дня!',
    'Щасти!',
];


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

h1.innerText = greetings[Math.floor(Math.random() * greetings.length)];
h1.style.color = getRandomColor();