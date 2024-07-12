const { sql, poolPromise } = require('../config/database');

async function getAllClassrooms() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Class_room');
    return result.recordset;
}

async function getClassroomById(id) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('ID', sql.Int, id)
        .query('SELECT * FROM Class_room WHERE ID = @ID');
    return result.recordset[0];
}

async function createClassroom(classroom) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('Name', sql.VarChar, classroom.Name)
        .input('Floor', sql.Int, classroom.Floor)
        .input('State', sql.VarChar, classroom.State)
        .input('Abnormal_rp', sql.VarChar, classroom.Abnormal_rp)
        .query('INSERT INTO Class_room (Name, Floor, State, Abnormal_rp) VALUES (@Name, @Floor, @State, @Abnormal_rp)');
    return result.recordset;
}

async function updateClassroom(id, classroom) {
    const pool = await poolPromise;
    const updateFields = [];
    if (classroom.Name) updateFields.push(`Name = @Name`);
    if (classroom.Floor) updateFields.push(`Floor = @Floor`);
    if (classroom.State) updateFields.push(`State = @State`);
    if (classroom.Abnormal_rp) updateFields.push(`Abnormal_rp = @Abnormal_rp`);
    
    const query = `UPDATE Class_room SET ${updateFields.join(', ')} WHERE ID = @ID`;

    const request = pool.request().input('ID', sql.Int, id);
    if (classroom.Name) request.input('Name', sql.VarChar, classroom.Name);
    if (classroom.Floor) request.input('Floor', sql.Int, classroom.Floor);
    if (classroom.State) request.input('State', sql.VarChar, classroom.State);
    if (classroom.Abnormal_rp) request.input('Abnormal_rp', sql.VarChar, classroom.Abnormal_rp);

    const result = await request.query(query);
    return result.recordset;
}

async function deleteClassroom(id) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('ID', sql.Int, id)
        .query('DELETE FROM Class_room WHERE ID = @ID');
    return result.recordset;
}

module.exports = {
    getAllClassrooms,
    getClassroomById,
    createClassroom,
    updateClassroom,
    deleteClassroom
};
