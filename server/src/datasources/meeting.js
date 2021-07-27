const { meetingModel } = require('../models');

const { environment } = require('../config');

class MeetingDataSource {
  addMeeting = async (owner, { name }) => {
    const meetingLink = `${environment.frontendUrl}/${Math.random()}`;

    const add = await meetingModel.create({ name, owner, meetingLink });

    return {
      data: add,
      message: 'Meeting saved successfully',
    };
  };
}

module.exports = new MeetingDataSource();
