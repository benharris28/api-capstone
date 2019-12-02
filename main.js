'use strict';
// Global variables

const apiKey = 'ad90dc536d4b4fa3b7870e7a862dffe7';
const searchURL = 'https://api.spoonacular.com/recipes/complexSearch'

// Wait for click on "see this recipe"
// Run new fetch function to recipe endpoint
// Display recipe results in links

function getRecipeInstructions(recipeId) {
    console.log('got recipe');
}

function getItemIdfromElement(item) {
    console.log('got id');
}

function watchRecipeClick() {
    console.log('watchRecipeClick ran');
    $('#results-list').on('click','.recipe-instructions',
    event => {
        console.log('button clicked');
        const recipeId = getItemIdfromElement(event.currentTarget);
        getRecipeInstructions(recipeId);
    })
}
// Loop through results and append them to the UL in results section
function displayRecipeOptions(responseJson) {
    console.log('displayRecipeOptions ran');
    console.log(responseJson)
    $('#results-list').empty();
    for (let i = 0; i < responseJson.results.length; i++) {
        $('#results-list').append(
            `<li class="result-item">
           <img src="${responseJson.results[i].image}" class="results-img">
            <p>${responseJson.results[i].title}</p>
           <button type = "button" id="${responseJson.results[i].id}" class="recipe-instructions"> See this recipe </button>
        </li>`
        )
    };
    $('#results').removeClass('hidden');
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
        event.preventDefault();
        const cuisine = $('#cuisine').val();
        const diet = $('#diet').val();
        const intolerances = $('#intolerances').val();
        getRecipes(cuisine, diet, intolerances);
    });
}

$(watchForm);