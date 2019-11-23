import React from 'react'


function Button(props){
  const {
    text,
    onClick,
  } = props

  return(
    <button className='button' onClick={onClick}>
      {text}
    </button>
  )
}

export { Button }