import express from 'express'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'

const app = express()
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
      console.log(`MongoDB connected at ${MONGO_URI}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error', err)
    process.exit(1)
  })
