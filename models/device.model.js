const { sql, poolPromise } = require('../config/database');

async function getAllDevices() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Devices');
    return result.recordset;
}

async function getDeviceByid(id) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Devices WHERE id = @id');
    return result.recordset[0];
}

async function createDevice(device) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('name', sql.VarChar, device.name)
        .input('hum', sql.Float, device.hum)
        .input('temp', sql.Float, device.temp)
        .input('air_quality', sql.Float, device.air_quality)
        .input('light', sql.Float, device.light)
        .input('state', sql.VarChar, device.state)
        .input('description', sql.VarChar, device.description)
        .input('type', sql.VarChar, device.type)
        .input('class_room_id', sql.Int, device.class_room_id)
        .query('INSERT INTO Devices (name, hum, temp, air_quality, light, state, description, type, class_room_id) VALUES (@name, @hum, @temp, @air_quality, @light, @state, @description, @type, @class_room_id)');
    return result.recordset;
}

async function updateDevice(id, device) {
    const pool = await poolPromise;
    const updateFields = [];
    if (device.name) updateFields.push(`name = @name`);
    if (device.hum) updateFields.push(`hum = @hum`);
    if (device.temp) updateFields.push(`temp = @temp`);
    if (device.air_quality) updateFields.push(`air_quality = @air_quality`);
    if (device.light) updateFields.push(`light = @light`);
    if (device.state) updateFields.push(`state = @state`);
    if (device.description) updateFields.push(`description = @description`);
    if (device.type) updateFields.push(`type = @type`);
    if (device.class_room_id) updateFields.push(`class_room_id = @class_room_id`);

    const query = `UPDATE Devices SET ${updateFields.join(', ')} WHERE id = @id`;

    const request = pool.request().input('id', sql.Int, id);
    if (device.name) request.input('name', sql.VarChar, device.name);
    if (device.hum) request.input('hum', sql.Float, device.hum);
    if (device.temp) request.input('temp', sql.Float, device.temp);
    if (device.air_quality) request.input('air_quality', sql.Float, device.air_quality);
    if (device.light) request.input('light', sql.Float, device.light);
    if (device.state) request.input('state', sql.VarChar, device.state);
    if (device.description) request.input('description', sql.VarChar, device.description);
    if (device.type) request.input('type', sql.VarChar, device.type);
    if (device.class_room_id) request.input('class_room_id', sql.Int, device.class_room_id);

    const result = await request.query(query);
    return result.recordset;
}

async function deleteDevice(id) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Devices WHERE id = @id');
    return result.recordset;
}

module.exports = {
    getAllDevices,
    getDeviceByid,
    createDevice,
    updateDevice,
    deleteDevice
};
