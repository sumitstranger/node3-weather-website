const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
messageone.textContent = ''
messagetwo.textContent = ''
weatherForm.addEventListener('submit',(e)=>{
    messageone.textContent = 'Loading....'
    messagetwo.textContent = ''
    e.preventDefault()
    //console.log(search.value);
    const location = search.value
    const url = 'http://localhost:3000/weather?address='+location
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent = data.error
        }else{
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast   
        }
    })

})
    
})