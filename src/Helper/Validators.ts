import { Participant } from '../Types/Types'

export const validateEmail = (email: string) => String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )

export const isEmpty = (str: string | undefined | null) => str === undefined || str === null || str.trim() === ''

export const validateFields = (participant: Participant) => {
  const errors = new Map()
  if (isEmpty(participant.name)) {
    errors.set('name', 'Name cannot be empty.')
  }
  if (!validateEmail(participant.email ?? '')) {
    errors.set('email', 'Invalid e-mail address.')
  }
  if (isEmpty(participant.phone)) {
    errors.set('phone', 'Phone cannot be empty.')
  }
  return errors
}
