import React from 'react'
import propTypes from 'prop-types'

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

const ButtonGroupWrapper = ({
  buttons
}) => (
  <ButtonGroup>
    {
      buttons.map((button, index) => (
        <Button
          key={index}
          type={button.type || 'button'}
          size={button.size || 'sm'}
          variant={button.variant}
          onClick={button.onClick}
        >
          {button.label}
        </Button>
      ))
    }
  </ButtonGroup>
)

ButtonGroupWrapper.propTypes = {
  buttons: propTypes.array
}

export default ButtonGroupWrapper
