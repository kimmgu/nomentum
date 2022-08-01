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
    <form id="todo-form">
      <input style="width: 100%;" type="text" placeholder="What is your main focus for today?" required>
    </form>
    <ul id="todo-list">
    </ul>
    <div id="quote">
      <span></span>
      <br />
      <span></span>
    </div>
    <div id="weather">
      <span></span>
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

// Background

const background = ['0.jpeg', '1.jpeg', '2.jpeg']
const randomBackground =
  background[Math.floor(Math.random() * background.length)]

const bg = document.createElement('img')
bg.src = `/background/${randomBackground}`
document.body.append(bg)

// To Do

const toDoForm = document.getElementById('todo-form')
const toDoInput = toDoForm.querySelector('input')
const toDoList = document.getElementById('todo-list')

const TASKS_KEY = 'tasks'

let tasks = []

function saveTasks() {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

function deleteTask(event) {
  const li = event.target.parentElement
  li.remove()
  // console.log(typeof li.id) // string
  tasks = tasks.filter((task) => task.id !== parseInt(li.id))
  saveTasks()
}

function showTask(task) {
  const li = document.createElement('li')
  li.id = task.id
  const span = document.createElement('span')
  span.innerText = task.text
  const btn = document.createElement('button')
  btn.innerText = 'X'
  btn.addEventListener('click', deleteTask)
  li.appendChild(span)
  li.appendChild(btn)
  toDoList.appendChild(li)
}

function toDoSubmit(event) {
  event.preventDefault()
  // Copy the current value of the input to the task variable
  const task = toDoInput.value
  toDoInput.value = ''
  const taskObj = {
    text: task,
    id: Date.now(),
  }
  tasks.push(taskObj)
  showTask(taskObj)
  saveTasks()
}

toDoForm.addEventListener('submit', toDoSubmit)

const savedTasks = localStorage.getItem(TASKS_KEY)

if (savedTasks !== null) {
  const parsedTasks = JSON.parse(savedTasks)
  tasks = parsedTasks
  parsedTasks.forEach(showTask)
}

// Weather

const API_KEY = '649976bc6667f1412fbd055ffbb0a4d1'

function successLocation(position) {
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  // console.log('latitude : ' + lat + ' longitude : ' + lon)
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector('#weather span:first-child')
      const city = document.querySelector('#weather span:last-child')
      city.innerText = data.name
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`
    })
}
function errorLocation() {
  alert('Continue allowing this site to access your location')
}

navigator.geolocation.getCurrentPosition(successLocation, errorLocation)
