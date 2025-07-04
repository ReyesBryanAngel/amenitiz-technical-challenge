import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import UserList from './components/UserList'

function App() {
  const [chessGM, setChessGM] = useState<string[]>([])
  useEffect(() => {
    const fetchChessGM = async () => {
      try {
        const response = await axios.get(`https://api.chess.com/pub/titled/GM`)
        setChessGM(response.data.players)
      } catch (error: unknown) {
        console.error('Error fetching chess GM:', error)
      }
    }

    fetchChessGM()
  }, [])

  return (
    <>
      <UserList users={chessGM} />
    </>
  )
}

export default App
