const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

const $weatherFormButton = weatherForm.querySelector('button')
const $sendlocationButton = document.querySelector('#send-location')

$sendlocationButton.addEventListener('click',(e)=>{
    if (!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }
    $sendlocationButton.setAttribute('disabled','disabled')
    $weatherFormButton.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
       
        const {latitude,longitude} = position.coords
        //console.log(latitude,longitude);
        
        e.preventDefault()
        //console.log(search.value);
        const location = search.value
        const url = '/gpsForecast?latitude='+latitude+'&longitude='+longitude
       
        fetch(url).then((response)=>{
         response.json().then((data)=>{
           
            $sendlocationButton.removeAttribute('disabled')
            $weatherFormButton.removeAttribute('disabled')
            
            //console.log(data);
            

            if(data.error){
                messageone.textContent = data.error
            }else{
                messageone.textContent =data.location
                messagetwo.textContent = data.forecast   
            }
        })
    
    })
        
    })
})

messageone.textContent = ''
messagetwo.textContent = ''
weatherForm.addEventListener('submit',(e)=>{
    messageone.textContent = 'Loading....'
    messagetwo.textContent = ''
    e.preventDefault()
    //console.log(search.value);
    const location = search.value
    const url = '/weather?address='+location
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