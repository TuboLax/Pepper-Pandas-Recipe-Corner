import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './grocerylist.css';
import { useGroceryList } from './grocerylist-context';
import { jsPDF } from 'jspdf';
import logo from '../assets/pepper-panda.png';

const GroceryList = () => {
    const { groceryList, addItemToGroceryList, removeItemFromGroceryList } = useGroceryList();
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const saveListLocally = () => {
        const currentDate = new Date();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const year = String(currentDate.getFullYear()).slice(-2);
    
        const formattedDate = `${month}-${day}-${year}`;
        const fileName = `grocery_list_${formattedDate}.pdf`;
    
        const doc = new jsPDF();
        addLogoToPDF(doc);
        const textX = 60;
        const textY = 25;
        doc.setFont('helvetica', 'bolditalic');
        doc.setFontSize(36);
        doc.text("Pepper's Grocery List!", textX, textY);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        groceryList.forEach((item, index) => {
            const checkboxX = 10;
            const checkboxY = textY + 20 + index * 10;
            doc.rect(checkboxX, checkboxY, 5, 5);
            doc.text(item, checkboxX + 10, checkboxY + 5);
        });
        doc.save(fileName);
    };       
    
    const printList = () => {
        const doc = new jsPDF();
        addLogoToPDF(doc);
        const textX = 60; 
        const textY = 25;
        doc.setFont('helvetica', 'bolditalic');
        doc.setFontSize(36);
        doc.text("Pepper's Grocery List!", textX, textY);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        groceryList.forEach((item, index) => {
            const checkboxX = 10;
            const checkboxY = textY + 20 + index * 10;
            doc.rect(checkboxX, checkboxY, 5, 5);
            doc.text(item, checkboxX + 10, checkboxY + 5);
        });
    
        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
    };        
    
    const addLogoToPDF = (doc) => {
        const imgData = logo;
        doc.addImage(imgData, 'PNG', 10, 10, 40, 40);
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
                        <button className="print-button" onClick={printList}>
                            Print Grocery List
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
