import eventPriceService from '../services/eventPriceService.js';

class EventPriceController {
  async createEventPrice(req, res, next) {
    try {
      const eventPrice = await eventPriceService.createEventPrice(req.body);
      res.status(201).json(eventPrice);
    } catch (error) {
      //console.log(error)
      next(error);
    }
  }

  async getEventPriceById(req, res, next) {
    try {
      const eventPrice = await eventPriceService.getEventPriceById(req.params.id);
      res.status(200).json(eventPrice);
    } catch (error) {
      next(error);
    }
  }

  async getEventPriceByEventId(req, res, next) {
    try {
      const eventPrice = await eventPriceService.getEventPriceByEventId(req.params.id);
      res.status(200).json(eventPrice);
    } catch (error) {
      next(error);
    }
  }

  async getAllEventPrices(req, res, next) {
    try {
      const eventPrices = await eventPriceService.getAllEventPrices();
      res.status(200).json(eventPrices);
    } catch (error) {
      next(error);
    }
  }

  async updateEventPrice(req, res, next) {
    try {
      const eventPrice = await eventPriceService.updateEventPrice(req.params.id, req.body);
      res.status(200).json(eventPrice);
    } catch (error) {
      next(error);
    }
  }

  async deleteEventPrice(req, res, next) {
    try {
      await eventPriceService.deleteEventPrice(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new EventPriceController();
