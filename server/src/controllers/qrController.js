import qrService from '../services/qrService.js';

class QrController {
  async createQr(req, res, next) {
    try {
      const qr = await qrService.createQr(req.body);
      res.status(201).json(qr);
    } catch (error) {
      //console.log(error)
      next(error);
    }
  }

  async getQrById(req, res, next) {
    try {
      const qr = await qrService.getQrById(req.params.id);
      res.status(200).json(qr);
    } catch (error) {
      next(error);
    }
  }

  async getAllQrs(req, res, next) {
    try {
      const qrs = await qrService.getAllQrs();
      res.status(200).json(qrs);
    } catch (error) {
      next(error);
    }
  }

  async updateQr(req, res, next) {
    try {
      const qr = await qrService.updateQr(req.params.id, req.body);
      res.status(200).json(qr);
    } catch (error) {
      next(error);
    }
  }

  async deleteQr(req, res, next) {
    try {
      await qrService.deleteQr(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new QrController();
