const dotenv = require('dotenv');

dotenv.config();

const environment = {
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  mongodbUri: process.env.MONGODB_URL,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  password:process.env.PASSWORD,
  weatherKey:process.env.WEATHER_KEY,
  mapsKey:process.env.MAPS_KEY
}

module.exports = environment;