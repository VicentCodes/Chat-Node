
const express = require('express');
const app = express();
const log = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const IndexRoutes = require('./src/routers/index.js');
const chatRouter = require('./src/routers/index.js');
app.set('port', process.env.PORT || 2000);


const dotenv = require('dotenv');
dotenv.config();
const mongoURL = process.env.MONGO_URL;



// Middleware
app.use(log('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas
app.use('/', IndexRoutes);
app.use('/chat', chatRouter);
// Motor de vistas
app.set('views', path.join(__dirname, 'src/views'));
app.set('styles', path.join(__dirname, 'styles'));
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.set('view engine', 'ejs');

app.listen(app.get('port'), () => {
    console.log('El servidor está funcionando en el puerto', app.get('port'));
});





mongoose.connect(mongoURL)
.then(bd=>console.log('BD Mongo "ChatU2" conectado'))
.catch(err=>console.log(err));

