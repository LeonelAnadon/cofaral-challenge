import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import "./Modal.css";
import Spinner from "../Spinner/Spinner";
import { ContextChar } from "../../App";

const Modal = ({ modalData, setModal }) => {
  const [films, setFilms] = useState([]);
  const [homeworld, setHomeworld] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {setSaveThisChar} = useContext(ContextChar);


  useEffect(() => {
    // setIsLoading(true)
    handleGetFilms(modalData.films);
    handleGetHomeworld(modalData.homeworld);
    handleGetSpecies(modalData.species);
    handleGetStarships(modalData.starships);
    handleGetVehicles(modalData.vehicles);
  }, []);

  const handleGetFilms = async (arrFilms) => {
    let savedFilmsTitle = [];
    for await (let films of arrFilms) {
      try {
        handleLoading("start");
        const response = await axios.get(films);
        savedFilmsTitle.push(response.data.title);
      } catch (error) {
        handleLoading("stop");
        console.error(error);
      }
    }
    setFilms(savedFilmsTitle);
    handleLoading("stop");
  };

  const handleGetHomeworld = async (homeworldLink) => {
    try {
      handleLoading("start");
      const response = await axios.get(homeworldLink);
      setHomeworld([response?.data?.name]);
    } catch (error) {
      handleLoading("stop");
      console.error(error);
    }
    handleLoading("stop");
  };

  const handleGetSpecies = async (speciesLink) => {
    try {
      handleLoading("start");
      const response = await axios.get(speciesLink);
      setSpecies([response?.data?.name]);
    } catch (error) {
      handleLoading("stop");
      console.error(error);
    }
    handleLoading("stop");
  };

  const handleGetStarships = async (starshipsLinkArr) => {
    let savedStarships = [];
    for await (let starship of starshipsLinkArr) {
      try {
        handleLoading("start");
        const response = await axios.get(starship);
        savedStarships.push(response.data.name);
      } catch (error) {
        handleLoading("stop");
        console.error(error);
      }
    }
    setStarships(savedStarships);
    handleLoading("stop");
  };

  const handleGetVehicles = async (vehiclesLinkArr) => {
    let savedVehicles = [];
    for await (let vehicles of vehiclesLinkArr) {
      try {
        handleLoading("start");
        const response = await axios.get(vehicles);
        savedVehicles.push(response.data.name);
      } catch (error) {
        handleLoading("stop");
        console.error(error);
      }
    }
    setVehicles(savedVehicles);
    handleLoading("stop");
  };

  const handleLoading = (state = "start") => {
    if (state === "start") {
      setIsLoading(true);
    } else if (state === "stop") {
      setIsLoading(false);
    }
  };

  const handleSaveToMyChars = () => {
    setSaveThisChar(modalData)
    setModal((close) => !close)
  }

  return (
    <div className="tintScreen">
      <div className="modal">
        {isLoading ? <Spinner /> : null}
        <h1>{modalData.name}</h1>
        <div className="infoModal">
          <div className="filmInfo">
            <span>Films</span>
            {modalData.films.length ? (
              films?.map((film, i) => <p key={i}>{film}</p>)
            ) : (
              <p>There is no information</p>
            )}
          </div>
          {}
          <div className="homeworldInfo">
            <span>Homeworld</span>
            {modalData.homeworld.length ? (
              homeworld?.map((home, i) => <p key={i}>{home}</p>)
            ) : (
              <p>There is no information</p>
            )}
          </div>

          <div className="speciesInfo">
            <span>Species</span>
            {modalData.species.length ? (
              species?.map((species, i) => <p key={i}>{species}</p>)
            ) : (
              <p>There is no information</p>
            )}
          </div>

          <div className="starshipsInfo">
            <span>Starships</span>
            {modalData.starships.length ? (
              starships?.map((starship, i) => <p key={i}>{starship}</p>)
            ) : (
              <p>There is no information</p>
            )}
          </div>

          <div className="vehiclesInfo">
            <span>Vehicles</span>
            {modalData.vehicles.length ? (
              vehicles?.map((vehicle, i) => <p key={i}>{vehicle}</p>)
            ) : (
              <p>There is no information</p>
            )}
          </div>
          <button onClick={handleSaveToMyChars}>Save to my characters</button>
        </div>

        <div className="closeBtn" onClick={() => setModal((close) => !close)}>
          X
        </div>
      </div>
    </div>
  );
};

export default Modal;
