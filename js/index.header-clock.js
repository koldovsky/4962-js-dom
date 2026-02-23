const clockContainer = document.querySelector('.header__clock');

function updateClock() {
    const now = new Date();
    const nowTime = now.toLocaleTimeString('uk');
    clockContainer.innerText = nowTime;
}

updateClock();
setInterval(updateClock, 1000);