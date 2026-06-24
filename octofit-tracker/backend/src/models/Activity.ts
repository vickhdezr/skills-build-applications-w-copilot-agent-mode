import { Schema, model, Types } from 'mongoose'

const ActivitySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number },
    distanceKm: { type: Number },
    calories: { type: Number },
    workout: { type: Types.ObjectId, ref: 'Workout' },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export default model('Activity', ActivitySchema)
