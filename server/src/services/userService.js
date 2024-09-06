import { compare } from 'bcrypt';
import User from '../models/user.js';
import  ApiError from '../utils/ApiError.js';

class UserService {
  async createUser(userData) {
    return User.create(userData);
  }

  async getUserById(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }

  async getAllUsers() {
    return User.findAll();
  }

  async findUserByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async checkUserPassword(user, password) {
    return compare(password, user.password_hash);
  }

  async updateUser(userId, userData) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    await user.update(userData);
    return user;
  }

  async deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    await user.destroy();
    return user;
  }

  async getLogin(userData) {
    const user = await User.findOne({ where: userData });
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }

  async getUserGender(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }
}

export default new UserService();
