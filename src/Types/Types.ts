export type Column = {
  key: string
  label: string
}

export type Participant = {
  id?: string
  name?: string
  email?: string
  phone?: string
}

export type SortOrder = {
  key: string
  orderBy: 'asc' | 'desc'
}
