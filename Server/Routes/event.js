const express = require('express')
const Router = express.Router()
const { protect, admin } = require('../Middleware/auth')
const {
  deleteEventbyId,
  updateEventbyId,
  createEvent,
  showEventById,
  showEvent
} = require('../Controllers/eventControler')

Router.get('/allevent', showEvent)

Router.get('/:id', showEventById)

Router.post('/createevent', protect, admin, createEvent)

Router.put('/:id/update', protect, admin, updateEventbyId)

Router.delete('/:id/delete', protect, admin, deleteEventbyId)

module.exports = Router