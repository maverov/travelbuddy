const express = require("express");
const router = express.Router();
const Trip = require("../models/trip");
const Comment = require("../models/comment");

// Middleware
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

// Show create comment form
router.get("/trips/:id/comments/new", isLoggedIn, (req, res) => {
    // Find a Trip by ID
    Trip.findById(req.params.id, (err, trip) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { trip: trip });
        }
    });
});

// Post comment logic
router.post("/trips/:id/comments", isLoggedIn, (req, res) => {
    // Lookup trip using ID
    Trip.findById(req.params.id, (err, trip) => {
        if (err) {
            console.log(err);
            res.redirect("/trips");
        } else {
            // Create new comment on that trip
            Comment.create(req.body.comment, (err, comment) => {
                // Connect new element to trip
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    trip.comments.push(comment);
                    trip.save();
                    res.redirect(`/trips/${trip._id}`);
                }
            })
        }
    })
});



module.exports = router;