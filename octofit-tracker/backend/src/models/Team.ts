import { Schema, model, Types } from 'mongoose'

const TeamSchema = new Schema(
  {
    name: { type: String, required: true },
    members: [{ type: Types.ObjectId, ref: 'User' }],
    captain: { type: Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
)

export default model('Team', TeamSchema)
