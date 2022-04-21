//console.log('Client side javascript file is loaded!')
//

// this is the function, call the url and show in client side.


const weatherForm = document.querySelector('form') //we are going to use form
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') //if you want to use id as a location put #  
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            messageOne.textContent = data.error
        }else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})