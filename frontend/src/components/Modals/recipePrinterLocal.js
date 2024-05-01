import './recipePrinter.css';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print'
import veganLogo from '../../assets/food icons/vegan.png';
import vegetarianLogo from '../../assets/food icons/vegitarian.png'; 
import pescLogo from '../../assets/food icons/pescatarian.PNG';
import ketoLogo from '../../assets/food icons/keto.PNG';
import dairyFreeLogo from '../../assets/food icons/dairy_free.png';
import glutenFreeLogo from '../../assets/food icons/gluten_free.png';

export const RecipePrinterLocal = (recipeKey) => {
    var recipe = recipeKey;
    let hold = Object.values(recipe || {});
    let callRecipe = (hold[0].recipeKey);

    let cuisineArr = (callRecipe.cuisines);
    let holdCuisArr = [];
    for (var i = 0; i < cuisineArr.length; i++) {
        if (cuisineArr[i] !== null ) {
            if (i !== cuisineArr.length-1)
                holdCuisArr[i] = cuisineArr[i]+ ', ';
            else
                holdCuisArr[i] = cuisineArr[i];
        }
    }
    if (holdCuisArr.length === 0) {
        holdCuisArr[0] = 'No Tags Found'
    }

    var veganBool, vegtrnBool, pescBool, ketoBool, dfBool, gfBool = false;
    let dietArr = callRecipe.diets;
    
    for(var i=0; i<dietArr.length; i++) {
        if (dietArr[i] != null && dietArr != "") {
            if (dietArr[i].toLowerCase().replace(" ", "").trim() === 'vegan') {
                veganBool = true;
            } else if (dietArr[i].toLowerCase().replace(" ", "").trim() === 'vegetarian') {
                vegtrnBool = true;
            } else if (dietArr[i].toLowerCase().replace(" ", "").trim() === 'pescatarian') {
                pescBool=true;
            } else if (dietArr[i].toLowerCase().replace(" ", "").trim() === 'ketogenic') {
                ketoBool= true;
            } else if(dietArr[i].toLowerCase().replace(" ", "").trim() === 'dairyfree') {
                dfBool=true;
            } else if(dietArr[i].toLowerCase().replace(" ", "").trim() === 'glutenfree') {
                gfBool=true;
            }
        }
    }

    const componentRef = useRef();

    return (
        <div>
            <ReactToPrint
                content={() => componentRef.current}
                trigger={() => (
                    <button className='printButton'>Print</button>
                )}
            />
            <div className='printBody' ref={componentRef}>
                <h1 className='recName'>{callRecipe.title}</h1>
                <h3 className='recCategories'> Recipe Categories </h3>
                <>
                    {veganBool && (
                        <img 
                            src={veganLogo} 
                            style={{width:'80px', height:'80px', borderRadius: '50%'}} 
                            className='logos' 
                            id="vegan" 
                            alt="Vegan" 
                            title="Vegan"
                        ></img>
                    )}
                    {vegtrnBool && (
                        <img 
                            src={vegetarianLogo} 
                            style={{width:'80px', height:'80px', borderRadius: '50%'}} 
                            className='logos' 
                            id="vegetarian" 
                            alt='Vegetarian' 
                            title="Vegetarian"
                        ></img>
                    )}
                    {pescBool && (
                        <img 
                            src={pescLogo} 
                            style={{width:'80px', height:'80px', borderRadius: '50%'}} 
                            className='logos' 
                            id="pescatarian" 
                            alt='Pescatarian' 
                            title="Pescatarian"
                        ></img>
                    )}
                    {ketoBool && (
                        <img 
                            src={ketoLogo} 
                            style={{width:'80px', height:'80px', borderRadius: '50%'}} 
                            className='logos' 
                            id= "keto" 
                            alt='Ketogenic' 
                            title="Ketogenic"
                        ></img>
                    )}
                    {gfBool && (
                        <img 
                            src={glutenFreeLogo} 
                            style={{width:'80px', height:'80px', borderRadius: '50%'}} 
                            className='logos' 
                            id="glutenFree" 
                            alt='Gluten Free' 
                            title="Gluten Free"
                        ></img>
                    )}
                    {dfBool && (
                        <img 
                            src={dairyFreeLogo} 
                            style={{width:'80px', height:'80px', borderRadius: '50%'}} 
                            className='logos' 
                            id="dairyFree" 
                            alt='Dairy Free' 
                            title="Dairy Free"
                        ></img>
                    )}
                </>
                <>
                    <p></p>
                    <span style={{padding:'5px'}}> <b> Servings: </b> {callRecipe.servings} </span>
                    <span style={{padding:'5px'}}> <b> Preparation Time: </b> {callRecipe.readyInMinutes} Minutes </span>
                </>
                <>
                <div className='cuisTagsBox'>
                    <p></p>
                    <span> <b> Cuisine Tags: </b> </span>
                    <span>{holdCuisArr}</span>
                </div>
                </>
                <div className='boxes' id='localBoxes'>
                    <div className='ingBoxPrinter'>
                        <h3 className='ingHead'><b> Ingredients: </b></h3>
                        <div>
                            {callRecipe.extendedIngredients.map((ing, index) => {
                                return (
                                    <div key={index}>
                                        <input className='ingCheck' type="checkbox" name={ing}/>
                                        <label className='ingLabel'> {ing}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='dirBoxPrinter'>
                        <h3 className='directionsHeader'><b> Directions: </b></h3>
                        <ul className='dirListPrinter'>
                            <div className='directionsList'>
                                {callRecipe.instructions.map((step, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: step }} />
                                ))}
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}