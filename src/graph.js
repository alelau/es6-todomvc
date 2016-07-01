import {subscribe, getTodo} from './todo'
import React from 'react'

let graphArea
let loaded = false

export {loadGraph, toggleGraph}

function toggleGraph() {
  if (graphArea) {
    graphArea.remove()
    graphArea = null
  } else {
    graphArea = document.createElement('div')
    document.body.appendChild(graphArea)
    updateGraph(graphArea, getTodo().storage)
  }
}

function loadGraph() {
  if (loaded) {
    return
  }
  loaded = true
  subscribe(function onTodoUpdate() {
    if (graphArea) {
      const todo = getTodo()
      updateGraph(graphArea, todo.storage)
    }
  })
}

function updateGraph(node, store) {
  store.findAll(todos => {
    React.render(
      node,
      <Graph todos={todos} />
    )
  })
}

function Graph({todos}) {
  return (
    <div>There are {todos.length} todos</div>
  )
}
Graph.propTypes = {
  todos: React.PropTypes.array,
}
