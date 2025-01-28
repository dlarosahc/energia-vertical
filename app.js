require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const { userExtractor } = require('./middleware/auth');
const { PAGE_URL, MONGO_URI } = require('./config');
const loginRouter = require('./controllers/login');
const packagesRouter = require('./controllers/packages');
const paymentsRouter = require('./controllers/payments');
const profileRouter = require('./controllers/profile');
const scheduleRouter = require('./controllers/schedule');
const classRouter = require('./controllers/class');
const logoutRouter = require('./controllers/logout');


(async() => {

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a Mongo DB');
        
    } catch (error) {
        console.log(error);
        
    }

})();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


//Rutas Frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/images', express.static(path.resolve('images')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/us', express.static(path.resolve('views', 'us')));
app.use('/dashboard', express.static(path.resolve('views', 'dashboard')));
app.use('/dashboard/package', express.static(path.resolve('views', 'dashboard', 'package')));
app.use('/dashboard/payments', express.static(path.resolve('views', 'dashboard', 'payments')));
app.use('/dashboard/schedule', express.static(path.resolve('views', 'dashboard', 'schedule')));
app.use('/dashboard/attendance', express.static(path.resolve('views', 'dashboard', 'attendance')));



app.use(morgan('tiny'));





//Rutas Backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/packages', userExtractor, packagesRouter);
app.use('/api/payments', userExtractor ,paymentsRouter);
app.use('/api/profile', userExtractor ,profileRouter);
app.use('/api/schedule', userExtractor ,scheduleRouter);
app.use('/api/class', userExtractor ,classRouter);
app.use('/api/logout', userExtractor ,logoutRouter);


module.exports = app;