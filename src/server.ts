import app from './config/app'
import cors from 'cors'
import express from 'express'
import { pdfRoutes } from './routes/pdfRoute'

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(cors())
app.use(express.json())
app.use('/api', pdfRoutes)
