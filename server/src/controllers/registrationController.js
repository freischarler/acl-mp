import registrationService from '../services/registrationService.js';
import eventService from '../services/eventService.js';
import teamService from '../services/teamService.js';
import userService from '../services/userService.js';
import categoryService from '../services/categoryService.js';
import weightService from '../services/weightService.js';
import ageService from '../services/ageService.js';
import styleService from '../services/styleService.js';
import genderService from '../services/genderService.js';


class RegistrationController {
  async createRegistration(req, res, next) {
    try {

      const { user_id, event_id } = req.body;

      // Check for existing registration
      const existingRegistration = await registrationService.findRegistration(user_id, event_id);
      if (existingRegistration) {
        return res.status(400).json({ error: 'User is already registered for this event' });
      }

      // Search weight_id, age_id, style_id
      const weight_id = await weightService.getWeightByValue(req.body.weight);
      const age_id = await ageService.getAgeByType(req.body.age);
      const category_id = await categoryService.getCategoryByName(req.body.category);
      const gender_id = await userService.getUserGender(user_id);

      // add weight_id, age_id, style_id to registration body
      req.body.weight_id = weight_id.weight_id;
      req.body.age_id = age_id.age_id;
      req.body.category_id = category_id.category_id;
      req.body.gender_id = gender_id.gender_id;

      if (!weight_id || !age_id || !category || !gender_id) {
        return res.status(400).json({ error: 'Invalid params' });
      }

      const registration = await registrationService.createRegistration(req.body);
  

      res.status(201).json(registration);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  async getRegistrationById(req, res, next) {
    try {
      const registration = await registrationService.getRegistrationById(req.params.id);
      res.status(200).json(registration);
    } catch (error) {
      next(error);
    }
  }

  async getRegistrationsByUser(req, res, next) {
    try {
      const registrations = await registrationService.getRegistrationsByUser(req.params.id);
      let events, teams;
      //get event details for each registration
      for (let i = 0; i < registrations.length; i++) {
        events = await eventService.getEventById(registrations[i].event_id);
        teams = await teamService.getTeamById(registrations[i].team_id);
        registrations[i].event = events;
        registrations[i].team = teams;
      }

      res.status(200).json({registrations, events, teams});
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  async getAllRegistrationes(req, res, next) {
    try {
      const registrations = await registrationService.getAllRegistrations();
      res.status(200).json(registrations);
    } catch (error) {
      next(error);
    }
  }

  async getAllRegistrationsByEvent(req, res, next) {
    try {
      let registrations = await registrationService.getAllRegistrationsByEvent(req.params.id);
      if (!registrations) {
        return res.status(404).json({ error: 'No registrations found for this event' });
      }

      //delete all registrations with status "pending"
      //registrations = registrations.filter(registration => registration.status !== "pending");

      //replace registrations user_id, team_id, and event_id with user, team, and event details
      registrations = await Promise.all(registrations.map(async registration => {
        const user = await userService.getUserById(registration.user_id);
        const team = await teamService.getTeamById(registration.team_id);
        //const event = await eventService.getEventById(registration.event_id);
        const category = await categoryService.getCategoryById(registration.category_id);
        const weight = await weightService.getWeightById(registration.weight_id);
        const age = await ageService.getAgeById(registration.age_id);
        const style = await styleService.getStyleById(registration.style_id);
        const gender = await genderService.getGenderById(registration.gender_id);


        return {
          registration_id: registration.registration_id,
          user: user.name,
          category: category.name, // or registration.dataValues.category_id if registration is a Sequelize instance
          team: team.name, // or team.dataValues.team_id if team is a Sequelize instance
          weight: weight.value,
          age: age.type,
          style: style.value,
          gender: gender.value,
          //status: registration.status,
          price: registration.price,
          registration_date: registration.registration_date
        };
      }));

      res.status(200).json(registrations);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  async updateRegistration(req, res, next) {
    try {
      const registration = await registrationService.updateRegistration(req.params.id, req.body);
      res.status(200).json(registration);
    } catch (error) {
      next(error);
    }
  }

  async deleteRegistration(req, res, next) {
    try {
      await registrationService.deleteRegistration(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new RegistrationController();
