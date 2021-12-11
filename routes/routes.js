const Workout = require('../models/workout.js');
const path = require('path');

module.exports = function(app) {

    // Routes
    app.get('/exercise', function(req, res) {
     res.sendFile(path.join(__dirname, '../public/exercise.html'));
    });
    
    app.get('/stats', function(req, res) {
          res.sendFile(path.join(__dirname, '../public/stats.html'));
     });

    app.get('/api/workouts', function(req, res) {
        Workout.find({})
        .then(function(workout) {
         res.json(workout);
        });
    }).catch((err) => {
            res.json(err);
        });

    // API Routes
    app.put('/api/workouts/:id', function(req, res) {
        Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body }})
        .then(function(workout) {
            res.json(workout);
        })
    }).catch((err) => {
        res.json(err);
    });

    app.post('/api/workouts', function({ body }, res) {
        Workout.create(body)
        .then(function(workout) {
            res.json(workout);
        }).catch((err) => {
            res.json(err);
        });
    })

    app.get('/api/workouts/range', function(req, res) {
        db.Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration",
                    },
                },
            },
        ])
            .sort({ day: -1 })
            .limit(7)
            .sort({ day: 1 })
            .then((dbWorkout) => {
                res.json(dbWorkout);
            })
            .catch((err) => {
                res.json(err);
            });
    })


   
};