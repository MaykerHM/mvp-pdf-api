import app from './config/app'
import cors from 'cors'
import { pdfRoutes } from './routes/pdfRoute'

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(cors())
app.use('/api', pdfRoutes)
