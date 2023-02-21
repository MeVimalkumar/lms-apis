const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const logger = require('morgan');
const routes = require('./lib/routes');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes)


// TO DO: Create a seperate middleware to handle all the errors 
app.use((error, req, res, next) => {
    console.error(error);
    if (error?.errors) {
        const errors = {};
        for (let key in error.errors) {
            errors[key] = error.errors[key].message || error.errors[key].kind || error.errors[key];
        }
        return res.status(400).json({ message: 'Validation Errors', errors });
    }
    if (error.code === 11000) {
        return res.status(409).json({ message: 'Record already exist' });
    }
    if (error.statusCode === 400) {
        return res.status(400).json({ message: 'Bad request' });
    }
    return res.status(500).json({ message: 'Internal server error' });
});



module.exports = app;
