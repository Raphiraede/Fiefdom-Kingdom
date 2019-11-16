import React from 'react'

function NobleComponent(props){
  console.log(props)
  return(
    <div>
      <h2>
        {props.firstName}
      </h2>
    </div>
  )
}

export { NobleComponent }