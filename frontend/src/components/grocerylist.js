import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './grocerylist.css';
import { useGroceryList } from './grocerylist-context';

const GroceryList = () => {
    const { groceryList, addItemToGroceryList, removeItemFromGroceryList } = useGroceryList();
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const saveListLocally = () => {
        const currentDate = new Date();
        const formattedDate = `${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}-${currentDate.getFullYear().toString().slice(-2)}`;
    
        let textToSave = "Pepper Panda's Grocery List!\n";
        groceryList.forEach(item => {
            textToSave += `[ ] ${item}\n\n`;
        });
    
        const blob = new Blob([textToSave], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `grocery_list_${formattedDate}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };    

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="grocery-list-container">
            {isOpen && (
                <Draggable cancel=".no-drag">
                    <div className="grocery-list">
                        <button className="close-button" onClick={() => setIsOpen(false)}>X</button>
                        <h2>Grocery List</h2>
                        <div className="list-container">
                            <ul className="item-list">
                                {groceryList.map((item, index) => (
                                    <li key={index}>
                                        <span>{item}</span>
                                        <button onClick={() => removeItemFromGroceryList(index)}>X</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="input-container">
                            <div className="translucent-text">{inputValue ? '' : 'Add ingredients here!'}</div>
                            <input
                                type="text"
                                className="list-input no-drag"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        addItemToGroceryList(inputValue);
                                        setInputValue('');
                                    }
                                }}
                            />
                        </div>
                        <button className="save-button" onClick={saveListLocally}>
                            Save Grocery List
                        </button>
                    </div>
                </Draggable>
            )}
            <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close Grocery List' : 'Open Grocery List'}
            </button>
        </div>
    );     
};

export default GroceryList;
