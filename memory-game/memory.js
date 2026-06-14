var imgs = [
    "images-copy/anya-one.JPG",
    "memory-img/daisy_ground.jpg",
    "memory-img/daisy.jpg",
    "memory-img/string_hearts.jpg",
    "memory-img/green.jpg",
    "memory-img/red.jpg",
    "memory-img/stone.jpg",
    "memory-img/candle.jpg"
];

var cardFirst = null
var cardSecond = null
var cardFlip = true
var matches = 0
var moves = 0
var secs = 0
var timerRun = false
var timeInterval;

function matchGameStart() {
        var memoryBoard = document.getElementById("memoryBoard")
        memoryBoard.innerHTML = ""

        var duplicateCardImgs = imgs.concat(imgs);

        duplicateCardImgs.sort(function() {
                return Math.random() - 0.5
        })

        for (var i = 0; i < duplicateCardImgs.length; i++) {
        var card = document.createElement("div");
        card.className = "game-card" ;
        card.innerHTML = `
        <div class="card-front">💘</div>
        <div class="card-back"><img src="${duplicateCardImgs[i]}" alt=""></div>
        `
      card.onclick = flipcard;
      card.dataset.image = duplicateCardImgs[i];
      memoryBoard.appendChild(card);
  }

        cardFirst = null
        cardSecond = null
        cardFlip = true
        matches = 0
        moves = 0
        secs = 0
        timerRun = false

        statsUpdate()
        clearInterval(timeInterval)
}

function flipcard() {
        if (!cardFlip) return

        if(this.classList.contains("flipped")) return
        if(this.classList.contains("matched")) return

        if(!timerRun) {
          Timestart()      
        }

        this.classList.add("flipped")

        if(cardFirst == null) {
           cardFirst = this     
        } else {
            cardSecond = this;
            cardFlip = false;
            moves++   
            statsUpdate() 
            Matchcheck()
        }
}

function Matchcheck() {
        var match =cardFirst.dataset.image == cardSecond.dataset.image;

        if(match) {
             setTimeout(() => {
                cardFirst.classList.add("matched")
                cardSecond.classList.add("matched")
                matches++
                statsUpdate()
                resetCards()

                if((matches === 8)) {
                   gameEnds();
                }
             }, 500);
        } else {
              setTimeout(() => {
                cardFirst.classList.remove("flipped")
                cardSecond.classList.remove("flipped")
                resetCards()
              }, 1000);
        }
}

function resetCards() {
   cardFirst = null
   cardSecond = null  
   cardFlip = true  
}

function Timestart() {
        timerRun = true
        timeInterval = setInterval(() => {
        secs++
        statsUpdate()
        }, 1000)
}

function statsUpdate() {
        document.getElementById('moves').textContent = moves
        document.getElementById('matches').textContent = matches + "/8"

        var minutes = Math.floor(secs / 60)
        var seconds = secs % 60
        if(seconds < 10) seconds = "0" + seconds
        document.getElementById('time').textContent = minutes + ":" + seconds
}
function gameEnds() {
       clearInterval(timeInterval) 
       document.getElementById('finalMoves').textContent = moves
       document.getElementById('finalTime').textContent = document.getElementById('time').textContent;
      document.getElementById('winLogic').classList.add("show");
}

function newGame() {
        document.getElementById('winLogic').classList.remove("show")
        clearInterval(timeInterval)
        matchGameStart();
}

matchGameStart()










 