import { check } from 'express-validator/check';
import models from '../database/models';
import Helper from '../helper';

export const validateContact = [
  check('name').isLength({ min: 3 }).withMessage('Name cannot be empty'),
  check('number').isLength({ min: 10 }).withMessage('Number cannot be less than 10 digit'),
  check('number').isInt().withMessage('Number must be a digit'),
];


export const validateNumber = [
  check('message').isLength({ min: 1 }).withMessage('Message cannot be empty'),
  check('senderNumber').isLength({ min: 1 }).withMessage('Sender Number empty'),
  check('receiverNumber').isLength({ min: 1 }).withMessage('Receiver Number empty'),
  check('senderNumber').isInt().withMessage('Sender Number must be a digit'),
  check('receiverNumber').isInt().withMessage('Receiver Number must be a digit'),
  check('status').isLength({ min: 1 }).withMessage('Status cannot be empty'),
];


export const findUser = async (req, res, next) => {
  const { senderNumber, receiverNumber } = req.body
  const find = async (checkId) => {
    const check = await models.Contact.findOne({
      where: { id: checkId }
    })
    return check;
  }
  const checks = await Promise.all([senderNumber, receiverNumber].map((values) => find(values)
  ));
  if (checks.includes(null)) {

    return Helper.handleResponse(res, 400, false, 'Check the user Number', {
      senderNumber: checks[0] === null ? 'Sender Number does not exist' : 'found',
      receiverNumber: checks[1] === null ? 'Receiver Number does not exist' : 'Found'
    })
  }
  next()
}

export const sameNumber = (req, res, next) => {
  const { senderNumber, receiverNumber } = req.body;
  if (senderNumber === receiverNumber) {
    return Helper.handleResponse(res, 400, false, 'Sender and reciever cannot be the same number')
  }
  next();
}
