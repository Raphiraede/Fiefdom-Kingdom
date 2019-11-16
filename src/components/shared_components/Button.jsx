import React from 'react'
function Button(props){
  const {
    text,
    onClick,
    backgroundImage,
  } = props

  return(
    <button className='button' onClick={onClick}>
      {text}
    </button>
  )
}

export { Button }