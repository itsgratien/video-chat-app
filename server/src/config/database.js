const mongoose = require('mongoose');

const { config } = require('dotenv');

const environment = require('./environment');

config();

module.exports = async () => {
  try {
    await mongoose.connect(environment.databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  } catch (error) {
    throw error;
  }
};
