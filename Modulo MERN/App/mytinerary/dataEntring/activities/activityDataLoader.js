const fs = require('fs');

const ItineraryModel = require('../../models/schemaItinerary');
const CityModel = require('../../models/schemaCity');
const ActivityModel = require('../../models/schemaActivity');

require('../../server.js');

fs.readFile('itinerariesData.json', (err, data) => {
  if (err) console.log(err);
  const itineraries = JSON.parse(data);

  itineraries.forEach(async itinerary => {
    try {
      const city = await CityModel.findOne({
        city: itinerary.city
      });

      if (city) {
        const newItinerary = new ItineraryModel({
          title: itinerary.title,
          city: city._id,
          country: itinerary.country,
          user: itinerary.username,
          rating: Number(itinerary.rating),
          duration: itinerary.duration,
          total_price: itinerary.price,
          hashtag: itinerary.hashtag.split('#').slice(1)
        });
        await newItinerary.save();
        console.log('itinerary created ' + itinerary.title);
      } else {
        console.log(itinerary.city + ' not found');
        console.log(itinerary.title + ' not created');
      }
    } catch (err) {
      console.log(err);
    }
  });
});
