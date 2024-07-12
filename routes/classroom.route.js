const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroom.controller');

router.get('/', classroomController.getAllClassrooms);
router.get('/detail/:id', classroomController.getClassroomById);
router.post('/create-classroom', classroomController.createClassroom);
router.patch('/edit/:id', classroomController.updateClassroom);
router.delete('/:id', classroomController.deleteClassroom);
module.exports = router;
