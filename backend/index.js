const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())

let todos = [];

app.get('/', (req, res) => {
  res.send(todos);
})

app.post('/', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random()*10000),
    title: req.body.title,
    description: req.body.description
  }
  todos.push(newTodo)
  res.json(newTodo)
})

function findIndex(arr, id){
  for(var i=0; i<arr.length; i++){
    if(arr[i].id === id){
      return i;
    }
  }
  return -1;
}

function removeTodo(arr, index){
  let newArr = [];
  for(var i=0; i<arr.length; i++){
    if(i !== index){
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

app.delete('/:id', (req, res) => {
  const index = findIndex(todos, parseInt(req.params.id))
  if(index === -1){
    return res.status(404).send("No todo available you're trying to delete")
  } else{
    todos = removeTodo(todos, index)
    res.send("Todo deleted successfully")
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})