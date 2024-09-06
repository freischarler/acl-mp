import  Qr  from '../models/qr.js';
import ApiError from '../utils/ApiError.js';

class QrService {
  async createQr(qrData) {
    return Qr.create(qrData);
  }

  async getQrById(qrId) {
    const qr = await Qr.findByPk(qrId);
    if (!qr) {
      throw new ApiError(404, 'Qr not found');
    }
    return qr;
  }

  async getAllQrs() {
    return Qr.findAll();
  }

  async updateQr(qrId, qrData) {
    const qr = await Qr.findByPk(qrId);
    if (!qr) {
      throw new ApiError(404, 'Qr not found');
    }
    await qr.update(qrData);
    return qr;
  }

  async deleteQr(qrId) {
    const qr = await Qr.findByPk(qrId);
    if (!qr) {
      throw new ApiError(404, 'Qr not found');
    }
    await qr.destroy();
    return qr;
  }
}

export default new QrService();
