const StudentManager = require('../services/StudentManager');
const { Router } = require('express');
const router = Router();

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
    const { name, lastname, age, dni, course, note } = req.body;
    await manager.addStudent(name, lastname, age, dni, course, note);

})