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
import {asyncIncrement, decrement, increment} from './redux/actions'
import thunk from 'redux-thunk'


const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

/*const store = createStore(rootReducer, {
    counter: 0
})*/

const store = createStore(
    rootReducer, 
    0,
    applyMiddleWare(thunk)
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

    counter.textContent = state
})

store.dispatch({type: 'INIT_APPLICATION'})

theme.addEventListener('click', () => {
  //document.body.classList.toggle('dark')
})



