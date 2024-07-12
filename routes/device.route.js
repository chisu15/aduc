const express = require('express');
const router = express.Router();
const controller = require('../controllers/device.controller');

router.get('/', controller.getAllDevices);
router.get('/detail/:id', controller.getDeviceById);
router.post('/create-device', controller.createDevice);
router.patch('/edit/:id', controller.updateDevice);
router.delete('/:id', controller.deleteDevice);
router.get('/report-devices', controller.getAbnormalDevices);
module.exports = router;
