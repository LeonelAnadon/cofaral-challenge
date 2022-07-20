import React, { useCallback, useEffect, useState } from "react";
import api from "../../api/api";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";
import Stars from "../Stars/Stars";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (!data.length) {
      handleGetData();
    }
  }, []);

  const handleGetData = useCallback(async () => {
    handleLoading("start");
    const response = await api.get(`/people`);
    setData(response.data);
    handleLoading("stop");
  });

  const handleNextPage = async (nextPageLink) => {
    if (nextPageLink === null) {
      console.log("Nothing to show");
    }
    handleLoading("start");
    const response = await api.get(
      `/people/${nextPageLink.slice(nextPageLink.match("people/").index + 7)}`
    );
    setData(response.data);
    handleLoading("stop");
  };

  const handlePreviousPage = async (previousPageLink) => {
    if (previousPageLink === null) {
      console.log("Nothing to show");
      return;
    }
    handleLoading("start");
    const response = await api.get(
      `/people/${previousPageLink.slice(
        previousPageLink.match("people/").index + 7
      )}`
    );
    setData(response.data);
    handleLoading("stop");
  };

  const handleClickCard = (dataChar) => {
    setModal(!modal);
    setModalData(dataChar);
  };

  const handleLoading = (state = "start") => {
    if (state === "start") {
      setIsLoading(true);
    } else if (state === "stop") {
      setIsLoading(false);
    }
  };

  return (
    <>
      {modal ? <Modal modalData={modalData} setModal={setModal} /> : null}
      <Stars />
      {isLoading ? <Spinner /> : null}
      <div className="homeScreenContainer">
        <h1>Star Wars</h1>
        <h3>Characters</h3>
        <div className="myCharactersBtn" onClick={() => navigate('/mychars')}>My characters</div>
        <div className="cardsContainer">
          {data?.results?.map((char, i) => (
            <Card
              charData={char}
              key={char.name.replace(" ", "") + char.mass}
              handleClickCard={handleClickCard}
            />
          ))}
        </div>
        <div className="nextBtn" onClick={() => handleNextPage(data?.next)}>
          &rarr;
        </div>
        <div
          className="previousBtn"
          onClick={() => handlePreviousPage(data?.previous)}
        >
          &larr;
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
