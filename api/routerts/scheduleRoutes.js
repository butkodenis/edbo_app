const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.get('/task/:id/shedule', scheduleController.getShedule);
router.post('/task/:id/shedule', scheduleController.postSchedule);
router.delete('/task/:id/shedule/:idShedule', scheduleController.deleteShedule);
