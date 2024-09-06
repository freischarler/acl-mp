import eventParametersService from '../services/eventParametersService.js';

class EventParametersController {
  async createEventParameters(req, res, next) {
    try {
      const eventParameters = await eventParametersService.createEventParameters(req.body);
      res.status(201).json(eventParameters);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  async getEventParametersById(req, res, next) {
    try {
      const eventParameters = await eventParametersService.getEventParametersById(req.params.id);
      res.status(200).json(eventParameters);
    } catch (error) {
      next(error);
    }
  }

  async getAllEventParameterss(req, res, next) {
    try {
      const eventParameterss = await eventParametersService.getAllEventParameterss();
      res.status(200).json(eventParameterss);
    } catch (error) {
      next(error);
    }
  }

  async updateEventParameters(req, res, next) {
    try {
      const eventParameters = await eventParametersService.updateEventParameters(req.params.id, req.body);
      res.status(200).json(eventParameters);
    } catch (error) {
      next(error);
    }
  }

  async deleteEventParameters(req, res, next) {
    try {
      await eventParametersService.deleteEventParameters(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getEventParametersByEvents(req, res, next) {
    try {
      const events = await eventParametersService.getEventParametersByEvents(req.params.id);
      res.status(200).json(events);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}

export default new EventParametersController();
