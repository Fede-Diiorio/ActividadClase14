const express = require('express');
const mongoose = require('mongoose')
const app = express();
const studentRouter = require('./routes/student.router');
const handlebars = require('express-handlebars');

// Configuración de handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

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


