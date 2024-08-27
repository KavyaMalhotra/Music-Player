console.log("Welcome to Misc");
//Initialize the variables
let audioElement = new Audio('./assets/0.mp3');
let index = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songTitle = document.getElementById('songTitle');
let songItem = Array.from(document.getElementsByClassName('songItem'));
// audioElement.play();
let songs = [
    {songName: "Diamond", filePath: "./assets/0.mp3", coverPath: "./assets/images.jpeg"},
    {songName: "Diamond", filePath: "./assets/1.mp3", coverPath: "./assets/images.jpeg"},
    {songName: "Diamond", filePath: "./assets/2.mp3", coverPath: "./assets/images.jpeg"},
    {songName: "Diamond", filePath: "./assets/3.mp3", coverPath: "./assets/images.jpeg"},
    {songName: "Diamond", filePath: "./assets/4.mp3", coverPath: "./assets/images.jpeg"}
]


songItem.forEach((element, i)=>{
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//Handle play/pause clicks
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause'); 
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})
//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    // console.log("progress = " + progress);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = ((myProgressBar.value*audioElement.duration)/100);
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
    //    console.log(e.target);
       makeAllPlays();
       index = parseInt(e.target.id);
       e.target.classList.remove('fa-circle-play');
       e.target.classList.add('fa-circle-pause');
       songTitle.innerText = songs[index].songName;
       masterPlay.classList.remove('fa-circle-play');
       masterPlay.classList.add('fa-circle-pause');
       audioElement.src = `./assets/${index}.mp3`;
       audioElement.currentTime = 0;
       audioElement.play();
       gif.style.opacity=1;
    })
})

document.getElementById('Previous').addEventListener('click', ()=>{
    if(index <= 0){
        index = songs.length-1;
    }
    else{
        index = index -1;
    }
    makeAllPlays();
    songTitle.innerText = songs[index].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    audioElement.src = `./assets/${index}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    // console.log(index);
})
document.getElementById('Next').addEventListener('click', ()=>{
    if(index <= songs.length){
        index = 0;
    }
    else{
        index = index +1;
    }
    makeAllPlays();
    songTitle.innerText = songs[index].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    audioElement.src = `./assets/${index}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
})