import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({atClick, text}) => (
  <button onClick={atClick}>
    {text}
  </button>
)


const Statistics = ({good, neutral, bad}) => {
  const title = "Statistics"
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <div>
        <p>No given feedback</p>
      </div>
    )
  }

  const avg = ((good * 1) + (neutral * 0) + (bad * -1)) / total
  const positive = (good / total) * 100


  
  return (
    <div>
      <h2>{title}</h2>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>good</td><td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td><td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td><td>{bad}</td>
          </tr>
          <tr>
            <td>total</td><td>{total}</td>
          </tr>
          <tr>
            <td>average</td><td>{avg}</td>
          </tr>
          <tr>
            <td>positive</td><td>{positive} %</td>
          </tr>
        </tbody>
        
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button atClick={() => setGood(good + 1)} text="Good" />
      <Button atClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button atClick={() => setBad(bad + 1)} text="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
