const express = require('express');
const router = express.Router();
const controller = require('../controllers/device.controller');
const checkSession = require("../middlewares/checkSession");
// CRUD routes for devices
router.post('/', checkSession, controller.getAllDevices);
router.get('/detail/:id', controller.getDeviceById);
router.post('/create-device', controller.createDevice);
router.patch('/edit/:id', controller.updateDevice);
router.delete('/:id', controller.deleteDevice);

// Additional functionality
router.get('/report-devices', controller.getAbnormalDevices);
// router.post('/control-light-device', controller.controlLightDevice);

module.exports = router;
