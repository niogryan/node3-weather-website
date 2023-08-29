
const request =  require('request')

const geocodeData = {
    latitude: undefined,
    longtitude: undefined,
    location: undefined,
}
           
const geocode = (area,  callback) => {
    const url_geocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(area)+'.json?access_token=pk.eyJ1Ijoicnlhbm5pb2c4OCIsImEiOiJjbGw3aGt3c3Uwd2JoM2VtemFwaHo2bGJxIn0.xlGjaZTxtg6Uiv4-eZ2L1w&limit=1';
    
    request({ url: url_geocoding, json:true }, (error,{body}) => {
        try{
            if (error){
                callback('Unable to connect to geocode service',undefined);
            }
            else if (body.features.length === 0){
                 callback('Opps something went wrong',undefined);
            }
            else{
                const coordinates = body.features[0]['center']
                geocodeData.latitude =  coordinates[0]
                geocodeData.longtitude = coordinates[1]
                geocodeData.location = body.features[0].place_name
                
                callback(undefined,geocodeData);
            }     
        }
        catch (e){
            callback("An error occurred:"+ e.message,undefined);
        }   
    })
}

module.exports = geocode