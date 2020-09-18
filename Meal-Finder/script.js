const search = document.getElementById('search')
const submit = document.getElementById('submit')
const mealsEl = document.getElementById('meals')
const random = document.getElementById('random')
const resultHeading = document.getElementById('result-heading')
const single_mealEl = document.getElementById('single-meal')

function searchMeal(e) {
  e.preventDefault()

  single_mealEl.innerHTML = ''

  const term = search.value

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`
        } else {
          mealsEl.innerHTML = data.meals.map(meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `).join('')
        }
      })

    search.value = ''
  } else {
    alert('Please enter a search term')
  }

}


submit.addEventListener('submit', searchMeal)