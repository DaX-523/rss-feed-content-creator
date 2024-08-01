"use client";
import React from "react";

export const ContentContext = React.createContext();

const initialState = { content: "" };

const reducer = (state, action) => {
  console.log("called");
  switch (action.type) {
    case "SET_DATA":
      return { ...state, content: action.payload };
    case "REMOVE_DATA":
      return { ...state, content: "" };
    default:
      return state;
  }
};

export const ContentProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ContentContext.Provider value={{ state, dispatch }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useMyContext = () => React.useContext(ContentContext);
