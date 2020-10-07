import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.showLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} variant="secondary" size="sm">
          {props.hideLabel}
        </Button>
      </div>
    </>
  )
})

Togglable.propTypes = {
  showLabel: PropTypes.string,
  hideLabel: PropTypes.string
}

Togglable.defaultProps = {
  showLabel: 'show',
  hideLabel: 'hide'
}

Togglable.displayName = 'Togglable'

export default Togglable
