import { useState } from 'react';
import Draggable from 'react-draggable';
import './shoppinglist.css';

const ShoppingList = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const addItemToShoppingList = (item) => {
        setShoppingList([...shoppingList, item]);
    };

    const removeItemFromShoppingList = (index) => {
        const updatedList = [...shoppingList];
        updatedList.splice(index, 1);
        setShoppingList(updatedList);
    };

    const saveListLocally = () => {
        const textToSave = shoppingList.join('\n');
        const blob = new Blob([textToSave], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'shopping_list.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="shopping-list-container">
            <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close Shopping List' : 'Open Shopping List'}
            </button>
            {isOpen && (
                <Draggable>
                    <div className="shopping-list">
                        <h2>Shopping List</h2>
                        <ul>
                            {shoppingList.map((item, index) => (
                                <li key={index}>
                                    <span>{item}</span>
                                    <button onClick={() => removeItemFromShoppingList(index)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            placeholder="Add item..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addItemToShoppingList(e.target.value);
                                    e.target.value = '';
                                }
                            }}
                        />
                        <button className="save-button" onClick={saveListLocally}>
                            Save Shopping List
                        </button>
                    </div>
                </Draggable>
            )}
        </div>
    );
};

export default ShoppingList;
