import React, { createContext, useContext, useState } from 'react';

const GroceryListContext = createContext();

export const useGroceryList = () => useContext(GroceryListContext);

export const GroceryListProvider = ({ children }) => {
    const [groceryList, setGroceryList] = useState([]);

    const addItemToGroceryList = (item) => {
        setGroceryList([...groceryList, item]);
    };

    const removeItemFromGroceryList = (index) => {
        const updatedList = [...groceryList];
        updatedList.splice(index, 1);
        setGroceryList(updatedList);
    };

    return (
        <GroceryListContext.Provider value={{ groceryList, addItemToGroceryList, removeItemFromGroceryList }}>
            {children}
        </GroceryListContext.Provider>
    );
};
