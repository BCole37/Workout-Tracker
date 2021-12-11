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

         // API Routes

    app.get('/api/workouts', function(req, res) {
        Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration",
                    },
                },
            },
        ])
            .then((workout) => {
                res.json(workout);
            });
    });

    app.put('/api/workouts/:id', function(req, res) {
        Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body }})
        .then(function(workout) {
            res.json(workout);
        })
    });

    app.post('/api/workouts', function({ body }, res) {
        Workout.create(body)
        .then(function(workout) {
            res.json(workout);
        });
    })

    app.get('/api/workouts/range', function(req, res) {
        Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: "$exercises.duration",
                    },
                },
            },
        ])
        .then(function(workout) {
            res.json(workout);
        });
    })
   
};