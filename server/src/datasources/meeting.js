const { meetingModel } = require('../models');

const { environment } = require('../config');

class MeetingDataSource {
  addMeeting = async (owner, { name }) => {
    const meetingLink = `${environment.frontendUrl}/${Math.random()}`;

    const add = await meetingModel.create({
      name,
      owner,
      meetingLink,
      passCode: Math.random() * 1000,
    });

    return {
      data: add,
      message: 'Meeting saved successfully',
    };
  };

  deleteMeeting = async (owner, meetingId) => {
    await meetingModel.deleteOne({
      $and: [{ _id: meetingId }, { owner }],
    });

    return {
      message: 'Deleted Successfully',
      meetingId
    };
  };

  getMeeting = async (meetingId) => {
    const find = await meetingModel.findById(meetingId);

    if (!find) {
      return {
        error: 'Meeting not found',
      };
    }

    return { data: find };
  };

  getMeetings = async (owner) => {
    const find = await meetingModel.find({ owner });

    return find;
  };
}

module.exports = new MeetingDataSource();
