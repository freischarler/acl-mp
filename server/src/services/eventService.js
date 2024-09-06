import  Event  from '../models/event.js';
import  ApiError from '../utils/ApiError.js';
import { Op } from 'sequelize';

class EventService {
  async createEvent(eventData) {
    return Event.create(eventData);
  }

  async getEventById(eventId) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new ApiError(404, 'Event not found');
    }
    return event;
  }

  async getEventsByIds(eventIds) {
    return await Event.findAll({
      where: { event_id: eventIds }
    });
  }

  async getEventsByYear(year) {
    const startDate = new Date(`${year}-01-01T00:00:00Z`);
    const endDate = new Date(`${year}-12-31T23:59:59Z`);
    
    return await Event.findAll({
      where: {
        start_date: {
          [Op.between]: [startDate, endDate]
        }
      }
    });
  }


  async getAllEvents() {
    return Event.findAll();
  }
  
  async getEventsByUserId(userId) {
    return await Event.findAll({
      where: { user_id: userId },
      group: ['event_id'], // Group by event_id to get distinct events
    });
  }
  
  async updateEvent(eventId, eventData) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new ApiError(404, 'Event not found');
    }
    await event.update(eventData);
    return event;
  }

  async deleteEvent(eventId) {
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new ApiError(404, 'Event not found');
    }
    await event.destroy();
    return event;
  }
}

export default new EventService();
