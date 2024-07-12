const { sql, poolPromise } = require('../config/database');

async function getAllDevices() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Devices');
    return result.recordset;
}

async function getDeviceById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('ID', sql.Int, id)
        .query('SELECT * FROM Devices WHERE ID = @ID');
    return result.recordset[0];
}

async function createDevice(device) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('Name', sql.VarChar, device.Name)
        .input('Hum', sql.Float, device.Hum)
        .input('Temp', sql.Float, device.Temp)
        .input('Air_quality', sql.Float, device.Air_quality)
        .input('Light', sql.Float, device.Light)
        .input('State', sql.VarChar, device.State)
        .input('Description', sql.VarChar, device.Description)
        .input('Type', sql.VarChar, device.Type)
        .input('Class_room_ID', sql.Int, device.Class_room_ID)
        .query('INSERT INTO Devices (Name, Hum, Temp, Air_quality, Light, State, Description, Type, Class_room_ID) VALUES (@Name, @Hum, @Temp, @Air_quality, @Light, @State, @Description, @Type, @Class_room_ID)');
    return result.recordset;
}

async function updateDevice(id, device) {
    const pool = await poolPromise;
    const updateFields = [];
    if (device.Name) updateFields.push(`Name = @Name`);
    if (device.Hum) updateFields.push(`Hum = @Hum`);
    if (device.Temp) updateFields.push(`Temp = @Temp`);
    if (device.Air_quality) updateFields.push(`Air_quality = @Air_quality`);
    if (device.Light) updateFields.push(`Light = @Light`);
    if (device.State) updateFields.push(`State = @State`);
    if (device.Description) updateFields.push(`Description = @Description`);
    if (device.Type) updateFields.push(`Type = @Type`);
    if (device.Class_room_ID) updateFields.push(`Class_room_ID = @Class_room_ID`);

    const query = `UPDATE Devices SET ${updateFields.join(', ')} WHERE ID = @ID`;

    const request = pool.request().input('ID', sql.Int, id);
    if (device.Name) request.input('Name', sql.VarChar, device.Name);
    if (device.Hum) request.input('Hum', sql.Float, device.Hum);
    if (device.Temp) request.input('Temp', sql.Float, device.Temp);
    if (device.Air_quality) request.input('Air_quality', sql.Float, device.Air_quality);
    if (device.Light) request.input('Light', sql.Float, device.Light);
    if (device.State) request.input('State', sql.VarChar, device.State);
    if (device.Description) request.input('Description', sql.VarChar, device.Description);
    if (device.Type) request.input('Type', sql.VarChar, device.Type);
    if (device.Class_room_ID) request.input('Class_room_ID', sql.Int, device.Class_room_ID);

    const result = await request.query(query);
    return result.recordset;
}

async function deleteDevice(id) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('ID', sql.Int, id)
        .query('DELETE FROM Devices WHERE ID = @ID');
    return result.recordset;
}

module.exports = {
    getAllDevices,
    getDeviceById,
    createDevice,
    updateDevice,
    deleteDevice
};
