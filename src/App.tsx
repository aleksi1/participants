import { useEffect, useState } from 'react'
import './App.css'
import AddNew from './Components/Actions/AddNew'
import Header from './Components/Header/Header'
import Table, { getParticipant } from './Components/Table/Table'
import { getRandomUsers } from './Helper/Randomizer'
import { Participant, SortOrder } from './Types/Types'

const columns = [{
  key: 'name',
  label: 'Name',
},
{
  key: 'email',
  label: 'E-mail address ',
}, {
  key: 'phone',
  label: 'Phone number',
}]

const App = () => {
  const [data, setData] = useState<Participant[]>([])
  const [sortOrder, setSortOrder] = useState<SortOrder>({ key: 'name', orderBy: 'asc' })
  // eslint-disable-next-line
  const getKeyValue = (obj: any, key: string) => String(obj[key])
  const sortData = (newData?: Participant[]) => {
    if (newData && newData.length > 0) {
      const comparator = (a: Participant,
        b: Participant) => {
        let v1 = getKeyValue(a, sortOrder.key)?.toLowerCase()
        let v2 = getKeyValue(b, sortOrder.key)?.toLowerCase()
        if (sortOrder.key === 'phone') {
          const cleanPhone = (s: string) => s.replace(/[^0-9]/g, '')
          v1 = cleanPhone(v1)
          v2 = cleanPhone(v2)
        }
        return v1.localeCompare(v2)
      }
      if (sortOrder.orderBy === 'asc') {
        return newData.sort(comparator)
      }
      return newData.sort(comparator).reverse()
    }
    return null
  }

  useEffect(() => {
    setData(getRandomUsers(20))
    setSortOrder({ key: 'name', orderBy: 'asc' })
  }, [])

  useEffect(() => {
    if (data && data.length > 0) {
      const newData = sortData(data)
      if (newData && newData.length > 0) setData([...newData])
    }
  }, [setData, sortOrder])

  const addParticipant = (participant: Participant) => {
    if (data && participant) {
      setData(sortData([...data, participant]) ?? [])
    }
  }

  const updateParticipant = (participant: Participant) => {
    if (data && participant) {
      const newData = sortData(
        [...data.filter((element) => element.id !== participant.id), participant],
      )
      setData(newData ?? [])
    }
  }

  const deleteParticipant = (id: string) => {
    if (data) {
      const participant = getParticipant(id, data)
      // eslint-disable-next-line
      if (participant && window.confirm(`Are you sure you want to delete particant ${participant.name}?`)) {
        setData(sortData(data.filter((element) => element.id !== id)) ?? [])
      }
    }
  }

  const changeSortOrder = (so: SortOrder) => {
    setSortOrder(so)
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <h1>List of participants</h1>
        <AddNew addParticipant={addParticipant} />
        <Table
          data={data}
          columns={columns}
          deleteParticipant={deleteParticipant}
          updateParticipant={updateParticipant}
          sortOrder={sortOrder}
          changeSortOrder={changeSortOrder}
        />
      </div>
    </div>
  )
}

export default App
