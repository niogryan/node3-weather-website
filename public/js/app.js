


const weatherForm = document.querySelector('form')
const search = document.querySelector('input[name="location"]')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
            }
            else{
                console.log(data)
                messageOne.textContent='latitude:'+data.Latitude+' longtitude:'+data.Longtitude
                messageTwo.textContent=data.Forecast
            }
        })
    })
})