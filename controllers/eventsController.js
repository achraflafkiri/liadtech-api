const Event = require('../models/eventModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Get all events
const getAllEvents = catchAsync(async (req, res, next) => {
  const events = await Event.find();

  res.status(200).json({
    status: 'success',
    results: events.length,
    data: {
      events
    }
  });
});

// Get single event
const getEvent = catchAsync(async (req, res, next) => {
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
});

// Create new event
const createEvent = catchAsync(async (req, res, next) => {
  // console.log("createEvent ********* ");

  const newEvent = await Event.create(req.body);

    console.log("req.body --> ", req.body);

    res.status(201).json({
      status: 'success',
      data: {
        event: newEvent
      }
    });
});

// Update event
const updateEvent = catchAsync(async (req, res, next) => {
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
});

// Delete event
const deleteEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(new AppError(404, 'No event found with that ID'));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
}