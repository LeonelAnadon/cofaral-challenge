import React, { useContext, useEffect, useState } from "react";
import "./myCharacters.css";
import LayoutCards from "../components/LayoutCards/LayoutCards";
import ManageSection from "../components/ManageSection/ManageSection";
import EditMode from "../components/EditMode/EditMode";
import { useNavigate } from "react-router-dom";
import { ContextChar } from "../App";
import Stars from "../components/Stars/Stars";

const DUMMYDATA = [
  {
    id: 'Leonel01/11/1995',
    name: "Leonel",
    birth: "01/11/1995",
    eyecolor: "brown",
    gender: "male",
    haircolor: "brown",
    height: "170",
    skincolor: "white",
    created: new Date(),
    edited: new Date(),
  },
];

const MyCharacters = () => {

  const [savedCards, setSavedCards] = useState(() => {
    const items = JSON.parse(localStorage.getItem("@mycharacterscofaral"));
    if (items) {
      return items;
    } else {
      return DUMMYDATA
    }
  });
  const [filteredOnes, setFilteredOnes] = useState([]);
  const [editMode, setEditMode] = useState({ state: false, charId: "" });

  const { saveThisChar } = useContext(ContextChar);

  let navigate = useNavigate();

  //Local Storage
  useEffect(() => {
    localStorage.setItem("@mycharacterscofaral", JSON.stringify(savedCards));
  }, [savedCards]);

  useEffect(() => {
    setFilteredOnes(savedCards);
  }, [savedCards]);

  useEffect(() => {
    setFilteredOnes(savedCards);
  }, []);

  useEffect(() => {
    if(Object.entries(saveThisChar).length){
      saveCharFromHome(saveThisChar);
    }
  }, [saveThisChar]);

  const saveCharFromHome = (data) => {
    if(savedCards.find(equal => equal.name === data.name)){
      console.log('Already saved')
    } else {

      setSavedCards((datas) => [
        ...datas,
        {
          birth: data.birth_year,
          eyecolor: data.eye_color,
          haircolor: data.hair_color,
          height: data.height,
          name: data.name,
          skincolor: data.skin_color,
          gender: data.gender,
          id: data.name + data.birth,
          created: new Date(data.created),
          edited: new Date(),
        },
      ]);
    }
  };

  const searchChar = (char) => {
    if (char.length > 1) {
      setFilteredOnes(
        savedCards.filter((chars) =>
          chars.name.toLowerCase().trim().includes(char.toLowerCase().trim())
        )
      );
    } else {
      setFilteredOnes(savedCards);
    }
  };
  const searchByGender = (gen) => {
    if(gen !== 'None'){
      setFilteredOnes(
        savedCards.filter((chars) =>
          chars.gender.trim() === (gen.trim())
        )
      );
    }
    else {
      setFilteredOnes(savedCards);
    }
  }
  const deleteChar = (char) => {
    setSavedCards(savedCards.filter((oneToDelete) => oneToDelete.id !== char));
  };
  const handleEditMode = (char) => {
    setEditMode({ state: true, charId: char });
  };

  return (
    <div className="myCharOuterContainer">
      <Stars />

      {editMode.state ? (
        <EditMode
          editMode={editMode}
          setEditMode={setEditMode}
          savedCards={savedCards}
          setSavedCards={setSavedCards}
        />
      ) : null}
      <h1>MY CHARACTERS</h1>
      <div className="backToHomeBtn" onClick={() => navigate("/")}>
        &#10096; Back to home
      </div>
      <div className="myCharContainer">
        <LayoutCards
          savedCards={filteredOnes}
          deleteChar={deleteChar}
          handleEditMode={handleEditMode}
        />
        <ManageSection setSavedCards={setSavedCards} searchChar={searchChar} searchByGender={searchByGender} savedCards={savedCards} />
      </div>
    </div>
  );
};

export default MyCharacters;
