import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

const validDateFormat = "MM-DD-YY";
const validUnits = ['kgs', 'lbs'];
// const validReps = exercises.reps > 0
// const validWeight = exercises.weight > 0
const invalidDateResponse = {
  error: `Invalid date; must be in ${validDateFormat} format`,
};
const invalidUnitResponse = {
  error: `Invalid units; must be either: ${validUnits}`,
};
// const invalidRepsResponse = {
//   error: 'Reps must be greater than 0.',
// }
// const invalidWeightResponse = {
//   error: 'Weight must be greater than 0.',
// }

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression.
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

/**
*
* @param {string} unit
* Return true if the unit is 'kgs' or 'lbs'
*/
function isValidUnit(unit) {
  return validUnits.includes(unit);
}

function validateParams(req, res) {
  if (!isValidUnit(req.body.unit)) {
    res.status(400).json(invalidUnitResponse);
  }
  if (!isDateValid(req.body.date)) {
    res.status(400).json(invalidDateResponse);
  }
}

/**
 * Create a new exercise with name, reps, weight, unit and date
 */
app.post('/exercises', (req, res) => {
  validateParams(req, res);
  if (!res.headersSent) {
    exercises.createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
    )
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
  }
});

/**
 * Retrieve the exercise collection
 */
app.get('/exercises', (req, res) => {
    exercises.retrieveExercises()
      .then(exercises => {
        res.status(200).json(exercises)
      })
});

/**
 * Retrieve the exercise with the given ID
 */
app.get("/exercises/:_id", (req, res) => {
  const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
        if (exercise !== null) {
            res.status(200).json(exercise);
        } else {
            res.status(404).json({ Error: 'Not found' })
        }
    })
    .catch (error => {
        res.status(400).json({ Error: 'Request failed' });
    })
});

/**
 * Update the exercise with the given ID
 */
app.put("/exercises/:_id", (req, res) => {
  validateParams(req, res);
  if (!res.headersSent) {
    exercises.updateExercise(
      req.params._id,
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )
      .then(numUpdated => {
        if (numUpdated.matchedCount === 1) {
          res.status(200).json({
            _id: req.params._id,
            name: req.body.name,
            reps: req.body.reps,
            weight: req.body.weight,
            unit: req.body.unit,
            date: req.body.date
          });
        } else {
          res.status(404).json({ Error: "Not found" });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json({ error: 'Request failed' });
      });
  }
});

/**
 * Delete the exercise with the given ID
 */
app.delete("/exercises/:_id", (req, res) => {
  exercises.deleteExercise(req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "Not found" });
      }
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});