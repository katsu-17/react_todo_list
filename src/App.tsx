import { useState, type ChangeEvent } from 'react'
import './App.css'
import styled from 'styled-components'
import { Button } from './components/Button'

type Todo = {
  title: string,
  isCompleted: boolean,
}

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState<Array<Todo>>([])

  const completedTodosCount: number = todos.filter((todo) => todo.isCompleted).length
  const uncompletedTodosCount: number = todos.length - completedTodosCount

  const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }

  const onClickSave = () => {
    const hasSameTodo = todos.find((todo) => todo.title === newTodo)
    if (hasSameTodo) {
      alert('すでに登録済みです')
      return
    }

    setTodos([...todos, { title: newTodo, isCompleted: false }])
    setNewTodo('')
  }

  const onClickCheck = (title: string) => {
    const nextTodos = todos.map((todo) => {
      if (todo.title === title) {
        todo.isCompleted = !todo.isCompleted
        return todo
      } else {
        return todo
      }
    })

    setTodos(nextTodos)
  }

  const onClickDelete = (title: string) => {
    if (confirm("本当に削除してもよろしいですか？")) {
      const nextTodos = todos.filter((todo) => todo.title !== title)
      setTodos(nextTodos)
    }
  }

  return (
    <>
      <h1>Todo List</h1>
      <StyledInput type="text" placeholder="やること" value={newTodo} onChange={onChangeTodo} />
      <Button color='#11999e' onClick={onClickSave}>保存</Button>
      <StyledSummaryContainer>
        <StyledSummaryItem>全てのタスク：{todos.length}</StyledSummaryItem>
        <StyledSummaryItem>完了済み：{completedTodosCount}</StyledSummaryItem>
        <StyledSummaryItem>未完了：{uncompletedTodosCount}</StyledSummaryItem>
      </StyledSummaryContainer>
      {todos.map((todo) => (
        <StyledTodosContainer key={todo.title}>
          <input type="checkbox" checked={todo.isCompleted} onClick={() => onClickCheck(todo.title)} />
          <p>{todo.title}</p>
          <Button color="#6c757d">編集</Button>
          <Button color="#dc3545" onClick={() => onClickDelete(todo.title)}>削除</Button>
        </StyledTodosContainer>
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

const StyledTodosContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledSummaryContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledSummaryItem = styled.p`
  margin-right: 16px;
`

export default App
