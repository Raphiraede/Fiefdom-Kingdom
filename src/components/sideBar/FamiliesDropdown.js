import React from 'react'
import uuidv1 from 'uuid/v1'

function FamiliesDropdown(props){

  return(
    <div className='FamiliesDropdownSection'>
      <select className='DropDown' value={props.selectedFamilyId} id='family-select' onChange={props.onChange}>
        {
          props.families.map(family => {
            return <option className='Option'key={uuidv1()} value={family.id}>{family.familyName}</option>
          })
        }
      </select>
    </div>
  )
}

export { FamiliesDropdown }