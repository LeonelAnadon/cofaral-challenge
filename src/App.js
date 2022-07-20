import React, { useEffect, useState } from "react";
import "./App.css";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MyCharacters from "./pages/myCharacters";

export const ContextChar = React.createContext({ saveThisChar: {}, setSaveThisChar: () => {} });

const App = () => {

  const [saveThisChar, setSaveThisChar] = React.useState({});


  return (
    <BrowserRouter>
    <ContextChar.Provider value={{
        saveThisChar,
        setSaveThisChar
      }}>
    <Routes>
      <Route path="/" element={<HomeScreen />}/>
      <Route path="/mychars" element={<MyCharacters />} />
    </Routes>
    </ContextChar.Provider>
  </BrowserRouter>
    
  );
};

export default App;
