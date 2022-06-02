import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { UseNewUrlParser: true }
);

// Connect to the database
const db = mongoose.connection;
// The open event is called when the databse connection successfully opens
db.once('open', () => {
    console.log('Successfully connected to MongoDB using Mongoose!');
});

 /**
 * Define the schema
 */
const exercisesSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true, min: [1, 'Must be greater than 0'] },
    weight: { type: Number, required: true, min: [1, 'Must be greater than 0'] },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model('Exercise', exercisesSchema);

/**
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date
    });
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
};

/**
 * Retrieve exercises collection
 * @returns
 */
const retrieveExercises = async () => {
    const query = Exercise.find();
    return query.exec();
};

/**
 * Returns exercise with the given ID
 * @returns A JSON array of the exercise collection
 */
const findExerciseById = async (_id) => {
    console.log(`_id = ${_id} and typeof _id = ${typeof _id}`)
    const query = Exercise.findById(_id);
    return query.exec();
};

/**
 * Replace the properties of the exercise with the id value provided
 * @param {string} _id
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the documents modified
 */
const opts = { runValidators: true, context: 'query' };
const updateExercise = async (_id, name, reps, weight, unit, date) => {
  const result = await Exercise.updateOne(
      { _id: _id },
      { name: name, reps: reps, weight: weight, unit: unit, date: date },
      opts
  );
  return result;
};

/**
 * Delete the exercise with the provided id
 * @param {string} _id
 * @returns A promise. Resolves to the count of the delted exercise
 */
const deleteExercise = async (id) => {
    const result = await Exercise.deleteOne({ _id: id });
    // Return the count of the deleted document. Either 0 or 1
    return result.deletedCount;
};

export { createExercise, retrieveExercises, findExerciseById, updateExercise, deleteExercise, }