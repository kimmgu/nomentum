import './style.css'
import { quotes } from './quotes'

document.querySelector('#app').innerHTML = /* html */ `
    <form id="login-form" class="hidden">
      <input
        required
        maxlength="16"
        type="text"
        placeholder="Hello, What's your name?"
      />
      <button>Log In</button>
    </form>
    <h1 id="clock">00:00:00</h1>
    <h2 id="greeting" class="hidden"></h2>
    <div id="quote">
      <span></span>
      <br />
      <span></span>
    </div>
`

// Greeting
const loginForm = document.querySelector('#login-form')
const loginInput = document.querySelector('#login-form input')
const greeting = document.querySelector('#greeting')
// string
const USERNAME_KEY = 'username'
const HIDDEN_CLASSNAME = 'hidden'

function logInClick(event) {
  event.preventDefault()
  loginForm.classList.add(HIDDEN_CLASSNAME)
  const username = loginInput.value
  localStorage.setItem(USERNAME_KEY, username)
  showGreeting(username)
}

function showGreeting(username) {
  greeting.innerText = `Good evening, ${username}`
  greeting.classList.remove(HIDDEN_CLASSNAME)
}

const savedUsername = localStorage.getItem(USERNAME_KEY)

if (savedUsername === null) {
  // Show Login Form
  loginForm.classList.remove(HIDDEN_CLASSNAME)
  loginForm.addEventListener('submit', logInClick)
} else {
  // Show Greeting
  showGreeting(savedUsername)
}

// Clock
const clock = document.querySelector('#clock')

function getClock() {
  const date = new Date()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  clock.innerText = `${hours}:${minutes}:${seconds}`
}

getClock()
setInterval(getClock, 1000)

// Quotes
const quote = document.querySelector('#quote span:first-child')
const author = document.querySelector('#quote span:last-child')
const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

quote.innerText = randomQuote.quote
author.innerText = randomQuote.author
