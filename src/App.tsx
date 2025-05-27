import { useState, type ChangeEvent } from 'react'
import './App.css'
import styled from 'styled-components'

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState<Array<string>>([])

  const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }

  const onClickSave = () => {
    setTodos([...todos, newTodo])
    setNewTodo('')
  }

  return (
    <>
      <h1>Todo List</h1>
      <StyledInput type="text" placeholder="やること" value={newTodo} onChange={onChangeTodo} />
      <StyledButton type='button' onClick={onClickSave}>保存</StyledButton>
      {todos.map((todo) => (
        <p>{todo}</p>
      ))}
    </>
  )
}

const StyledInput = styled.input`
  padding: 8px 16px;
  border-radius: 8px;
  outline: none;
  border: solid #ddd 1px;
`

const StyledButton = styled.button`
  background-color: teal;
  color: #fff;
  margin: 0 8px;
`
export default App
