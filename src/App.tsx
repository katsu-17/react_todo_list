import { useState, type ChangeEvent } from 'react'
import styled from 'styled-components'

import './App.css'
import { Button } from './components/Button'
import { TodoItem } from './features/todo/components/TodoItem'
import type { Todo } from './features/todo/types'
import { InputText } from './components/InputText'

function App() {
  const [newTodo, setNewTodo] = useState('')
  const [todos, setTodos] = useState<Array<Todo>>([])
  const [nextId, setNextId]= useState(1)

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

    setTodos([...todos, { id: nextId, title: newTodo, isCompleted: false }])
    setNewTodo('')
    setNextId(nextId + 1)
  }

  const onClickCheck = (id: number) => {
    const nextTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted
        return todo
      } else {
        return todo
      }
    })

    setTodos(nextTodos)
  }

  const onClickUpdate = (id: number, newTitle: string) => {
    const nextTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.title = newTitle
        return todo
      } else {
        return todo
      }
    })

    setTodos(nextTodos)
  }

  const onClickDelete = (id: number) => {
    if (confirm("本当に削除してもよろしいですか？")) {
      const nextTodos = todos.filter((todo) => todo.id !== id)
      setTodos(nextTodos)
    }
  }

  return (
    <>
      <h1>Todo List</h1>
      <InputText value={newTodo} onChange={onChangeTodo} placeholder="やること" />
      <Button color='#11999e' onClick={onClickSave}>保存</Button>
      <StyledSummaryContainer>
        <StyledSummaryItem>全てのタスク：{todos.length}</StyledSummaryItem>
        <StyledSummaryItem>完了済み：{completedTodosCount}</StyledSummaryItem>
        <StyledSummaryItem>未完了：{uncompletedTodosCount}</StyledSummaryItem>
      </StyledSummaryContainer>
      {todos.map((todo) => (
        <TodoItem key={todo.title} todo={todo} onChangeCheck={onClickCheck} onClickUpdate={onClickUpdate} onClickDelete={onClickDelete} />
      ))}
    </>
  )
}

const StyledSummaryContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledSummaryItem = styled.p`
  margin-right: 16px;
`

export default App
