/*import './styles.css'

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

let state = 0

function render() {
    counter.textContent = state.toString()
}

addBtn.addEventListener('click', () => {
    state++
    render()
})

subBtn.addEventListener('click', () => {
    state--
    render()
})

asyncBtn.addEventListener('click', () => {
    setTimeout(() => {
        state++
        render()
    }, 2000)
})

theme.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})

render()*/


import { applyMiddleware, createStore } from 'redux'
import {rootReducer} from './redux/rootReducer'
import './styles.css'
import {changeTheme, asyncIncrement, decrement, increment} from './redux/actions'
import thunk from 'redux-thunk'
import logger from 'redux-logger'


const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

/*function logger(state) {
    return function(next) {
        return function(action) {
            console.log('Prev State', state.getState())
            console.log('Action', action)
            const newState = next(action)
            console.log('New State', newState)
            return newState
        }
    }
}*/

/*const store = createStore(rootReducer, {
    counter: 0
})*/

const store = createStore(
    rootReducer, 
    //0,
    applyMiddleware(thunk, logger)
)

//window.store = store

addBtn.addEventListener('click', () => {
    store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
    store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
   store.dispatch(asyncIncrement())
})

//store.subscribe(() => console.log(store.getState()))

store.subscribe(() => {
    const state = store.getState()
   // console.log(state)

    counter.textContent = state.counter
    document.body.className = state.theme.value
})

store.dispatch({type: 'INIT_APPLICATION'})

theme.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light')
        ? 'dark'
        : 'light'
    store.dispatch(changeTheme(newTheme))
  //document.body.classList.toggle('dark')
})



