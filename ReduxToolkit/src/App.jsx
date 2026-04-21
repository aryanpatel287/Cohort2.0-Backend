import React from 'react'
import Navbar from './components/Navbar'
import Counter from './components/Counter'
import { useSelector } from 'react-redux'

const App = () => {
  const theme = useSelector((state) => state.theme.value)

  return (
    <main className={theme}>
      <Navbar theme={theme} />
      <Counter />
    </main>
  )
}

export default App