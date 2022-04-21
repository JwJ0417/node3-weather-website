const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=2c6980cd9990521320b7af05b1229622&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(body.error){
            callback('Unable to find current weather. Try another search',undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + 'degrees out. ' + 'It feels like ' + body.current.feelslike + 'degrees out.')
        }
    })
}




module.exports = forecast