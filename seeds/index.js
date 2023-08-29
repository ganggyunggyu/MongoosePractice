/** @format */

const mongoose = require('mongoose');
const CampGround = require('../models/CampGround');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

main()
  .then(() => {
    console.log('GOOD!');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/camppingApp');
}

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
const samplePrice = (price) => {
  return price.replace(/\d{3}원$/, '000');
};

const seedDB = async () => {
  await CampGround.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * 15);
    const randomWon =
      Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;
    const camp = new CampGround({
      location: `${cities[random]['state']} ${cities[random]['city']}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      price: `${samplePrice(randomWon.toString())}`,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
