import React, { createContext, useState, useContext } from 'react';


export const AppContext = createContext();

export const AppContextProvider  = ({children}) => {
    const [tab, setTab] = useState(true); 
    return (
        <AppContext.Provider value={{ tab, setTab }}>
            {children}
        </AppContext.Provider>
    );
}