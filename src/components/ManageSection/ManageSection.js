import React, { useState } from "react";
import "./ManageSection.css";
import { useForm } from "react-hook-form";

const ManageSection = ({ setSavedCards, searchChar, savedCards, searchByGender }) => {
  const [genderOption, setGenderOption] = useState('None')
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setSavedCards((datas) => [
      ...datas,
      {
        ...data,
        id: data.name + data.birth,
        created: new Date(),
        edited: new Date(),
      },
    ]);
    reset();
  };

  const handleGenderOption = (evt) => {
    setGenderOption(evt.target.value)
  }
  const handleSearchByGender = () => {
    searchByGender(genderOption)
  }

  return (
    <div className="manageContainer">
      <div>
        <h1>Manage</h1>
        <div className="searchContainer">
        <span>Search by name</span>

          <input
            type="text"
            autoComplete="no"
            placeholder="Search for a character"
            onChange={(e) => searchChar(e.target.value)}
          />
          <span>Search by gender</span>
          <select value={genderOption} onChange={handleGenderOption}>
          <option value='None'>None</option>

            {savedCards
              .filter(
                (v, i, a) => a.findIndex((v2) => v2.gender === v.gender) === i
              )
              .map((gender, i) => (
                <option key={i} value={gender.gender}>{gender.gender}</option>
              ))}
          </select>
          <button onClick={handleSearchByGender}>Search</button>
        </div>
        <div className="addChar">
          <h2>Add a character</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Name"
              autoComplete="off"
              {...register("name", { required: true, maxLength: 20 })}
            />
            <input
              placeholder="Birthday"
              autoComplete="off"
              {...register("birth")}
            />
            <input
              placeholder="Eye color"
              autoComplete="off"
              {...register("eyecolor")}
            />
            <input
              placeholder="Gender"
              autoComplete="off"
              {...register("gender")}
            />
            <input
              placeholder="Hair color"
              autoComplete="off"
              {...register("haircolor")}
            />
            <input
              placeholder="Height"
              autoComplete="off"
              type="number"
              {...register("height")}
            />
            <input
              placeholder="Skin color"
              autoComplete="off"
              {...register("skincolor")}
            />
            <input type="submit" value="Create" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageSection;
