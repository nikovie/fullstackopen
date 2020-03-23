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
      <StatisticLine label="Good" value={good} />
      <StatisticLine label="Neutral" value={neutral} />
      <StatisticLine label="Bad" value={bad} />
      <StatisticLine label="Total" value={total} />
      <StatisticLine label="Average" value={avg} />
      <StatisticLine label="Positive" value={positive} suffix="%" />
    </div>
  )
}

const StatisticLine = ({label, value, suffix}) => {
  return (
    <div>
      {label}: {value} {suffix}<br />
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
