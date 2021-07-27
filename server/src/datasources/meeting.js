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

  deleteMeeting = async (owner, meetingId) => {
    const remove = await meetingModel.findOneAndDelete(
      {
        $and: [{ _id: meetingId }, { owner }],
      },
      { new: true }
    );

    return remove;
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
}

module.exports = new MeetingDataSource();
