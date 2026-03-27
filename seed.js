const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hotel = require('./models/Hotel');
const hotelsData = require('./data/hotels');
const connectDB = require('./config/db');

dotenv.config();

const seedHotels = async () => {
  try {
    await connectDB();

    // Clear existing hotels
    await Hotel.deleteMany({});
    console.log('🗑️  Cleared existing hotels');

    // Insert seed data
    const createdHotels = await Hotel.insertMany(hotelsData);
    console.log(`✅ Seeded ${createdHotels.length} Mumbai hotels successfully!`);

    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedHotels();
