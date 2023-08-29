
const path =  require('path')
const express = require('express')
const hbs = require('hbs')
const app =  express()

const request =  require('request')
const geocode =  require('./utils/geocode')
const forecast = require('./utils/forecast')


//Define paths for Express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req,res) => {
    res.render('index',{
        title: 'Home',
        version: '1.2.0'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        animal: 'bird',
        version: '1.2.0'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'help meeee',
        version: '1.2.0'
    })
})

app.get('/help/*', (req,res) => {
    res.render('error',{
        title: 'Oops! Something went wrong.',
        message: 'We\'re sorry, but it seems that there was an error while processing your request. Please try again later.'
    })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
         });
    }

    console.log(req.query.search)
    res.send({
        prodcuts: []
    })

    
})


app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide a search term'
         });
    }
    let area = req.query.address
    geocode(area , (error,{latitude,longtitude,location} = {})=>{
         if (error){
            return res.send({ error });
         }
         else{
             forecast(longtitude, latitude, (error, {temperature,feelslike,weatherDescriptions} = {}) => {
                if (error){
                    return res.send({error});
                 }
                 else{
                   
                    res.send({
                        Location:location,
                        Latitude:latitude,
                        Longtitude:longtitude,
                        Forecast:'It is currently '+temperature+' degrees. It feels like '+feelslike+' degrees out. Today will be '+weatherDescriptions
                    })
                 }
                 
                
             })
         }
     })

    // res.render('weather',{
    //     address:req.query.address,
    // })
})

app.get('*', (req,res) => {
    res.render('error',{
        title: 'Oops! Page not found.',
        message: 'The page you are looking for might have been removed or is temporarily unavailable.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})