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

// 🔥 UPGRADED: Added Pagination & Sorting Logic
const showEvent = async (req, res) => {
  try {
    const { search } = req.query;
    
    // 1. Setup Pagination Variables (Defaults: Page 1, 8 Items)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    // 2. Build the Search Query
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' }; // case-insensitive
    }

    // 3. Fetch the exact chunk of events + Total Count in parallel for performance
    const [events, totalEvents] = await Promise.all([
      eventModel.find(query)
        .sort({ createdAt: -1 }) // Show newest events first
        .skip(skip)
        .limit(limit),
      eventModel.countDocuments(query)
    ]);

    // 4. Send back the structured payload the frontend expects
    return res.status(200).json({ 
      events,
      currentPage: page,
      totalPages: Math.ceil(totalEvents / limit),
      hasMore: page * limit < totalEvents // Tells frontend if a "Load More" button is needed
    })

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