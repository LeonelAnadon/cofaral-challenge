import React, { useEffect } from "react";
import formatDate from "../../utils/formatDate";
import "./Card.css";

const Card = ({ charData, handleClickCard }) => {

  useEffect(() => {
    // console.log(charData);
  }, [charData])
  


  return (
    <div className="cardOuterContainer" onClick={() => handleClickCard(charData)}>
      <div className="cardInnerContainer">
        <div className="front">
          <h1>{charData.name}</h1>
          <div className="mainInformation"><span>Birth year: </span>{charData.birth_year}</div>
          <div className="mainInformation"><span>Eye color: </span>{charData.eye_color}</div>
          <div className="mainInformation"><span>Gender: </span>{charData.gender}</div>
          <div className="mainInformation"><span>Hair color: </span>{charData.hair_color}</div>
          <div className="mainInformation"><span>Height: </span>{charData.height}</div>
          <div className="mainInformation"><span>Skin color: </span>{charData.skin_color}</div>
          </div>
        <div className="back">
        <h1>Additional Information</h1>
        <div className="additionalInfo"><span>Created: </span>{formatDate(charData.created)}</div>
        <div className="additionalInfo"><span>Edited: </span>{formatDate(charData.edited)}</div>
        <div className="additionalInfo"><span>Birth year: </span>{charData.birth_year}</div>
        <span className="moreInfo">¡CLICK FOR MORE!</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
