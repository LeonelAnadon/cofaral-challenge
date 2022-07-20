import React from 'react'
import formatDate from '../../../utils/formatDate'
import './CardMyChar.css'

const CardMyChar = ({cardData, deleteChar, handleEditMode}) => {

  // if(!cardData.length) return <></>

  return (
    <div className="layoutCard">
    <div className="infoChar">
      <h3>{cardData.name}</h3>
      <div>
        <span>Birth year:</span>
        <span>{cardData.birth}</span>
      </div>
      <div>
        <span>Eye color:</span>
        <span>{cardData.eyecolor}</span>
      </div>
      <div>
        <span>Gender:</span>
        <span>{cardData.gender}</span>
      </div>
      <div>
        <span>Hair color:</span>
        <span>{cardData.haircolor}</span>
      </div>
      <div>
        <span>Height:</span>
        <span>{cardData.height}</span>
      </div>
      <div>
        <span>Skin color:</span>
        <span>{cardData.skincolor}</span>
      </div>
      <div className='createdform'>
        <span>Created</span>
        <span>{formatDate(cardData.created)}</span>
      </div>
      <div className='editedform'>
        <span>Edited</span>
        <span>{formatDate(cardData.edited)}</span>
      </div>  
    </div>
    <div className="manageBtns">
      <button onClick={() => deleteChar(cardData.id)}>Borrar</button>
      <button onClick={() => handleEditMode(cardData.id)}>Editar</button>
    </div>
  </div>
  )
}

export default CardMyChar