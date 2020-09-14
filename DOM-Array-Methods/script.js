const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = []

getRandomUser()
getRandomUser()
getRandomUser()

function doubleMoney() {
  data = data.map(user => {
    return {...user, money: user.money * 2}
  })

  updateDOM()
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money)
  updateDOM()
}

function showMillionaires() {
  data = data.filter(user => user.money > 1000000)
  updateDOM()
}

function calculateWealth() {
  const wealth = data.reduce((acc, user) => {
    return acc += user.money
  }, 0)
  console.log(wealth)
  const wealthEl = document.createElement('div')
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
  main.appendChild(wealthEl)
}

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()

  const user = data.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  addData(newUser)
}

function addData(obj) {
  data.push(obj)
  updateDOM()
}

function updateDOM(provideData = data) {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`

  provideData.forEach(item => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
    main.appendChild(element)
  })
}

function formatMoney(number) {
  return '$' + Number(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', calculateWealth)


