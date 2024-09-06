import  Team  from '../models/team.js';
import  ApiError from '../utils/ApiError.js';

class TeamService {
  async createTeam(teamData) {
    return Team.create(teamData);
  }

  async getTeamById(teamId) {
    const team = await Team.findByPk(teamId);
    if (!team) {
      throw new ApiError(404, 'Team not found');
    }
    return team;
  }

  async getAllTeams() {
    return Team.findAll();
  }

  async updateTeam(teamId, teamData) {
    const team = await Team.findByPk(teamId);
    if (!team) {
      throw new ApiError(404, 'Team not found');
    }
    await team.update(teamData);
    return team;
  }

  async deleteTeam(teamId) {
    const team = await Team.findByPk(teamId);
    if (!team) {
      throw new ApiError(404, 'Team not found');
    }
    await team.destroy();
    return team;
  }
}

export default new TeamService();
