const Event = require('../models/eventModel');
const AppError = require('../utils/appError');

// Get all events
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      status: 'success',
      results: events.length,
      data: {
        events
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single event
const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(new AppError(404, 'No event found with that ID'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        event
      }
    });
  } catch (error) {
    next(error);
  }
};

// Create new event
const createEvent = async (req, res, next) => {
  console.log("createEvent ********* ");

  try {
    const newEvent = await Event.create(req.body);

    console.log("req.body --> ", req.body);

    res.status(201).json({
      status: 'success',
      data: {
        event: newEvent
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update event
const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!event) {
      return next(new AppError(404, 'No event found with that ID'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        event
      }
    });
  } catch (error) {
    next(error);
  }
};

// Delete event
const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return next(new AppError(404, 'No event found with that ID'));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
}