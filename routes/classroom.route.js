const express = require('express');
const router = express.Router();
const controller = require('../controllers/classroom.controller');
const checkSession = require("../middlewares/checkSession");

router.post('/', checkSession, controller.getAllClassrooms);
router.get('/detail/:id', controller.getClassroomById);
router.post('/create-classroom', controller.createClassroom);
router.patch('/edit/:id', controller.updateClassroom);
router.delete('/:id', controller.deleteClassroom);
module.exports = router;
