'use strict';
// Global variables

const apiKey = 'ad90dc536d4b4fa3b7870e7a862dffe7';
const searchURL = 'https://api.spoonacular.com/recipes/search'

// Takes recipe object and formats into proper string
// What happens for multiple values in same parameter

function formatRecipes() {
    console.log('formatRecipes ran');
  
}

// Puts parameters into object
// Calls formatRecipes to insert parameters into properly formatted string
// puts query string into proper URL
// Calls first fetch function to get random recipe response

function getRecipes(cuisine, diet, intolerances) {
    const params = {
        q: query,
        cuisine: cuisine,
        diet: diet,
        intolerances: intolerances
    }

    const queryString = formatRecipes(params);
    const url = searchURL + '?' + queryString;


    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getRecipeInstructions() {
    // Add event listener for click on desired recipe (move to the beginning - right when page loads)
   // Second fetch (whole code block a second)
   // Change name of displayResults and call separate function

}

// Event listener for desired recipe
// On click ('ul') li etc


// watch form or watch forms?
// getRecipes
function watchForm() {
    console.log('watchform ran');
    $('form').submit(event => {
        const cuisine = $('#cuisine').val();
        const diet = $('#diet').val();
        const intolerances = $('#intolerances').val();
    });
}

$(watchForm);