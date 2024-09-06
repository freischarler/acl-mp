import  EventPrice  from '../models/event_price.js';
import  ApiError from '../utils/ApiError.js';

class EventPriceService {
  async createEventPrice(eventPriceData) {
    return EventPrice.create(eventPriceData);
  }

  async getEventPriceById(eventPriceId) {
    const eventPrice = await EventPrice.findByPk(eventPriceId);
    if (!eventPrice) {
      throw new ApiError(404, 'EventPrice not found');
    }
    return eventPrice;
  }

  async getEventPriceByEventId(eventId) {
    const eventPrice = await EventPrice.findAll({
      where: {
        event_id: eventId
      }
    });
    if (!eventPrice) {
      throw new ApiError(404, 'EventPrice not found');
    }
    return eventPrice;
  }

  async getAllEventPrices() {
    return EventPrice.findAll();
  }

  async updateEventPrice(eventPriceId, eventPriceData) {
    const eventPrice = await EventPrice.findByPk(eventPriceId);
    if (!eventPrice) {
      throw new ApiError(404, 'EventPrice not found');
    }
    await eventPrice.update(eventPriceData);
    return eventPrice;
  }

  async deleteEventPrice(eventPriceId) {
    const eventPrice = await EventPrice.findByPk(eventPriceId);
    if (!eventPrice) {
      throw new ApiError(404, 'EventPrice not found');
    }
    await eventPrice.destroy();
    return eventPrice;
  }
}

export default new EventPriceService();
