const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic3VtaXRzdHJhbmdlciIsImEiOiJjazhlZTEyZmwwNzBrM3FwbDY4c2Qyemw1In0.GIT1XzvywMiT7GzqdW91Rw&limit=1'

    request({url, json: true},(error,{body})=>{
        if (error){
            callback('Unable to connect the server', undefined)
        }else if (body.features.length ==0){
            callback('Unable to find location, try something new', undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1] ,
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

const geocodeReverse = (longitude,latitude,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(longitude)+','+encodeURIComponent(latitude) +'.json?access_token=pk.eyJ1Ijoic3VtaXRzdHJhbmdlciIsImEiOiJjazhlZTEyZmwwNzBrM3FwbDY4c2Qyemw1In0.GIT1XzvywMiT7GzqdW91Rw&limit=1'
   // console.log(url);
    
    request({url, json: true},(error,{body})=>{
        if (error){
            callback('Unable to connect the server', undefined)
        }else if (body.features.length ==0){
            callback('Unable to find location, try something new', undefined)
        }else{
            callback(undefined,{
                location: body.features[0].place_name
            })
        }
    })

}


module.exports = {
    geocode,
    geocodeReverse
}