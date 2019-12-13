const express = require("express");
const router = express.Router();
const Trip = require("../models/trip");

// Middleware
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

// INDEX route
router.get("/trips", (req, res) => {
    // Get all current planned trips from DB
    Trip.find({}, (err, allCurrentTrips) => {
        if (err) {
            console.log(err)
        } else {
            res.render("trips/index", { trips: allCurrentTrips })
        }
    })
});

// CREATE route
router.post("/trips", isLoggedIn, (req, res) => {
    // Get data from form and add to plannedTrips
    const destinationName = req.body.destination;
    const image = req.body.image;
    const leavingFrom = req.body.leavingfrom;
    const dates = req.body.dates;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username,
        age: req.user.age
    };
    const newTrip = { destionationName: destinationName, image: image, leavingFrom: leavingFrom, dates: dates, description: description, author: author };
    // Create a new trip and save to DB
    Trip.create({ destinationName: destinationName, image: image, leavingFrom: leavingFrom, dates: dates, description: description, author: author }, (err, trip) => {
        if (err) {
            console.log(err)
        } else {
            console.log(trip)
        }
    })
    // Redirect back to the planned trips page
    res.redirect("/trips");
});

// NEW route
router.get("/trips/new", isLoggedIn, (req, res) => {
    // NEW - show form to create a new trip
    res.render("trips/new");
});

// SHOW route
router.get("/trips/:id", (req, res) => {
    // Find the trip with the provided ID
    Trip.findById(req.params.id).populate("comments").exec(function (err, foundTrip) {
        if (err) {
            console.log(err)
        } else {
            res.render("trips/show", { trip: foundTrip });
        }
    })
    // render the show template with that trip

});

// EDIT TRIP ROUTE
router.get("/trips/:id/edit", checkTripOwnership, (req, res) => {
    Trip.findById(req.params.id, (err, trip) => {
        res.render("trips/edit", { trip: trip })
    });
});

// UPDATE TRIP ROUTE
router.put("/trips/:id", (req, res) => {
    const data = {
        destinationName: req.body.destination,
        image: req.body.image,
        leavingFrom: req.body.leavingfrom,
        dates: req.body.dates,
        description: req.body.description
    };

    Trip.findByIdAndUpdate(req.params.id, data, (err, updatedTrip) => {
        if (err) {
            console.log(err);
            res.redirect("/trips" + req.params.id);
        } else {
            res.redirect("/trips/" + req.params.id);
        }
    });
});

// DELETE TRIP ROUTE
router.delete("/trips/:id", (req, res) => {
    Trip.findByIdAndDelete(req.params.id, err => {
        if (err) {
            console.log(err);
            res.redirect("/trips" + req.params.id);
        } else {
            res.redirect("/trips");
        }
    });
});

function checkTripOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Trip.findById(req.params.id, (err, trip) => {
            if (err) {
                res.redirect("back");
            } else {
                // Does the user own the trip ad?
                if (trip.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;