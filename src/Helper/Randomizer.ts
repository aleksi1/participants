import faker from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import { Participant } from '../Types/Types'

faker.locale = 'fi'

export const getRandomUser = () => ({
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  phone: faker.phone.phoneNumber(),
  id: uuidv4(),
})

export const getRandomUsers = (count: number) => {
  const users: Participant[] = []
  for (let i = 0; i < count; i += 1) {
    users.push(getRandomUser())
  }
  return users
}
