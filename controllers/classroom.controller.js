const classroomModel = require('../models/classroom.model');

async function getAllClassrooms(req, res) {
    try {
        const classrooms = await classroomModel.getAllClassrooms();
        res.json(classrooms);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getClassroomById(req, res) {
    try {
        const id = req.params.id;
        const classroom = await classroomModel.getClassroomById(id);
        if (classroom) {
            res.json(classroom);
        } else {
            res.status(404).json({ message: 'Classroom not found' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function createClassroom(req, res) {
    try {
        const classroom = req.body;
        await classroomModel.createClassroom(classroom);
        res.status(201).json({ message: 'Classroom created successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function updateClassroom(req, res) {
    try {
        const id = req.params.id;
        const classroom = req.body;
        await classroomModel.updateClassroom(id, classroom);
        res.status(200).json({ message: 'Classroom updated successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function deleteClassroom(req, res) {
    try {
        const id = req.params.id;
        await classroomModel.deleteClassroom(id);
        res.status(200).json({ message: 'Classroom deleted successfully' });
    } catch (error) {
        res.status500().send(error.message);
    }
}

module.exports = {
    getAllClassrooms,
    getClassroomById,
    createClassroom,
    updateClassroom,
    deleteClassroom
};
