if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// set up routes 
const indexRouter = require('./routes/index');

// TODO Set up layouts and views 👁️
app.set('view engine', 'ejs'); // set up ejs for view engine
app.set('views', __dirname + '/views'); // set up views folder
app.set('layout', 'layouts/layout'); // set up layout folder
app.use(expressLayouts);
app.use(express.static('public')); // set up public folder where we store css, js, images


// TODO Set up database 🍃
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose 🍃'));

app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, () => console.log('Server started 🚀'));