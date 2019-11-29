require('../../server.js');
const fs = require('fs');
const CityModel = require('../../models/schemaCity');

fs.readFile('citiesData.json', (err, data) => {
  if (err) console.log(err);

  const cities = JSON.parse(data);

  cities.forEach(async city => {
    try {
      const newCity = new CityModel({
        city: city.name,
        country: city.country,
        img: city.img
      });
      await newCity.save();
      console.log('City added');
    } catch (err) {
      console.log('city not added ' + city);
      console.log(err);
    }
  });
});
