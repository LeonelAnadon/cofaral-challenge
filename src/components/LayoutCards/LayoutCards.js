import React from "react";
import CardMyChar from "./CardMyChar/CardMyChar";
import "./LayoutCards.css";

const LayoutCards = ({savedCards, deleteChar, handleEditMode}) => {




  return (
    <div className="layoutContainer">
      {
        savedCards.length ?
        savedCards.map(card => <CardMyChar key={card.id} cardData={card} deleteChar={deleteChar} handleEditMode={handleEditMode}/>) : <span>There is nothing here</span>
      }

    </div>
  );
};

export default LayoutCards;
