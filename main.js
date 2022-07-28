import './style.css'

document.querySelector('#app').innerHTML = `
    <form id="login-form" class="hidden">
      <input
        required
        maxlength="16"
        type="text"
        placeholder="Hello, What's your name?"
      />
      <button>Log In</button>
    </form>

    <h1 id="greeting" class="hidden"></h1>
`

// const loginForm = document.querySelector('#login-form')
// const loginInput = loginForm.querySelector('input')
// const loginButton = loginForm.querySelector('button')

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
