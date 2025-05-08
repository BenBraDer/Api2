const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const mealsContainer = document.getElementById('meals-container');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    fetchMeals(query);
  }
});

function fetchMeals(query) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((data) => {
      displayMeals(data.meals);
    })
    .catch((error) => {
      console.error('Feil ved henting av måltider:', error);
    });
}

function displayMeals(meals) {
  mealsContainer.innerHTML = '';
  if (meals) {
    meals.forEach((meal) => {
      const mealDiv = document.createElement('div');
      mealDiv.classList.add('meal');
      mealDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h3>${meal.strMeal}</h3>
        <p><strong>Opprinnelse:</strong> ${meal.strArea}</p>
        <p><strong>Kategori:</strong> ${meal.strCategory}</p>
      `;
      mealsContainer.appendChild(mealDiv);
    });
  } else {
    mealsContainer.innerHTML = '<p>Ingen måltider funnet.</p>';
  }
}
