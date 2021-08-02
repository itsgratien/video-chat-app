const userModel = require('./user');

const meetingModel = require('./meeting');

const callModel = require('./call');

module.exports = {
  userModel,
  meetingModel,
  callModel: callModel.model,
};
