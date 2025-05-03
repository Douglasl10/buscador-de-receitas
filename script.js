const form = document.querySelector('.search-form');
const recipeList = document.querySelector('.recipe-list');
const recipeDetails = document.querySelector('.recipe-details');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputValue = event.target[0].value;

    searchRecipe(inputValue)

})


async function searchRecipe(ingredient) {
    recipeList.innerHTML = `<h2>Loading...</h2>`;
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        const data = await response.json();

        showRecipe(data.meals);
    } catch (error) {
        recipeList.innerHTML = `<h2>No recipe found</h2>`;
    }
}

    function showRecipe(recipes) {

        recipeList.innerHTML = recipes.map(item => `

        <div class="recipe-card" onClick="getRecipeDetails(${item.idMeal})">
        <img src="${item.strMealThumb}" alt="recipe-image">
        <h3>${item.strMeal}</h3>
        </div>
        `
        ).join('');
    }

    async function getRecipeDetails(id) {

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

        const data = await response.json();
        const recipe = data.meals[0];

        let ingredients = '';

        for (let i = 1; i <= 20; i++) {
            if (recipe[`strIngredient${i}`]) {
                ingredients += `<li>${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}</li>`
            } else {
                break;

            }
        }

        recipeDetails.innerHTML = `
    <h2>${recipe.strMeal}</h2>
    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-image">
    <h3>Categories: ${recipe.strCategory}</h3>
    <h3>Origim: ${recipe.strArea}</h3>
    <h3>ingredients:</h3>
    <ul>${ingredients}</ul>
    <h3>Instructions:</h3>
    <p>${recipe.strInstructions}</p>
    <p>Tags:${recipe.strTags}</p>
    <p>Video: <a href="${recipe.strYoutube}" target="_blank">Assista no Youtube<a/></p>
    `
    }


