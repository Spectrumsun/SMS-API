import express from 'express';
import Contact from '../controllers/Contact';
import Message from '../controllers/Message';
import { validateNumber, validateContact, findUser, sameNumber } from '../middleware'

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200)
    .json({
      success: true,
      message: 'SMS Management'
    });
});

router.post(
  '/contact',
  validateContact,
  Contact.createContact
);

router.get(
  '/contacts',
  Contact.getContacts
);

router.delete(
  '/contact/:id',
  Contact.deleteContacts
);

router.post(
  '/message',
  validateNumber,
  sameNumber,
  findUser,
  Message.createMessage
);

router.get(
  '/messages',
  Message.getMessages
);

// A catch-all routes
router.use('*', (req, res) =>
  res.status(404).json({
    message: 'That url does not exist on this server 🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫',
  }));


export default router;