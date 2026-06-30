const musicImg = document.getElementById("music-img")
const musicName = document.getElementById("music-name")
const musicArtist = document.getElementById("music-artist")

const sliderSong = document.getElementById("slider-song")

const playpauseButton = document.getElementById("circle-play")
const lastSong = document.getElementById("backward")
const nextSong = document.getElementById("forward")
const shuffle = document.getElementById("shuffle")
const repeatBtn = document.getElementById("repeat")
 
const music = [
  {
    image: "img/piano.jpg",
    name: "A Midsummer Night's Dream, Op. 61 - Nocturne",
    artist: "Mendelssohn",
    audio: "music/A Midsummer Night's Dream, Op. 61 - Nocturne.mp3"
  },
 
  {
    image: "img/midnight.jpg",
    name: "Nocturne in B flat minor, Op. 9 no. 1",
    artist: "Frédéric Chopin",
    audio: "music/Nocturne in B flat minor, Op. 9 no. 1.mp3"
  },

  {
    image: "img/rose.jpg",
    name: "Balcony Love - Flirty Romantic Music",
    artist: "DKFILMS",
    audio: "music/dkfilms-balcony-love-flirty-romantic-music-268732.mp3"
  }
];

const audio = document.createElement("audio");
let currentSongIndex = 0;
songUpdate();

lastSong.addEventListener("click", function() {
  if(currentSongIndex == 0) {
    return;
  }
  currentSongIndex--;
  songUpdate()
})

nextSong.addEventListener("click", function () {
  if(currentSongIndex == music.length - 1) {
    return
  }
  currentSongIndex++;
  songUpdate()
});

playpauseButton.addEventListener("click", function(){
  if(!audio.paused) {
    audio.pause()
    playpauseButton.classList.remove('fa-circle-play')
    playpauseButton.classList.add('fa-circle-pause')
  } else {
    audio.play();
    playpauseButton.classList.remove('fa-circle-pause')
    playpauseButton.classList.add('fa-circle-play')
  }
})

function songUpdate() {
  const song = music[currentSongIndex];
  musicImg.src = song.image;
  musicName.innerText = song.name;
  musicArtist.innerText = song.artist

  audio.src = song.audio
  audio.onloadedmetadata = function() {
    sliderSong.value = 0;
    sliderSong.max = audio.duration;
  }
}

sliderSong.addEventListener("change", function() {
  audio.currentTime = sliderSong.value;
})

function sliderMover() {
  sliderSong.value = audio.currentTime;
}

setInterval(sliderMover, 1000); 

let clickShuffle = false;

shuffle.addEventListener("click", function() {
  clickShuffle = !clickShuffle;

  if(clickShuffle) {
    currentSongIndex = Math.floor(Math.random() * music.length)
  } else {
    if(currentSongIndex >= music.length) {
      currentSongIndex = 0;
    } else {
      currentSongIndex++
    }
  }
  songUpdate();
})

let Onrepeat = false;

repeatBtn.addEventListener("click", function() {
  Onrepeat = !Onrepeat
  songUpdate()
})

audio.addEventListener("ended", function() {
  if(Onrepeat) {
    audio.currentTime = 0;

    setTimeout(function() {
      audio.play();
    });
  }
});