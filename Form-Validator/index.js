const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmPassword')



form.addEventListener('submit',function(e){
  e.preventDefault()
  console.log('submit')
})