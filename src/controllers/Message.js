import models from '../database/models';
import { validationResult } from 'express-validator/check';
import Helper from '../helper';

class Message {
  static async createMessage(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return Helper.handleResponse(res, 422, false, 'Error', errors.array());
      }
      const contact = await models.Message.create(req.body)
      return Helper.handleResponse(res, 201, true, 'Message created', contact);
    } catch (error) {
      return Helper.handleResponse(res, 400, false, 'An error occurred', error);
    }
  }

  static async getMessages(req, res) {
    const contacts = await await models.Message.findAll({
      include: [
        {
          model: models.Contact,
          as: 'sent',
          attributes: ['name', 'number'],
        },
        {
          model: models.Contact,
          as: 'received',
          attributes: ['name', 'number'],
        },
      ]
    });
    return Helper.handleResponse(res, 200, true, 'Message List', contacts);
  }
};

export default Message;
