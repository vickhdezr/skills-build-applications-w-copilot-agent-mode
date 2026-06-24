/* Seed the octofit_db database with test data */

import mongoose from 'mongoose'
import User from '../models/User'
import Team from '../models/Team'
import Workout from '../models/Workout'
import Activity from '../models/Activity'
import Leaderboard from '../models/Leaderboard'

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'

async function seed() {
  console.log('Seed the octofit_db database with test data')
  await mongoose.connect(MONGO_URI)
  try {
    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({})
    ])

    // Create users
    const users = await User.create([
      { name: 'Ava Martinez', email: 'ava.martinez@example.com' },
      { name: 'Noah Patel', email: 'noah.patel@example.com' },
      { name: 'Liam Johnson', email: 'liam.johnson@example.com' },
      { name: 'Sophia Lee', email: 'sophia.lee@example.com' }
    ])

    // Create teams
    const teamAlpha = await Team.create({
      name: 'Alpha Octos',
      members: [users[0]._id, users[1]._id],
      captain: users[0]._id
    })

    const teamBeta = await Team.create({
      name: 'Beta Blazers',
      members: [users[2]._id, users[3]._id],
      captain: users[2]._id
    })

    // Create workouts
    const workouts = await Workout.create([
      {
        user: users[0]._id,
        title: 'Morning Run',
        exercises: [],
        durationMinutes: 35,
        caloriesBurned: 320,
        date: new Date()
      },
      {
        user: users[1]._id,
        title: 'Strength Circuit',
        exercises: [
          { name: 'Squat', sets: 3, reps: 8, weightKg: 80 },
          { name: 'Bench Press', sets: 3, reps: 6, weightKg: 70 }
        ],
        durationMinutes: 50,
        caloriesBurned: 450,
        date: new Date()
      }
    ])

    // Create activities
    await Activity.create([
      {
        user: users[0]._id,
        type: 'run',
        durationMinutes: 35,
        distanceKm: 6.2,
        calories: 320,
        workout: workouts[0]._id,
        date: new Date()
      },
      {
        user: users[1]._id,
        type: 'workout',
        durationMinutes: 50,
        calories: 450,
        workout: workouts[1]._id,
        date: new Date()
      },
      {
        user: users[2]._id,
        type: 'cycling',
        durationMinutes: 45,
        distanceKm: 18.4,
        calories: 520,
        date: new Date()
      }
    ])

    // Create leaderboard entries
    await Leaderboard.create([
      { user: users[0]._id, metric: 'weekly_points', score: 540, rank: 1 },
      { user: users[1]._id, metric: 'weekly_points', score: 480, rank: 2 },
      { user: users[2]._id, metric: 'weekly_points', score: 410, rank: 3 }
    ])

    console.log('Seeding complete')
  } catch (err) {
    console.error('Seeding error', err)
  } finally {
    await mongoose.disconnect()
  }
}

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
