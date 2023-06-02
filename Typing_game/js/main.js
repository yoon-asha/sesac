const wordInput = document.querySelector('#word-input')
const currentWord = document.querySelector('#current-word')
const scoreDisplay = document.querySelector('#score')
const timeDisplay = document.querySelector('#time')
const messageDisplay = document.querySelector('#message')

const GAME_TIME = 5 // 변하지 않는 상수를 선언할 때 대문자로

let words = ['banana', 'key', 'undefined', 'car', 'javascript']
let score = 0
let time = GAME_TIME
let timeInterval
let isPlaying = false
let isRaeady = false

const API_URL = 'https://random-word-api.herokuapp.com/word?number=70'
init()

// function init() {
//   const res = fetch(API_URL)
//     .then((res) => res.json())
//     .then((data) => (words = data))
// }

// 위 them과 async await은 동일한 결과. 하지만 async await이 장점이 더 많음
async function init() {
  const res = await fetch(API_URL)
  const data = await res.json()

  words = data.filter((item) => item.length < 7)
  console.log(words)
  isRaeady = true
}

wordInput.addEventListener('input', (e) => {
  const typedText = e.target.value
  const currentText = currentWord.innerText

  if (typedText.toLowerCase() === currentText.toLowerCase() && isRaeady) {
    timeDisplay.innerText = GAME_TIME
    addScore()
    setNewWord()
  }
})

function gameover() {
  alert('GAME OVER!!')
  isPlaying = false
  clearInterval(timeInterval)
  timeInterval = null
  score = 0
  scoreDisplay.innerText = score
  messageDisplay.innerText = 'GAME OVER'
  currentWord.innerText = 'Start'
}

function countDown() {
  time -= 1
  timeDisplay.innerText = time
  if (time === 0) gameover()
}

function setNewWord() {
  time = GAME_TIME
  wordInput.value = ''
  messageDisplay.innerText = 'Now Playing!'

  const randomIndex = Math.floor(Math.random() * words.length)
  currentWord.innerText = words[randomIndex]

  if (!isPlaying) {
    timeInterval = setInterval(countDown, 1000)
    isPlaying = true
  }
}

const addScore = () => {
  score += 1
  scoreDisplay.innerText = score
}
