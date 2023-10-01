console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songList = document.querySelector(".songList")
let songsCount = false;

console.log(songList)

let songs = [
  { songName: "Ravanasura Anthem", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Veyyinokka jilla", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Whats happening", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Dikka Dishum", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Du Du Du", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Jinthaka", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Mass Raja", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Pulsar Bike(Male Version)", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Pyar lona pagal", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "Raja the great", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Search songs
// Search songs
document.getElementById('searchInput').addEventListener('input', (e) => {
  songsCount = false;
  const searchTerm = e.target.value.toLowerCase();
  console.log(searchTerm)
  songs.forEach((ele)=>{
    if(ele.songName.toLowerCase().includes(searchTerm)){
      songsCount = true
      return
    };
  })
  console.log(songsCount)
  if(!songsCount) {
    document.querySelector("#noSong").style.display = "flex"
    document.querySelector("#noSong").innerHTML = `No song is found with &nbsp;<span style="color:#090804">${searchTerm}</span>`
  }else{
    document.querySelector("#noSong").style.display = "none"
  }
  console.log(songsCount)
  songItems.forEach((item) => {
    const songName = item.getElementsByClassName('songName')[0].innerText.toLowerCase();
    if (songName.includes(searchTerm)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
});

document.getElementById('searchInput').addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.stopPropagation();
  }
});


// Handle play/pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
  // Update Seekbar
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => {
  audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
};

songItems.forEach((element, index) => {
  element.addEventListener('click', () => {
    makeAllPlays();
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    element.getElementsByClassName('songItemPlay')[0].classList.remove('fa-play-circle');
    element.getElementsByClassName('songItemPlay')[0].classList.add('fa-pause-circle');
  });
});

document.getElementById('next').addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  gif.style.opacity = 1;
  makeAllPlays();
  songItems[songIndex].getElementsByClassName('songItemPlay')[0].classList.remove('fa-play-circle');
  songItems[songIndex].getElementsByClassName('songItemPlay')[0].classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  gif.style.opacity = 1;
  makeAllPlays();
  songItems[songIndex].getElementsByClassName('songItemPlay')[0].classList.remove('fa-play-circle');
  songItems[songIndex].getElementsByClassName('songItemPlay')[0].classList.add('fa-pause-circle');
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    masterPlay.click();
  } else if (e.code === 'ArrowRight') {
    e.preventDefault();
    document.getElementById('next').click();
  } else if (e.code === 'ArrowLeft') {
    e.preventDefault();
    document.getElementById('previous').click();
  }
});

audioElement.addEventListener('ended', () => {
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  gif.style.opacity = 1;
  makeAllPlays();
  songItems[songIndex].getElementsByClassName('songItemPlay')[0].classList.remove('fa-play-circle');
  songItems[songIndex].getElementsByClassName('songItemPlay')[0].classList.add('fa-pause-circle');
});
audioElement.addEventListener('timeupdate', () => {
  const currentTime = formatTime(audioElement.currentTime);
  const duration = formatTime(audioElement.duration);
  document.getElementById('currentTime').innerText = currentTime;
  document.getElementById('duration').innerText = duration;

  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => {
  audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(number) {
  return String(number).padStart(2, '0');
}