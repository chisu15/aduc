const sql = require("mssql");
const devicesModel = require('../models/device.model');
const mqtt = require('mqtt');

let dataOfDevices = ""

// Connect to the MQTT broker
const client = mqtt.connect('ws://1.55.212.49:8083/mqtt');

// Subscribe to a topic
const topic = 'GSMT_DUCKT';
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('Error subscribing to topic:', err);
        } else {
            console.log('Subscribed to topic:', topic);
        }
    });
});

// Handle incoming messages
client.on('message', (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
    dataOfDevices = JSON.parse(message);
    var res = JSON.parse(message);
    console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT", res);
    var rq2 = new sql.Request();
    var date = new Date();
    console.log(date);
    console.log("device_y", res.device_id);
    rq2.input("name", sql.NVarChar, res.device_id);
    rq2.input("temp", sql.Float, res.temp);
    rq2.input("hum", sql.Float, res.hum);
    rq2.input("air_quality", sql.Float, 300);
    rq2.input("light", sql.Float, res.light);
    rq2.input('create_time', sql.DateTime, date);

    var qr2 =
        "insert into dbo.Data_log (device_name, Hum, temp, light, air_quality, create_time) values(@device_name, @Hum, @temp, @light, @air_quality, @create_time)";
    rq2.query(qr2, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("success!");
        }
    });
});

// Handle errors
client.on('error', (err) => {
    console.error('MQTT client error:', err);
    client.end();
});


async function controllightDevice(req, res) {
    var {
        clientid,
        state
    } = req.body;
    var message = {
        clientid: clientid,
        state: parseInt(state)
    };

    var message_send = JSON.stringify(message);
    console.log(req.body);
    if (req.body.state == 1) {
        res.send({
            desc: "Bật đèn thành công",
            code: 200
        });
    } else {
        res.send({
            desc: "Tắt đèn thành công",
            code: 200
        });
    }
    client.publish("Demo_lightControl", message_send);
}


async function getAllDevices(req, res) {
    try {
        const devices = await devicesModel.getAllDevices();
        res.json({
            data: devices
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getDeviceById(req, res) {
    try {
        const id = req.params.id;
        const device = await devicesModel.getDeviceById(id);
        if (device) {
            res.json({
                data: device
            });
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
            device.Hum > 70 || device.temp > 35 || device.air_quality > 100 || device.light > 500 || device.State === 'Faulty'
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
    getAbnormalDevices,
    controllightDevice
};