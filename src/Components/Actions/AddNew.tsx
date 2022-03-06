import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { validateFields } from '../../Helper/Validators'
import { Participant } from '../../Types/Types'
import Input from '../Input'

interface Props {
  addParticipant: (participant: Participant) => void
}
const AddNew = (props: Props) => {
  const { addParticipant } = props
  const [participant, setParticipant] = useState<Participant | null | undefined>({})
  const [errors, setErrors] = useState(new Map())

  const onClick = () => {
    if (participant) {
      participant.id = uuidv4()
      const newErrors = validateFields(participant)
      if (newErrors.size === 0) {
        addParticipant(participant)
        setParticipant({ name: '', email: '', phone: '' })
        setErrors(new Map())
      } else {
        setErrors(newErrors)
      }
    }
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = { ...participant ?? {}, [event.target.name]: event.target.value }
    setParticipant(newValues)
  }
  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px',
      }}
    >
      <Input errorPosition="bottom" errors={errors} value={participant && participant.name ? participant.name : ''} name="name" onChange={(e) => onChange(e)} placeholder="Full name" />
      <Input errorPosition="bottom" errors={errors} value={participant && participant.email ? participant.email : ''} name="email" onChange={(e) => onChange(e)} placeholder="E-mail address" />
      <Input errorPosition="bottom" errors={errors} value={participant && participant.phone ? participant.phone : ''} name="phone" onChange={(e) => onChange(e)} placeholder="Phone number" />
      <button type="button" onClick={onClick}>
        Add new
      </button>
    </div>
  )
}

export default AddNew
