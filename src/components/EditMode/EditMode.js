import React, { useEffect, useRef, useState } from "react";
import formatDate from "../../utils/formatDate";
import "./EditMode.css";

const EditMode = ({ setEditMode, savedCards, setSavedCards, editMode }) => {
  const [editForm, setEditForm] = useState({
    name: "Name",
    birth: "Birth",
    eyecolor: "Eyecolor",
    gender: "Gender",
    haircolor: "Haircolor",
    height: "Height",
    skincolor: "Skincolor",
    created: "Thursday",
    edited: 'Friday'
  });
  const doFocus = useRef(null)

  useEffect(() => {
    setEditForm(findById(editMode.charId));
    doFocus.current.focus()
  }, [editMode]);

  const findById = (id) => {
    return savedCards.find((char) => char.id === id);
  };

  const handleChange = ({ target }) => {
    setEditForm({
      ...editForm,
      [target.name]: target.value,
    });
  };

  const completeEdit = (charId) => {
    setSavedCards(
      savedCards.map((char) => {
        if (char.id === charId) {
          return {...editForm, edited: new Date(), id: editForm.name+editForm.birth,}
        } else {
          return char;
        }
      })
    );
    setEditMode(false)
  };

  return (
    <div className="tintScreenEditMode">
      <div className="editModeContainer">
        <div>
          <input
            autoComplete="off"
            className="nameEdit"
            name="name"
            value={editForm.name}
            onChange={(e) => handleChange(e)}
            ref={doFocus}
          />
          <div>
            <span>Birth year:</span>
            <input
              autoComplete="off"
              name="birth"
              value={editForm.birth}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <span>Eye color:</span>
            <input
              autoComplete="off"
              name="eyecolor"
              value={editForm.eyecolor}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <span>Gender:</span>
            <input
              autoComplete="off"
              name="gender"
              value={editForm.gender}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <span>Hair color:</span>
            <input
              autoComplete="off"
              name="haircolor"
              value={editForm.haircolor}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <span>Height:</span>
            <input
              autoComplete="off"
              name="height"
              value={editForm.height}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <span>Skin color:</span>
            <input
              autoComplete="off"
              name="skincolor"
              value={editForm.skincolor}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="createdform">
            <span>Created</span>
            <span>{formatDate(editForm.created)}</span>
          </div>
          <div className="editedform">
            <span>Edited</span>
            <span>{formatDate(editForm.edited)}</span>
          </div>
        </div>
        <div className="saveBtnContainer">
          <button onClick={() => completeEdit(editForm.id)}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditMode;
