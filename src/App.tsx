import { useCallback, useState, type ChangeEvent } from 'react'
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

  const todosCount = todos.length
  const completedTodosCount: number = todos.filter((todo) => todo.isCompleted).length
  const uncompletedTodosCount: number = todosCount - completedTodosCount

  const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }

  const onClickSave = () => {
    if (newTodo === "") return

    const hasSameTodo = todos.find((todo) => todo.title === newTodo)
    if (hasSameTodo) {
      alert('すでに登録済みです')
      return
    }

    setTodos([...todos, { id: nextId, title: newTodo, isCompleted: false }])
    setNewTodo('')
    setNextId(nextId + 1)
  }

  const onChangeCheck = useCallback((id: number) => {
    const nextTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted
        return todo
      } else {
        return todo
      }
    })

    setTodos(nextTodos)
  }, [todos])

  const onClickUpdate = useCallback((id: number, newTitle: string) => {
    const nextTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.title = newTitle
        return todo
      } else {
        return todo
      }
    })

    setTodos(nextTodos)
  }, [todos])

  const onClickDelete = useCallback((id: number) => {
    if (confirm("本当に削除してもよろしいですか？")) {
      const nextTodos = todos.filter((todo) => todo.id !== id)
      setTodos(nextTodos)
    }
  }, [todos])

  return (
    <>
      <h1>Todo List</h1>
      <InputText value={newTodo} onChange={onChangeTodo} placeholder="やること" />
      <Button color='#11999e' onClick={onClickSave}>保存</Button>
      <StyledSummaryContainer>
        <StyledSummaryItem>全てのタスク：{todosCount}</StyledSummaryItem>
        <StyledSummaryItem>完了済み：{completedTodosCount}</StyledSummaryItem>
        <StyledSummaryItem>未完了：{uncompletedTodosCount}</StyledSummaryItem>
      </StyledSummaryContainer>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onChangeCheck={onChangeCheck} onClickUpdate={onClickUpdate} onClickDelete={onClickDelete} />
      ))}
    </>
  )
}

const StyledSummaryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledSummaryItem = styled.p`
  margin-right: 16px;
`

export default App
