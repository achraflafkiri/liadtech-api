const express = require('express');
const { getAllEvents, createEvent, getEvent, updateEvent, deleteEvent } = require('../controllers/eventsController');
const router = express.Router();

router
  .route('/')
  .get(getAllEvents)
  .post(createEvent);

router
  .route('/:id')
  .get(getEvent)
  .put(updateEvent)
  .delete(deleteEvent);

module.exports = router;