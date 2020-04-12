const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')

const publicDir = path.join(__dirname,'../public');
const viewPath =path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
const port = process.env.PORT || 3000

hbs.registerPartials(partialPath)

app.set('view engine', 'hbs')
app.set('views',viewPath)
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Sumit Rathore'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About ME',
        name: 'Sumit Rathore'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        msg: 'Random Help Page',
        name: 'Sumit Rathore'
    })
})

const request = require('request')
const {geocode,geocodeReverse} = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.get('/gpsForecast',(req,res)=>{

    const latitude = req.query.latitude
    const longitude = req.query.longitude

    console.log(latitude,longitude);
    geocodeReverse(longitude,latitude, (error,{location}={})=>{
        if(error){ 
            return res.send({
            error: 'Unable to get location'
        })
        }
    console.log(location);
    
    forecast(latitude, longitude , (error,Forecastdata)=>{
        if(error){
            return res.send({
                error: 'Unable to get temp data'
            })
        }
        console.log('Data: ',Forecastdata);
        
    res.send({
        forecast: Forecastdata,
        location

    })

    })
})
})


app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'Please provide address'
        })
    }
    
    const address = req.query.address
    
    geocode(address,(error,{latitude,longitude,location}={})=>{
    if(error){ 
        return res.send({
        error: 'Unable to get location'
    })
    }



    forecast(latitude, longitude , (error,Forecastdata)=>{
        if(error){
            return res.send({
                error: 'Unable to get temp data'
            })
        }
        console.log(('Data: ',location));
        console.log('Data: ',Forecastdata);
        
    res.send({
        forecast: Forecastdata,
        location: location,
        address: address
    })

    })

    })
    

})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errormsg: 'Help Page not found',
        name: 'Sumit'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errormsg: 'Page not found',
        name: 'Sumit'
    })
})
app.listen(port,()=>{
    console.log("Server is running on "+port)
})
