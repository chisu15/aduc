const devicesModel = require('../models/device.model');

async function getAllDevices(req, res) {
    try {
        const devices = await devicesModel.getAllDevices();
        res.json({data: devices});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getDeviceById(req, res) {
    try {
        const id = req.params.id;
        const device = await devicesModel.getDeviceById(id);
        if (device) {
            res.json({data: device});
        } else {
            res.status(404).json({
                message: 'Device not found'
            });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function createDevice(req, res) {
    try {
        const device = req.body;
        await devicesModel.createDevice(device);
        res.status(201).json({
            message: 'Device created successfully'
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function updateDevice(req, res) {
    try {
        const id = req.params.id;
        const device = req.body;
        await devicesModel.updateDevice(id, device);
        res.status(200).json({
            message: 'Device updated successfully'
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function deleteDevice(req, res) {
    try {
        const id = req.params.id;
        await devicesModel.deleteDevice(id);
        res.status(200).json({
            message: 'Device deleted successfully'
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getAbnormalDevices(req, res) {
    try {
        const devices = await devicesModel.getAllDevices();
        const abnormalDevices = devices.filter(device =>
            device.Hum > 70 || device.Temp > 35 || device.Air_quality > 100 || device.Light > 500 || device.State === 'Faulty'
        );
        res.json({
            data: abnormalDevices
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllDevices,
    getDeviceById,
    createDevice,
    updateDevice,
    deleteDevice,
    getAbnormalDevices
};