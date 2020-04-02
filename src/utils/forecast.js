const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/8105eeed5a44c7f587ae28185872e341/'+latitude+','+ longitude+'units=si'
    //console.log(url);
    
    request({url, json: true},(error,{body})=>{
        if(error){
            callback("Unable to connect Internet", undefined)
        } else if(body.error){
            callback('Unable to find location', undefined);
            
        }else{
    
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }

    })
}




module.exports = forecast