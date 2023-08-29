const request =  require('request')

const forecastdata = {
    temperature: undefined,
    feelsLike: undefined,
    weatherDescriptions: undefined
}

const forecast = (latitude,longtitude,callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=f14483568aded0fc8b689626b3b6f6b2&query='+latitude+','+longtitude+'&units=m'
   
    request({ url: url, json:true }, (error,{body}) => {
        if (error){
            callback(error.message,undefined);
        }else if (body.success === false){
            callback('Unable to find location',undefined);
        }
        else{
            const data = body.current
            forecastdata.temperature=data.temperature
            forecastdata.feelsLike=data.feelslike
            forecastdata.weatherDescriptions=data.weather_descriptions
            callback(undefined,forecastdata)
            
        }
    })
}

module.exports = forecast