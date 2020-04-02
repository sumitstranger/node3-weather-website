const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/8105eeed5a44c7f587ae28185872e341/'+latitude+','+ longitude+'?units=si'
    //console.log(url);
    
    request({url, json: true},(error,{body})=>{
        if(error){
            callback("Unable to connect Internet", undefined)
        } else if(body.error){
            callback('Unable to find location', undefined);
            
        }else{
            const temphigh = body.daily.data[0].temperatureHigh
            const tempLow = body.daily.data[0].temperatureLow
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out.The high today is '+ temphigh +' with a low of '+ tempLow+ '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }

    })
}




module.exports = forecast