const StudentManager = require('../services/StudentManager');
const { Router } = require('express');
const router = Router();
const { Student } = require('../models');

const manager = new StudentManager(`${__dirname}/../../assets/students.json`)

router.get('/', async (_, res) => {
    try {
        const students = await manager.getStudents();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ Error: err });
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, lastname, age, dni, course, note } = req.body;

        if (!name || !lastname || !age || !dni || !course || !note) {
            res.status(400).json({
                result: 'Error',
                message: 'Debe completar todos los campos.'
            });
            return;
        }

        await manager.addStudent(name, lastname, age, dni, course, note);
        const newStudent = await Student.create({ name, lastname, age, dni, course, note });
        res.status(200).json({ result: 'Success', status: 'Guardado en el archivo', student: newStudent });
    } catch (err) {
        res.status(500).json({
            result: 'Error',
            status: err.message
        });
    }

})

module.exports = router;