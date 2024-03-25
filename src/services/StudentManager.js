const { error } = require('console');
const fs = require('fs');

class StudentManager {

    #students;
    #lastLocalStudentId
    path;

    constructor(path) {
        this.#students = [];
        this.path = path;
        this.#lastLocalStudentId = 1;
        this.#readFile();
    }

    async #readFile() {
        try {
            const fileData = await fs.readFile(this.path, 'utf-8');
            this.#students = JSON.parse(fileData);
            this.#updateLastLocalStudentId()
        } catch (err) {
            await this.#saveFile();
        }
    }

    #getNewId() {
        return this.#lastProductId++;
    }

    async #saveFile() {
        await fs.watchFile(this.path, JSON.stringify(this.#students, null, 2), 'utf-8');
    }

    async #updateLastLocalStudentId() {
        const lastLocalId = this.#students[this.#students.length - 1];
        if (lastLocalId) {
            this.#lastLocalStudentId = lastLocalId + 1;
        }
    }

    async getStudents() {
        try {
            const fileContent = await fs.readFile(this.path, 'utf-8');
            const existingStudents = JSON.parse(fileContent);
            return existingStudents;
        } catch {
            return [];
        }
    }

    async getStudentById(id) {
        const existingStudent = await this.getStudents();
        const filterStudentById = existingStudent.find(el => el.id === id);
        if (filterStudentById) {
            return filterStudentById;
        } else {
            throw new Error('El ID del estudiante no existe.');
        }
    }

    async addStudent(name, lastname, age, dni, course, note) {
        try {
            if (!name || !lastname || !dni || !course) {
                throw new Error('Debe completar todos los campos');
            }

            const numericAge = parseInt(age);
            const numericNote = parseFloat(note);

            if (numericAge <= 6 || numericNote <= 0) {
                throw new Error('Hubo un problema al ingresar la edad o la nota')
            }

            const student = { id: this.#getNewId(), name, lastname, age: numericAge, dni, course, note: numericNote };
            this.#students.push(student);
            await this.#saveFile();
            console.log('Estudiante agregado de manera correcta')
        } catch {
            throw new Error('Hubo un error al agregar un estudiante')
        }
    }
}

module.exports = StudentManager;