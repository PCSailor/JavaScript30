console.log('script.js is loaded');
console.log("clg = console.log");
console.log("This is my code followed along with the tutorial.  It is not working as a seperate script file but does work when embedded in the index.html file.  Why??");

function playSound(e) {
    // console.log(e.keyCode);
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); // provides the audio
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); //provides the animation
    if (!audio) return; // stop function if no key value
    audio.currentTime = 0; //rewinds to the start for repetitive key play
    audio.play();
    // console.log(audio);
    // console.log(key);
    key.classList.add('playing'); // adds CSS animation
    // key.addClass('playing'); // jQuery version of above line
    // key.classList.remove('playing'); // removes CSS animation
    // key.classList.toggle('playing'); // toggles CSS animation
}

function removeTransition(e) {
    // console.log("function removeTransition(e) = ", e);
    // console.log("function removeTransition(e.propertyName) = ", e.propertyName);
    if (e.propertyName !== 'transform') return; // not run if not a transform
    // console.log(this); // <this> is whatever got called (key)
    this.classList.remove('playing');
}


const keys = document.querySelectorAll('.key');
// <document.querySelectorAll('.key')> entered into console shows every key & attributes
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
// keys.addEventListener('transitionend'); cannot be used because the keys are a Node List, not an array.  Must loop over every key and add an event listener.
window.addEventListener('keydown', playSound);