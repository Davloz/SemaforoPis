import React, { createContext, useContext, useReducer } from 'react';

const UVContext = createContext();

const initialState = {
  uvData: {
    intensity: 0,
    location: 'Loja, Ecuador',
  },
  uvHistory: [],
};

const uvReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_UV_DATA':
      return { ...state, uvData: action.payload };
    case 'ADD_TO_HISTORY':
      return { ...state, uvHistory: [...state.uvHistory, action.payload] };
    default:
      return state;
  }
};

const UVProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uvReducer, initialState);

  return (
    <UVContext.Provider value={{ state, dispatch }}>
      {children}
    </UVContext.Provider>
  );
};

const useUVContext = () => {
  const context = useContext(UVContext);
  if (!context) {
    throw new Error('useUVContext debe ser utilizado dentro de un UVProvider');
  }
  return context;
};

export { UVProvider, useUVContext };
