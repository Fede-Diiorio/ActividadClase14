const { Router } = require('express');
const router = Router();
const { Student } = require('../models');

router.get('/', async (_, res) => {
    try {
        const studentsDb = await Student.find();

        const studentsData = studentsDb.map(std => ({
            lastname: std.lastname,
            name: std.name,
            dni: std.dni,
            age: std.age,
            course: std.course,
            note: std.note
        }));

        // res.json(studentsData);

        res.render('home', {
            students: studentsData,
            style: ['styles.css']
        });

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

        const newStudent = await Student.create({ name, lastname, age, dni, course, note });
        res.status(200).json({ result: 'Success', status: 'Guardado en el archivo', student: newStudent });
    } catch (err) {
        res.status(500).json({
            result: 'Error',
            status: err.message
        });
    }

})

router.put('/:dni', async (req, res) => {
    const { name, lastname, age, dni, course, note } = req.body;
    try {
        const studentDni = req.params.dni;
        const fieldsToUpdate = { name, lastname, age, course, note };

        const areFieldsPresent = Object.values(fieldsToUpdate).some(field => field !== undefined);

        if (!areFieldsPresent) {
            return res.status(400).json({ result: 'Error', message: 'No se proporcionaron campos para actualizar.' });
        }

        const updateStudent = await Student.updateOne({ 'dni': studentDni }, { $set: fieldsToUpdate });
        res.status(200).json({ result: 'Success', status: 'Datos actualizados', student: updateStudent });
    } catch (err) {
        res.status(500).json({ result: 'Error', status: err.message });
    }
});

router.delete('/:dni', async (req, res) => {
    try {
        const studentDni = req.params.dni;
        await Student.deleteOne({ "dni": studentDni });
        res.status(200).json({ result: 'Success', message: 'El estudiante fue eliminado.' })
    } catch (err) {
        es.status(500).json({ error: 'Error al eliminar el producto.' });
    }
})

module.exports = router;