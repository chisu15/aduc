const accountModel = require('../models/account.model');
const bcrypt = require("bcrypt");
async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await accountModel.getUserByUsername(username);
        console.log(user);
        if (user && bcrypt.compareSync(password, user.password)) {
            res.json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    } 
}

async function getAllAccounts(req, res) {
    try {
        const accounts = await accountModel.getAllAccounts();
        res.json({data: accounts});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function profile(req, res) {
    try {
        const accounts = await accountModel.getUserByUsername(req.params.username);
        res.json({data: accounts});
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function createAccount(req, res) {
    try {
        const account = req.body;
        account.password = bcrypt.hashSync(account.password, 10);
        await accountModel.createAccount(account);
        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
}
async function updateAccount(req, res) {
    try {
        const username = req.params.username;
        const account = req.body;
        if (account.password) {
            account.password = bcrypt.hashSync(account.password, 10);
        }
        await accountModel.updateAccount(username, account);
        res.status(200).json({ message: 'Account updated successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
}
async function deleteAccount(req, res) {
    try {
        const username = req.params.username;
        await accountModel.deleteAccount(username);
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    login,
    profile,
    getAllAccounts,
    updateAccount,
    createAccount,
    deleteAccount
};