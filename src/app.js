// npm i express@4.16.4 to download expresss
const path = require('path')
const express = require('express')
const hbs = require('hbs') //we need this for partials

console.log(__dirname)
console.log(path.join(__dirname, '../public')) //set the path to the directory
//we are going to start server up
const app = express()

const port = process.env.PORT || 3000 // This is set port for heroku

const publicDirectoryPath = path.join(__dirname, '../public')
//partials allows us to create a little template, which is part of a bigger Web page
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Setup handlebars engine and views location 
app.set('view engine', 'hbs') //allows you to set a value for a given express setting, 1argument =key, 2argument  = value 
// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath))) //this is way to customize the server
//static means that the assets are static. static not change.
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App', // can give object property also
        name: 'Wonjun Jo'
    }) //render allows us to render one of our views we've configured express to use the view engine HBS
})             //render we can render one of our handlebars templates

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Wonjun Jo'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        note: 'May I help you sir???',
        name:'Wonjun Jo'
    })
})

//Define paths for express config
//views folder is default direction of the hbs
const viewsPath = path.join(__dirname, '../templates/views') //if you want to set the dicrection of folder
app.set('views', viewsPath)
const partialsPath = path.join(__dirname, '../templates/partials')
//registerPartials takes a path to the directory where my partials live
hbs.registerPartials(partialsPath)





//app.com root url
//req request res response
//this line allow to send something back to requester
//this is what's going to disply in the browser window
//will have two argument one for page url and function 
// we are going to make these pages

//app.com/help
// app.get('/help', (req, res) => {
//     res.send([{    //we can also user JSON code here
//         name: 'Wonjun'
//     },{
//         name: 'Sarah'
//     }
//     ])
// })
//app.com/about
// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>') //able to use HTML code also
// })
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} /*set defualt*/)=> {
        if(error){
            return res.send({error: error})
        }
        forecast(latitude, longitude, (error, ForecastData)=> {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: ForecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'rainning',
    //     location: 'boston',
    //     address: req.query.address
    // })
})
app.get('/products', (req, res) => {
    if(!req.query.search) { //if it's false
        return res.send({
            error: 'You must provide a search term'
        })
    }// else {

    // }
    console.log(req.query.search) //query string that was provided along with the request has been passed by Express and the data
    res.send({// information about that query string that lives on request
        Products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Wonjun Jo',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => { //* means match anything that hasn't been matched so far.
    res.render('404', {
        title: '404',
        name: 'Wonjun Jo',
        errorMessage: 'Page not found.'
    })
}) 
app.listen(port, () => {
    console.log('Server is up on port ' + port)
}) //Listen on a specific port for the moment. display app.js in localhost:3000