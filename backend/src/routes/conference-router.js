const express = require('express');
const { ConferenceController } = require('../controllers');

const router = express.Router();
const conferenceController = new ConferenceController();

router.get('/', conferenceController.getAllConference);
router.get('/:id', conferenceController.getConference);

module.exports = router;