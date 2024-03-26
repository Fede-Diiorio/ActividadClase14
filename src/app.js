const express = require('express');
const mongoose = require('mongoose')
const app = express();
const studentRouter = require('./routes/student.router');

app.use(express.static(`${__dirname}/../public`));

// Permitir envío de información mediante formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/students', studentRouter);

const main = async () => {

    await mongoose.connect(
        'mongodb+srv://FedeDiiorio:EatnQEgmFMs8oxtY@clusterfede.lnfsj8w.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFede',
        {
            dbName: 'School'
        }
    )

    app.listen(8080, () => {
        console.log('Server up!')
    })

}

main()


