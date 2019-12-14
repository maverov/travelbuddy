const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Trip = require("./models/trip");
const Comment = require("./models/comment");
const User = require("./models/user");
const commentRoutes = require("./routes/comments");
const tripRoutes = require("./routes/trips");
const indexRoutes = require("./routes/index");
const methodOverride = require("method-override");
const flash = require("connect-flash");

// mongoose.connect("mongodb://localhost/travel_buddy", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb+srv://admin:carebear@cluster0-wftyd.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
// Telling Express to use the Body-Parser package
app.use(bodyParser.urlencoded({ extended: true }));
// Setting view engine to EJS default
app.set("view engine", "ejs");
// Telling express to use the /public folder
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Authentication Setup - Passport.JS
app.use(require("express-session")({
    secret: "Gunpowder treason and plot",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.use(indexRoutes);
app.use(commentRoutes);
app.use(tripRoutes);

// Server listening setup
app.listen(process.env.PORT, process.env.IP, () => {
    console.log("*****************************************************************");
    console.log("*********  T R A V E L    B U D D Y    has     started  *********");
    console.log("The Server is listening on port 3000.");
    console.log("*****************************************************************");
});