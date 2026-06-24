import express from 'express'
import { connectDB } from './config/db'
import router from './routes'

const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'

const app = express()
app.use(express.json())

app.use('/api', router)

async function start() {
  try {
    await connectDB(MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
      console.log(`MongoDB connected at ${MONGO_URI}`)
    })
  } catch (err) {
    console.error('MongoDB connection error', err)
    process.exit(1)
  }
}

start()
