console.log("Script.js is run");

const secondHand = document.querySelector('.second-hand');

function setDate() {
    // console.log("testr");
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360);
    secondHand.style.transform = 'rotate(${secondsDegrees}deg)';
    // console.log(seconds);

}

setInterval(setDate, 1000);
