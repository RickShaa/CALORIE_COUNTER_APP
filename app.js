const SUBMIT_CALORIES_BTN = document.querySelector('.submit-calories');
const TOTAL_CALORIES_INPUT = document.getElementById('total_calories_input');
const INPUT_CALORIES_FORM = document.querySelector('.input_text_greeting');
const INPUT_CALORIES_RESULT = document.querySelector('.display-calorie-input');
const BACKDROP = document.querySelector('#backdrop');
const ADD_FOOD = document.querySelector('header button');
const FOOD_MODAL = document.querySelector('#add-food-modal');
const USER_FOOD_INPUT_DATA = document.querySelectorAll('.modal-content input');
const ADD_FOOD_DATA = document.querySelector('.btn--success');
const CANCEL_FOOD_DATA = document.querySelector('.btn--passive');
const FOOD_CONTAINER = document.querySelector('.food-container');

let remainingCalories;
let consumedCalorieStorage = [];
let remainingCaloriesSet = false;

const clearInput = () => {
    for (const usrInput of USER_FOOD_INPUT_DATA) {
        usrInput.value = '';
      }
}
//SETS BACKDROP WHEN ADD FOOD MODAL IS VISIBLE
const setBackdrop = () => {
    BACKDROP.classList.add('visible');
}
//REMOVES BACKDROP WHEN ADD FOOD MODAL IS EXITED
const removeBackdrop = () => {
    BACKDROP.classList.remove('visible');
}
//ADDS ADD FOOD BTN 
const showAddFoodButton = () => {
    ADD_FOOD.style.display = 'block';
}
//ADDS FOOD MODAL TO SCREEN
const addFoodModal = () => {
    setBackdrop();
    FOOD_MODAL.classList.add('visible');
}
//REMVOES FOOD MODAL
const removeFoodModal = () => {
    removeBackdrop();
    FOOD_MODAL.classList.remove('visible');
    clearInput();

}

/*  SHOWS OR HIDES PROMT TO ENTER TOTAL CALORIES*/
const hideTotalCalorieInputForm = () => {
    INPUT_CALORIES_FORM.style.display = 'none';
}
const showEnteredTotalCalories = () => {
    INPUT_CALORIES_RESULT.style.display = 'flex';
}

const showEnteredFoodData = () => {
    FOOD_CONTAINER.style.display = 'flex';
}

/*SET TOTAL CALORIES BASED ON USER INPUT */
const setTotalCalories = () => {
    const baseCaloriesLower = 1400;
    const baseCaloriesUpper = 6000;
    let totalCalories;
    totalCalories = +TOTAL_CALORIES_INPUT.value;

    if(totalCalories >= 1400 && totalCalories <=6000){
        remainingCalories = totalCalories;
        return totalCalories
    }
    else if (totalCalories < 1400) {
        alert('Please up your calorie intake, a daily intake below 1400 calories is not healthy');
        remainingCalories = baseCaloriesLower;
        totalCalories = baseCaloriesLower;
        return totalCalories;
    }else {
        alert('Please decrease your calorie intake, a daily intake above 6000 calories is not healthy');
        remainingCalories = baseCaloriesUpper;
        totalCalories = baseCaloriesUpper;
        return totalCalories;
    }
}

/* RENDERS TOTAL CALORIES ON SCREEN */
const totalDailyCalories = () => {
    let totalCalories = +setTotalCalories();
    let totalCaloriesRender = document.createElement('div');
    totalCaloriesRender.className = 'calorie-display';
    totalCaloriesRender.innerHTML= `
    <h1>TOTAL CALORIES</h1>
    <div class="calorie-number">
        <h2>${totalCalories} cal/day</h2> 
    </div>`;

    INPUT_CALORIES_RESULT.appendChild(totalCaloriesRender);
}

const renderCalories = () =>{
    totalDailyCalories();
    showAddFoodButton();
    hideTotalCalorieInputForm();
    showEnteredTotalCalories();
}

//ADDS CONSUMED CALORIES TO ARRAY
const storeConsumedCalories = (consumedCalories) => {
    consumedCalorieStorage.push(consumedCalories);
}

//CALCULATE CONSUMED CALORIES BASED ON USER INPUT, RETURNS NUMBER AS VALUE
const getConsumedCalories = () => {
        let consumedCalories = USER_FOOD_INPUT_DATA[1].value * USER_FOOD_INPUT_DATA[2].value
        storeConsumedCalories(consumedCalories);
        return consumedCalories;
}

const setRemainingCalories = () => {
    let consumedCalories = getConsumedCalories();
    remainingCalories -= consumedCalories;
}

const renderRemainingCalories = () => {
    setRemainingCalories();
    if(remainingCaloriesSet === false){
    let remainingCaloriesRender = document.createElement('div');
    remainingCaloriesRender.className = 'calorie-display';
    remainingCaloriesRender.className = 'remaining';
    remainingCaloriesRender.innerHTML= `

    <h1>REMAINING CALORIES</h1>
    <div class="calorie-number">
    <h2>${remainingCalories} cal/day</h2> 
    </div>`;


    INPUT_CALORIES_RESULT.appendChild(remainingCaloriesRender);
    remainingCaloriesSet = true;
    }else if (remainingCaloriesSet === true){

        INPUT_CALORIES_RESULT.children[1].remove();
        let remainingCaloriesRender = document.createElement('div');
        remainingCaloriesRender.className = 'calorie-display';
        remainingCaloriesRender.className = 'remaining';
        remainingCaloriesRender.innerHTML= `
    
        <h1>REMAINING CALORIES</h1>
        <div class="calorie-number">
        <h2>${remainingCalories} cal/day</h2> 
        </div>`;
        INPUT_CALORIES_RESULT.appendChild(remainingCaloriesRender);

    }
    
}



const renderFoodData = () => {
    const foodName = USER_FOOD_INPUT_DATA[0].value;
    const servingSize = USER_FOOD_INPUT_DATA[1].value;
    const caloriesPerServing = USER_FOOD_INPUT_DATA[2].value;

    const foodList = document.getElementById('food-list');
    const foodListElement = document.createElement('li');

    foodListElement.className = "food-list-item";
    foodListElement.innerHTML = `<div class="food-list-content">
        <div class="food-name">
            <h1>${foodName}</h1>
        </div>
    <div class="sub-category">
        <h2>${servingSize} Servings</h2>
        <p>${caloriesPerServing} Calories</p>
    </div>
</div>`;


    foodList.appendChild(foodListElement);
    renderRemainingCalories();
    removeBackdrop();
    removeFoodModal();
    showEnteredFoodData();

    clearInput();

}




//EVENT HANDLERS
SUBMIT_CALORIES_BTN.addEventListener('click', renderCalories);
ADD_FOOD.addEventListener('click', addFoodModal);
BACKDROP.addEventListener('click', removeFoodModal);
CANCEL_FOOD_DATA.addEventListener('click', removeFoodModal);
ADD_FOOD_DATA.addEventListener('click', renderFoodData);