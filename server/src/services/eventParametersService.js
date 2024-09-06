import   EventParameters  from '../models/eventParameters.js';
import  ApiError from '../utils/ApiError.js';

class EventParametersService {
  async createEventParameters(eventParametersData) {
    return EventParameters.create(eventParametersData);
  }

  async getEventParametersById(eventParametersId) {
    const eventParameters = await EventParameters.findByPk(eventParametersId);
    if (!eventParameters) {
      throw new ApiError(404, 'EventParameters not found');
    }
    return eventParameters;
  }

  async getEventParametersByEvents(eventId) {
    return EventParameters.findAll({ where: { event_id: eventId } });
  }

  async getAllEventParameterss() {
    return EventParameters.findAll();
  }

  async updateEventParameters(eventParametersId, eventParametersData) {
    const eventParameters = await EventParameters.findByPk(eventParametersId);
    if (!eventParameters) {
      throw new ApiError(404, 'EventParameters not found');
    }
    await eventParameters.update(eventParametersData);
    return eventParameters;
  }

  async deleteEventParameters(eventParametersId) {
    const eventParameters = await EventParameters.findByPk(eventParametersId);
    if (!eventParameters) {
      throw new ApiError(404, 'EventParameters not found');
    }
    await eventParameters.destroy();
    return eventParameters;
  }
}

export default new EventParametersService();
