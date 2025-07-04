import { useState, useEffect } from 'react'
import './App.css'
import UserList from './components/UserList'
import { fetchChessGM } from './services/user.services'

function App() {
  const [chessGM, setChessGM] = useState<string[]>([])
  useEffect(() => {
    fetchChessGM(setChessGM)
  }, [])

  return (
    <>
      <UserList users={chessGM} />
    </>
  )
}

export default App
