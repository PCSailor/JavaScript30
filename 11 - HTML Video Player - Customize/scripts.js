console.log("Script.js is run");
// Get elements on page
const player = document.querySelector('.player'); // get the player
const video = player.querySelector('.viewer'); // gets actual video
const progress = player.querySelector('.progress'); // gets progress bar
const progressBar = player.querySelector('.progress__filled'); // gets progress__filled
const toggle = player.querySelector('.toggle'); // gets toggle
const skipButtons = player.querySelector('[data-skip]'); // gets skip buttons
const ranges = player.querySelector('.player__slider'); // gets player slider


// Build out functions
// 01_Toggle to either play or pause video
function togglePlay() { // entering 'togglePlay()' in console plays/pauses video
 // version01
 // paused is a property that lives on the video, there is no play property
 /* if(video.paused) { // Question: notice paused?
  video.play();
 } else {
  video.pause(); // Question: notice pause?
 } */
 // version02 - use a ternery operator
 /* const method = video.paused ? 'play' : 'pause';
 video[method](); */
// version03 - use a ternery operator without variable
 video[video.paused ? 'play' : 'pause']();
}




// Hook up event listeners
// once have togglePlay function, need to hook it up to the video and the button
video.addEventListener('click', togglePlay); // plays/pauses video when video window clicked
toggle.addEventListener('click', togglePlay); // plays/pauses video when play button clicked

// Note: to change play/pause icons, best way is listen to video for pause.  Whatever causes video pause (ie: plugin) will change button icon.  // This doesn't tie into the 'function togglePlay' & only listens to video condition
function updateButton() {
 console.log('updateButton clicked');
 const icon = this.paused ? '►' : '❚ ❚'; // notice paused, not pause
 toggle.textContent = icon;
}
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
// video.play() or video.pause() to play/pause video from console

// left off at 10:50


