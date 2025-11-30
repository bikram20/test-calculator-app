import { useState } from 'react'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  return (
    <div className="calculator">
      <h1 className="calculator-title">Advanced Calculator</h1>
      <div className="calculator-display">{display}</div>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="digit-keys">
            <button onClick={() => inputDigit(0)}>0</button>
            <button onClick={inputDecimal}>.</button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <button key={digit} onClick={() => inputDigit(digit)}>
                {digit}
              </button>
            ))}
          </div>
          <div className="operator-keys">
            <button onClick={() => performOperation('+')}>+</button>
            <button onClick={() => performOperation('-')}>-</button>
            <button onClick={() => performOperation('*')}>×</button>
            <button onClick={() => performOperation('/')}>÷</button>
          </div>
        </div>
        <div className="function-keys">
          <button className="key-clear" onClick={clear}>AC</button>
          <button className="key-equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
