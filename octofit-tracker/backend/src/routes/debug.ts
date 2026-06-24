import { Router } from 'express'
import User from '../models/User'
import Team from '../models/Team'
import Activity from '../models/Activity'
import Workout from '../models/Workout'
import Leaderboard from '../models/Leaderboard'

const router = Router()

router.get('/seed-status', async (req, res) => {
  try {
    const [users, teams, activities, workouts, leaderboard] = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      Workout.countDocuments(),
      Leaderboard.countDocuments()
    ])

    res.json({ users, teams, activities, workouts, leaderboard })
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch counts' })
  }
})

export default router
