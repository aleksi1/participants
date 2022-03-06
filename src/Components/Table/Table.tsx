import React, { useState } from 'react'
import { Column, Participant, SortOrder } from '../../Types/Types'
import Delete from './delete.png'
import Edit from './edit.png'
import Up from './up.png'
import Down from './down.png'
import { validateFields } from '../../Helper/Validators'
import Input from '../Input'

export const getParticipant = (id: string | null | undefined,
  data: Participant[]) => {
  const arr = data.filter((p) => p.id === id)
  if (arr && arr.length > 0) return arr[0]
  return null
}

interface Props {
  columns: Column[]
  data: Participant[]
  deleteParticipant: (id: string) => void
  updateParticipant: (participant: Participant) => void
  sortOrder: SortOrder
  changeSortOrder: (sortOrder: SortOrder) => void
}
const Table = (props: Props) => {
  const {
    data, columns, deleteParticipant, updateParticipant, sortOrder, changeSortOrder,
  } = props
  const [inlineEdit, setInlineEdit] = useState<string | null>(null)
  const [inlineEditValues, setInlineEditValues] = useState<Participant | null>({})
  const [errors, setErrors] = useState(new Map())

  const onEdit = (id: string) => {
    const p = getParticipant(id, data)
    if (p) setInlineEditValues(p)
    setInlineEdit(id)
  }
  const onCancelEdit = () => {
    setInlineEdit(null)
    setErrors(new Map())
  }
  const onSaveEdit = () => {
    if (inlineEditValues) {
      const newErrors = validateFields(inlineEditValues)
      if (newErrors.size === 0) {
        updateParticipant(inlineEditValues)
        setErrors(new Map())
        setInlineEditValues(null)
        setInlineEdit(null)
      } else {
        setErrors(newErrors)
        setInlineEditValues(inlineEditValues)
      }
    } else {
      setInlineEditValues(null)
      setInlineEdit(null)
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const newValues = { ...inlineEditValues ?? {}, [key]: event.target.value }
    setInlineEditValues(newValues)
  }
  const getActions = (id: string) => {
    if (inlineEdit === id) {
      return (
        <>
          <button
            type="button"
            className="button cancel"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
          <button
            type="button"
            className="button"
            onClick={() => onSaveEdit()}
          >
            Save
          </button>
        </>
      )
    }
    return (
      <>
        <td className="actions">
          <button
            type="button"
            className="icon"
            onClick={() => onEdit(id)}
          >
            <img
              className="icon"
              alt="Edit"
              src={Edit}
              style={{ marginRight: '40px' }}
            />
          </button>
          <button
            type="button"
            className="icon"
            onClick={() => deleteParticipant(id)}
          >
            <img
              className="icon"
              alt="delete"
              src={Delete}
            />
          </button>
        </td>
      </>
    )
  }
  return (
    <>
      <table>
        <thead>
          <tr key="head-row">
            {columns && columns.map((column) => (
              <th
                key={`head-${column.key}`}
                onClick={() => changeSortOrder({
                  key: column.key,
                  orderBy: sortOrder.orderBy === 'asc' ? 'desc' : 'asc',
                })}
              >
                <div style={{ display: 'inline-block' }}>{column.label}</div>
                {sortOrder.key === column.key && (
                <>
                  <button
                    type="button"
                    className="transparent"

                  >
                    <img
                      className="small-icon"
                      alt={sortOrder.orderBy === 'asc' ? 'Up' : 'Down'}
                      src={sortOrder.orderBy === 'asc' ? Up : Down}
                    />
                  </button>
                </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.map((row: Participant) => (
            <tr key={`row-${row.id}`}>
              {inlineEdit === row.id && (
              <td className="inline-edit" colSpan={4}>
                <Input errorPosition="top" errors={errors} value={inlineEditValues && inlineEditValues.name ? inlineEditValues.name : ''} name="name" onChange={(e) => handleChange(e, 'name')} placeholder="Full name" />
                <Input errorPosition="top" errors={errors} value={inlineEditValues && inlineEditValues.email ? inlineEditValues.email : ''} name="email" onChange={(e) => handleChange(e, 'email')} placeholder="E-mail address" />
                <Input errorPosition="top" errors={errors} value={inlineEditValues && inlineEditValues.phone ? inlineEditValues.phone : ''} name="phone" onChange={(e) => handleChange(e, 'phone')} placeholder="Phone number" />
                {getActions(row.id)}
              </td>
              )}
              { inlineEdit !== row.id && (
              <>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                {getActions(row.id ?? '')}
              </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table
