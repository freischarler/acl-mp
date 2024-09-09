import ageService from '../services/ageService.js';
import categoryService from '../services/categoryService.js';
import eventParametersService from '../services/eventParametersService.js';
import eventService from '../services/eventService.js';
import genderService from '../services/genderService.js';
import weightService from '../services/weightService.js';

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

  /*async getEventParametersById(req, res, next) {
    try {
      const eventParameters = await eventParametersService.getEventParametersById(req.params.id);
      if (!eventParameters) {
        return res.status(404).json({ message: 'Event parameters not found' });
      }
      res.status(200).json(eventParameters);
    } catch (error) {
      console.log('Error fetching event parameters by ID:', error);
      next(error);
    }
  }*/

  async getAllEventParameters(req, res, next) {
    try {
      const eventParameterss = await eventParametersService.getAllEventParameterss();
      res.status(200).json(eventParameterss);
    } catch (error) {
      next(error);
    }
  }

  async getParameters(req, res, next) {
    // We need to get the parameters from the eventParameters table
    // Parameters are categories, genders, weights, ages
    try {
      const events = await eventService.getAllEvents();
      const categories = await categoryService.getAllCategories();
      const genders = await genderService.getAllGenders();
      const weights = await weightService.getAllWeights();
      const ages = await ageService.getAllAges();
      
      res.status(200).json({ events, categories, genders, weights, ages });
    } catch (error) {
      console.log('Error fetching event parameters:', error);
      next(error);
    }
  }

  async updateEventParameters(req, res, next) {
    try {
      const eventParameters = await eventParametersService.updateEventParameters(req.params.id, req.body);
      res.status(200).json(eventParameters);
    } catch (error) {
      console.log('Error updating event parameters:', error);
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
