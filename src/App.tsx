import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='text-gray-900 bg-gray-50 h-screen '>
      <h1 className='' >Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
