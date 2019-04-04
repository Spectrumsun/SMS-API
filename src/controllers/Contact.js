import models from '../database/models';
import { Op } from 'sequelize';
import Helper from '../helper';
import { validationResult } from 'express-validator/check';


class Contact {
  static async createContact(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return Helper.handleResponse(res, 422, false, 'Error', errors.array());
      }
      const { name, number } = req.body;
      const data = {
        id: number, number, name
      }
      const contact = await models.Contact.create(data)
      return Helper.handleResponse(res, 201, true, 'Contact created', contact);
    } catch (error) {
      return Helper.handleResponse(res, 400, false, 'User already exist');
    }
  }

  static async getContacts(req, res) {
    const contacts = await await models.Contact.findAll({
      include: [
        {
          model: models.Message,
          as: 'sentMessages',
          attributes: ['message', 'senderNumber', 'receiverNumber'],
        },
        {
          model: models.Message,
          as: 'receivedMessages',
          attributes: ['message', 'senderNumber', 'receiverNumber'],
        },
      ]
    });
    return Helper.handleResponse(res, 200, true, 'Contact List', contacts);
  }

  static async deleteContacts(req, res) {
    try {
      const { id } = req.params;
      const contact = await await models.Contact.destroy({
        returning: true,
        where: { id }
      });
      const message = await await models.Message.destroy({
        returning: true,
        where: {
          senderNumber: { [Op.in]: [id] },
        }
      });
      const data = [contact, message]
      return Helper.handleResponse(res, 200, true, 'Contact deleted');
    } catch (error) {
      return Helper.handleResponse(res, 400, false, 'An error occurred');
    }
  }
};

export default Contact;
