import { useState } from 'react'
import './App.css'

type Player = 'X' | 'O'
type SquareValue = Player | null

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const

function calculateWinner(squares: SquareValue[]) {
  for (const [a, b, c] of winningLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

function App() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null))
  const [isXTurn, setIsXTurn] = useState(true)

  const winner = calculateWinner(squares)
  const isDraw = !winner && squares.every(Boolean)

  const handleSquareClick = (index: number) => {
    if (squares[index] || winner) {
      return
    }

    const nextSquares = [...squares]
    nextSquares[index] = isXTurn ? 'X' : 'O'

    setSquares(nextSquares)
    setIsXTurn((current) => !current)
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null))
    setIsXTurn(true)
  }

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "It's a draw!"
      : `Next player: ${isXTurn ? 'X' : 'O'}`

  return (
    <main className="game-shell">
      <section className="game-card">
        <header className="game-header">
          <p className="eyebrow">React + Vite</p>
          <h1>Tic-Tac-Toe</h1>
          <p className="subtitle">
            Take turns, line up three symbols, and challenge a friend.
          </p>
        </header>

        <div className="status-bar">{status}</div>

        <div className="board" role="grid" aria-label="Tic-tac-toe board">
          {squares.map((value, index) => (
            <button
              key={index}
              type="button"
              className="square"
              onClick={() => handleSquareClick(index)}
              disabled={Boolean(value) || Boolean(winner)}
            >
              {value}
            </button>
          ))}
        </div>

        <button type="button" className="reset-button" onClick={resetGame}>
          Reset game
        </button>
      </section>
    </main>
  )
}

export default App
