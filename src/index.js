const React = require('react'),
    ReactDOM = require('react-dom'),
    Container = require('./Container'),
    createStore = require('redux').createStore;

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([ action.text ])
    default:
      return state
  }
}

let store = createStore(todos, window.devToolsExtension ? window.devToolsExtension() : f => f)

store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})

console.log(store.getState());

require('../scss/main.css');

var rootEl = document.getElementById('root');

ReactDOM.render(<Container />, rootEl);

