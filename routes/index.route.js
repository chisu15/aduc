const express = require('express');
const accountRoute = require('./account.route');
const classroomRoute = require('./classroom.route');
const deviceRoute = require('./device.route');
module.exports = (app) => {
    const version = '/api/v1';
    app.use(version + '/account', accountRoute);
    app.use(version + '/classroom', classroomRoute);
    app.use(version + '/device', deviceRoute);
};