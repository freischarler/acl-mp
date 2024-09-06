import  Registration  from '../models/registrations.js';
import  ApiError from '../utils/ApiError.js';

class RegistrationService {
  async createRegistration(registrationData) {
    return Registration.create(registrationData);
  }

  async getRegistrationById(registrationId) {
    const registration = await Registration.findByPk(registrationId);
    if (!registration) {
      throw new ApiError(404, 'Registration not found');
    }
    return registration;
  }

  async getAllRegistrations() {
    return Registration.findAll();
  }

  async getAllRegistrationsByEvent(eventId) {
    return Registration.findAll({ where: { event_id: eventId } });
  }

  async getRegistrationsByUser(userId) {
    return Registration.findAll({ where: { user_id: userId } });
  }

  async updateRegistracionByOrderId(orderId, registrationData) {
    const registration = await Registration.findOne({ where: { order_id: orderId } });
    if (!registration) {
      throw new ApiError(404, 'Registration not found');
    }
    await registration.update(registrationData);
    return registration;
  }

  async updateRegistration(registrationId, registrationData) {
    const registration = await Registration.findByPk(registrationId);
    if (!registration) {
      throw new ApiError(404, 'Registration not found');
    }
    await registration.update(registrationData);
    return registration;
  }

  async findRegistration(userId, eventId) {
    return Registration.findOne({ where: { user_id: userId, event_id: eventId } });
  }

  async deleteRegistration(registrationId) {
    const registration = await Registration.findByPk(registrationId);
    if (!registration) {
      throw new ApiError(404, 'Registration not found');
    }
    await registration.destroy();
    return registration;
  }
}

export default new RegistrationService();
