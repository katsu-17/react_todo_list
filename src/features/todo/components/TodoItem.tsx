import { memo, useState, type ChangeEvent, type FC } from "react"
import styled from "styled-components"

import { Button } from "../../../components/Button"
import type { Todo } from "../types"
import { InputText } from "../../../components/InputText"

type Props = {
  todo: Todo,
  onChangeCheck: (id: number) => void,
  onClickUpdate: (id: number, newTitle: string) => void,
  onClickDelete: (id: number) => void,
}

export const TodoItem: FC<Props> = memo((props) => {
  const { todo, onChangeCheck, onClickUpdate, onClickDelete } = props

  const [isEditing, setIsEditing] = useState(false)
  const [editingTitle, setEditingTitle] = useState(todo.title)

  const onClickEdit = () => {
    setIsEditing(true)
  }

  const onChangeEditingTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(e.target.value)
  }

  const onClickSave = (id: number) => {
    if (editingTitle === "") return

    setIsEditing(false)
    onClickUpdate(id, editingTitle)
  }

  return (
    <>
      {isEditing ? (
        <StyledTodoContainer>
          <InputText value={editingTitle} onChange={onChangeEditingTitle} />
          <Button color="#11999e" onClick={() => onClickSave(todo.id)}>保存</Button>
        </StyledTodoContainer>
      ) : (
        <StyledTodoContainer>
          <input type="checkbox" checked={todo.isCompleted} onChange={() => onChangeCheck(todo.id)} />
          {todo.isCompleted ? <p><s>{todo.title}</s></p> : <p>{todo.title}</p> }
          <Button color="#6c757d" onClick={onClickEdit}>編集</Button>
          <Button color="#dc3545" onClick={() => onClickDelete(todo.id)}>削除</Button>
        </StyledTodoContainer>
      )}
    </>
  )
})

const StyledTodoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
