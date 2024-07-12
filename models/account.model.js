const { sql, poolPromise } = require('../config/database');

async function getUserByUsername(username) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM Account WHERE username = @username');
    return result.recordset[0];
}

async function getAllAccounts() {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Account');
    return result.recordset;
}

async function createAccount(account) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('username', sql.VarChar, account.username)
        .input('session_id', sql.VarChar, account.session_id)
        .input('type', sql.VarChar, account.type)
        .input('full_name', sql.VarChar, account.full_name)
        .input('password', sql.VarChar, account.password)
        .query('INSERT INTO Account (username, session_id, type, full_name, password) VALUES (@username, @session_id, @type, @full_name, @password)');
    return result.recordset;
}

async function updateAccount(username, account) {
    const pool = await poolPromise;
    const updateFields = [];
    if (account.session_id) updateFields.push(`session_id = @session_id`);
    if (account.type) updateFields.push(`type = @type`);
    if (account.full_name) updateFields.push(`full_name = @full_name`);
    if (account.password) updateFields.push(`password = @password`);

    const query = `UPDATE Account SET ${updateFields.join(', ')} WHERE user_name = @username`;

    const request = pool.request().input('username', sql.VarChar, username);
    if (account.session_id) request.input('session_id', sql.VarChar, account.session_id);
    if (account.type) request.input('type', sql.VarChar, account.type);
    if (account.full_name) request.input('full_name', sql.VarChar, account.full_name);
    if (account.password) request.input('password', sql.VarChar, account.password);

    const result = await request.query(query);
    return result.recordset;
}

async function deleteAccount(username) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('DELETE FROM Account WHERE username = @username');
    return result.recordset;
}

module.exports = {
    getUserByUsername,
    getAllAccounts,
    updateAccount,
    createAccount,
    deleteAccount
};