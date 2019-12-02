'use strict';
// Global variables

const apiKey = 'ad90dc536d4b4fa3b7870e7a862dffe7';
const searchURL = 'https://api.spoonacular.com/recipes/complexSearch'

// Open new window with recipe link

function displayDetailedRecipe(responseRecipe) {
    console.log('recipe displayed');
    window.open(`${responseRecipe.sourceUrl}`,"_blank");

}


function getRecipeInstructions(recipeId) {
    console.log('got recipe');
    const recipeDetailURL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=ad90dc536d4b4fa3b7870e7a862dffe7`;
    console.log(recipeDetailURL);
    
    fetch(recipeDetailURL)
        .then (response => {
            if(response.ok) {
            return response.json();
            }
            throw new Error(response.statusText);
        })
        .then (responseRecipe => displayDetailedRecipe(responseRecipe))
        .catch(err => {
            console.log(err);
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
            });
        }



    


// get item ID
function getItemIdfromElement(item) {
    console.log('got id');
    return $(item).closest('li').data('item-id');
    console.log(item);
}


function watchRecipeClick() {
    console.log('watchRecipeClick ran');
    $('#results-list').on('click','.recipe-instructions',
    event => {
        console.log('button clicked');
        const recipeId = getItemIdfromElement(event.currentTarget);
        getRecipeInstructions(recipeId);
        console.log(recipeId);
    });
}

// Loop through results and append them to the UL in results section
// fetch URLs for recipes in separate endpoint

function displayRecipeOptions(responseJson) {
    console.log('displayRecipeOptions ran');
    console.log(responseJson)
    $('#results-list').empty();
    for (let i = 0; i < responseJson.results.length; i++) {
        $('#results-list').append(
            `<li class="result-item" data-item-id="${responseJson.results[i].id}">
           <img src="${responseJson.results[i].image}" class="results-img">
            <p>${responseJson.results[i].title}</p>
           <button type = "button" id="${responseJson.results[i].id}" class="recipe-instructions"> See this recipe </button>
        </li>`
        )
    };
    $('#results').removeClass('hidden');

    // Fetch URLs


}

// Takes recipe object and formats into proper string
// What happens for multiple values in same parameter


function formatIntolerances(intolerances) {
    console.log('formatRecipes ran');
    const intolerancesParam = intolerances.map((int,i) => 
        `intolerances=${intolerances[i]}`);
        return intolerancesParam.join('&');
        console.log(intolerancesParam);
}

// Puts parameters into object
// Calls formatRecipes to insert parameters into properly formatted string
// puts query string into proper URL
// Calls first fetch function to get random recipe response

function getRecipes(cuisine, diet, intolerances) {
    

    const queryString = formatIntolerances(intolerances);

    const aggregatedString = `?cuisine=${cuisine}&diet=${diet}&` + queryString;
    const url = searchURL + aggregatedString + `&number=3&apiKey=${apiKey}`;
    console.log(url);


    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayRecipeOptions(responseJson))
    .catch(err => {
        console.log(err);
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
    $('#results').removeClass('hidden');
}



// First event listener function that checks for form inputs
// Pulls out form values
// Calls getRecipes function which calls the recipes endpoint

function watchForm() {
    console.log('watchform ran');
    $('form').submit(event => {
        event.preventDefault();
        const cuisine = $('#cuisine').val();
        const diet = $('#diet').val();
        const intolerances = $('#intolerances').val();
        getRecipes(cuisine, diet, intolerances);
    });
}

// Event listeners to start app
function makeRecipes() {
    watchForm();
    watchRecipeClick();
}

$(makeRecipes);

