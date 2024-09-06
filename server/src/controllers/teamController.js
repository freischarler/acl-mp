import teamService from '../services/teamService.js';

class TeamController {
  async createTeam(req, res, next) {
    try {
      const team = await teamService.createTeam(req.body);
      res.status(201).json(team);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  async getTeamById(req, res, next) {
    try {
      const team = await teamService.getTeamById(req.params.id);
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }

  async getAllTeams(req, res, next) {
    try {
      const teams = await teamService.getAllTeams();
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async updateTeam(req, res, next) {
    try {
      const team = await teamService.updateTeam(req.params.id, req.body);
      res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }

  async deleteTeam(req, res, next) {
    try {
      await teamService.deleteTeam(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getCoachByTeamId(req, res, next) {
    try {
      const coach = await teamService.getCoachByTeamId(req.params.teamId);
      res.status(200).json(coach);
    } catch (error) {
      //console.log(error)
      next(error);
    }
  }
}

export default new TeamController();
