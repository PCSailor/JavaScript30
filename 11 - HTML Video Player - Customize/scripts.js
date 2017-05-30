console.log("Script.js is run");
// Get elements on page
const player = document.querySelector('.player'); // get the player
const video = player.querySelector('.viewer'); // gets actual video
const progress = player.querySelector('.progress'); // gets progress bar
const progressBar = player.querySelector('.progress__filled'); // gets progress__filled
const toggle = player.querySelector('.toggle'); // gets toggle
const skipButtons = player.querySelectorAll('[data-skip]'); // gets skip buttons
const ranges = player.querySelectorAll('.player__slider'); // gets player slider


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

// Note: to change play/pause icons, best way is listen to video for pause.  Whatever causes video pause (ie: plugin) will change button icon.  // This doesn't tie into the 'function togglePlay' & only listens to video condition
function updateButton() {
    console.log('updateButton clicked');
    const icon = this.paused ? '►' : '❚ ❚'; // notice paused, not pause
    toggle.textContent = icon;
}

// Skip functionss
// how much video will be skipped - goes to DOM buttons
function skip() {
    console.log('function skip run');
    console.log('this.dataset = ', this.dataset); // object with skip value in it.
    console.log('this.dataset.skip = ', this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip); // 'this.dataset.skip' is a string so 'parseFloat converts to a number.
}



function handleRangeUpdate() { // slider adjustments for volume & playback rate speed
    console.log(this.name);
    console.log(this.value);
    video[this.name] = this.value;
}


// Progress bar (the big one!)
// should be updating in real time as video plays, and
// clicking on bar & dragging should update video playback location
// Done by inspecting progress bar within styless.css for '.progress__filled {flex-basis:50%;}'. Flex-basis is adjusted to a percentage relative the the video length
// Need to calculate 1) how long is the video and 2) how far along the video is currently playing
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100; // currentTime duration are properties on the video // this can be seen by going to the video source --> Inspect --> Elements --> Properties --> Video (dropdown) // * 100 is for whole number percentages
    progressBar.style.flexBasis = `${percent}%`; // 'progressBar' from top variable
}

// Scrub (the big one!)
// whereever clicked on bar, scrub the video to that relative point
function scrub(e) {
    console.log('e = ', e); // logs 'MouseEvent' which has property 'offsetX' showing exactly how many pixels mouse-clicked into the progressBar/timeline
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; // divided by width of entire progress bar // multply by video duration
    video.currentTime = scrubTime; // simply update the video
}


// Hook up event listeners
// once have togglePlay function, need to hook it up to the video and the button
video.addEventListener('click', togglePlay); // plays/pauses video when video window clicked
toggle.addEventListener('click', togglePlay); // plays/pauses video when play button clicked


// video.play() or video.pause() to play/pause video from console
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// listen for video to emit an event called 'timeupdate' & when that happens code will call function handleProgress()
video.addEventListener('timeupdate', handleProgress); // event called 'progress' and both will trigger when video is updating it's time code so if paused will not unnecessirily run the function

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//Progress Bar Scrubbing
progress.addEventListener('click', scrub); // when click on progress bar, run scrub function
progress.addEventListener('mousemove', scrub); //