var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyparser = require('body-parser');
var logger = require('morgan');
var novelCovid = require('novelcovid');
const Handlebars = require('handlebars');
var exhbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session);
const passport = require('passport');
const push = require('web-push')

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/KillCoronaDB", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('Database connected...');
    }).catch((err) => {
        console.log('An error occured' + err);
    });

var aboutRouter = require('./routes/about');
var indexCovidDataRouter = require('./routes/index-covid-data');
var trackerRouter = require('./routes/tracker');
var notificationRouter = require('./routes/notification');
var plasmaBankRouter = require('./routes/plasmaBank');
var donorlistRouter = require('./routes/donorlist');
var requestDonorRouter = require('./routes/requestDonor');
var donorFromRouter = require('./routes/donorForm')
var informationRouter = require('./routes/information');
var usersRouter = require('./routes/users');

var app = express();

// Session store
let mongoStore = new MongoDbStore({
    mongooseConnection: mongoose.connection,
    collections: 'session'
})

// Handle Sessions
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Passport config
const passportInit = require('./config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Global middlewares
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})

// view engine setup
app.set('view engine', 'hbs');
app.engine('hbs', exhbs({
    extname: 'hbs',
    defaultView: 'home',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

// For push notification
// let vapidKeys = {
//     publicKey: 'BNBAt-CItQKq7rOT3SibPF9HVv70peMAirxLrrNVFsSatt3FvsUJygD9tuZWaBH_A3CinHn7580Ler6tAYi9ALs',
//     privateKey: 'TLlGgtMcPm9ETj_h2mYbQfYLQZCmcUFKOm3n6ST3v2U'
// }
// push.setVapidDetails('mailto:gaurabian111@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey);
// let sub = { "endpoint": "https://fcm.googleapis.com/fcm/send/eK0w9307ubE:APA91bGt9yFxm7mMVIa6qKvO4821p3u-rQkxHw5NL_uGbdr8EbuA03R8wVdsXsu4FejXIdWC2_fCajm9D6WS7A0KehrOeKDhlNm6p839vYxKPjRJc0eMjhhiRkUUR59a6XJxzdh4-Odu", "expirationTime": null, "keys": { "p256dh": "BGNNszVFTwMoX6gP7EjOIEhpC6xNvcT_fOybc6pCmmZ7NjNebacDMBov5avA9WrtXx4DIoPlnR_W-dH5Of0k7po", "auth": "uIDndhtmnZ2sPNIlEBxGkw" } };
// push.sendNotification(sub, 'test message');
// For push notifications

app.use('/', aboutRouter);
app.use('/', indexCovidDataRouter);
app.use('/', informationRouter);
app.use('/', trackerRouter);
app.use('/', notificationRouter);
app.use('/', plasmaBankRouter);
app.use('/', donorlistRouter);
app.use('/', requestDonorRouter);
app.use('/', donorFromRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;