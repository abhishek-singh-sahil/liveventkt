const mongoose = require('mongoose')
const eventModel = require('../Models/event')

const createEvent = async (req, res) => {
  try {
    const event = await eventModel.create(req.body)

    return res
      .status(201)
      .json({ message: 'Event is created successfully', event })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Event is not created', error: error.message })
  }
}
const showEvent = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' }; // case-insensitive
    }

    const events = await eventModel.find(query);
    return res.status(200).json({ events })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
const showEventById = async (req, res) => {
  try {
    const event = await eventModel.findById(req.params.id)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    return res.status(200).json({ event })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}


const updateEventbyId = async (req, res) => {
  try {
    const updatedEvent = await eventModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found !!' })
    }

    return res
      .status(200)
      .json({ message: 'The event is updated', updatedEvent })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const deleteEventbyId = async (req, res) => {
  try {
    const deletedEvent = await eventModel.findByIdAndDelete(req.params.id)

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found !!' })
    }

    return res.status(200).json({
      message: 'This event is no more existing here from now: ',
      deletedEvent
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  deleteEventbyId,
  updateEventbyId,
  createEvent,
  showEventById,
  showEvent
}
