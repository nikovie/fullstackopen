import React from 'react'

const Notification = ({notification}) => {
  const defaultCss = 'ma2 pa2 bw2 b--solid'
  
  if (notification === null) {
    return null
  }

  if (notification.type === 'error') {
    notification.type = 'b--red'
  } else if  (notification.type === 'success') {
    notification.type = 'b--green'
  } 

  return (
    <div className={`${defaultCss} ${notification.type}`}>
      {window.scrollTo(0, 0)}
      {notification.message}
    </div>
  )
}

export default Notification
