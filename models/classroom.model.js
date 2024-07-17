const { sql, poolPromise } = require('../config/database');

async function getAllClassrooms() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Class_room');
    return result.recordset;
}

async function getClassroomByid(id) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Class_room WHERE id = @id');
    return result.recordset[0];
}

async function createClassroom(classroom) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('name', sql.VarChar, classroom.name)
        .input('floor', sql.Int, classroom.floor)
        .input('state', sql.VarChar, classroom.state)
        .input('abnormal_rp', sql.VarChar, classroom.abnormal_rp)
        .query('INSERT INTO Class_room (name, floor, state, abnormal_rp) VALUES (@name, @floor, @state, @abnormal_rp)');
    return result.recordset;
}

async function updateClassroom(id, classroom) {
    const pool = await poolPromise;
    const updateFields = [];
    if (classroom.name) updateFields.push(`name = @name`);
    if (classroom.floor) updateFields.push(`floor = @floor`);
    if (classroom.state) updateFields.push(`state = @state`);
    if (classroom.abnormal_rp) updateFields.push(`abnormal_rp = @abnormal_rp`);
    
    const query = `UPDATE Class_room SET ${updateFields.join(', ')} WHERE id = @id`;

    const request = pool.request().input('id', sql.Int, id);
    if (classroom.name) request.input('name', sql.VarChar, classroom.name);
    if (classroom.floor) request.input('floor', sql.Int, classroom.floor);
    if (classroom.state) request.input('state', sql.VarChar, classroom.state);
    if (classroom.abnormal_rp) request.input('abnormal_rp', sql.VarChar, classroom.abnormal_rp);

    const result = await request.query(query);
    return result.recordset;
}

async function deleteClassroom(id) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Class_room WHERE id = @id');
    return result.recordset;
}

module.exports = {
    getAllClassrooms,
    getClassroomByid,
    createClassroom,
    updateClassroom,
    deleteClassroom
};
