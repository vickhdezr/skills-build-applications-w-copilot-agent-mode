import { Schema, model, Types } from 'mongoose'

const WorkoutSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        weightKg: Number
      }
    ],
    durationMinutes: Number,
    caloriesBurned: Number,
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export default model('Workout', WorkoutSchema)
