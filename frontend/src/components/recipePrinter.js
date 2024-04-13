import "./recipePrinter.css";
import { jsPDF } from 'jspdf';

const RecipePrinter = async (isSpoon, recipeID) => {
    if(isSpoon){
        const response = await axios.get(`http://localhost:3000/find/id/${recID.ID.recipeID}`);

        const title = response.title;
        const imageSrc = response.image;
        const servings = response.servings;
        const prepTime = response.readyInMinutes;
        var cuisines = response.cuisines;
        var ingredients = response.extemdedIngredients.original;
        var description = response.summary;
        
        var diets = response.diets;
        if(response.ketogenic = "true"){ response.push(response.ketogenic); }
        if(response.vegetarian = "true"){ response.push(response.vegetarian); }
        if(response.vegan = "true"){ response.push(response.vegan); }

    }
    else{
        //to implement
    }

    const printRecipe = () => {     //When we have decided on a final design for the recipe popups I will go through and finish this section.
        const doc = new jsPDF();
        addLogoToPDF(doc);
        const textX = 60; 
        const textY = 25;
        doc.setFont('helvetica', 'bolditalic');
        doc.setFontSize(36);
        doc.text("Pepper's Recipes!", textX, textY);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
    
        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
    }

    const addLogoToPDF = (doc) => {
        const imgData = logo;
        doc.addImage(imgData, 'PNG', 10, 10, 40, 40);
    };

    return (
        <div className="recipePrinter">
            <button className="printButton" onClick={printRecipe()}></button>
        </div>
    );
};

export default RecipePrinter;