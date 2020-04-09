import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const exercises = course.parts.map((x) => x.exercises)

  const total = exercises.reduce((val, sum) => { 
    return val + sum
  }, 0)

  return(
    <p><strong>Number of exercises {total}</strong></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  const parts = course.parts.map((part) => {
    return <Part part={part} key={part.id} />;
  })

  return (
    <div>
      {parts}
    </div>
  )
}

const Course = ({ course }) => {
  const courses = course.map((course) => {
    return (
      <div key={course.id}>
        <Header course={course}></Header>
        <Content course={course}></Content>
        <Total course={course}></Total>
      </div>
    )
  })

  return (
    <div>
      {courses}
    </div>
  )
}

export default Course