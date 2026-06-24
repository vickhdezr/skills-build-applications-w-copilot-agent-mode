import { Schema, model, Types } from 'mongoose'

const LeaderboardSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    metric: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number }
  },
  { timestamps: true }
)

export default model('Leaderboard', LeaderboardSchema)
