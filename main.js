function getRecipes() {
    

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
