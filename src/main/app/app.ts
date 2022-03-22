import 'dotenv/config'
import express from 'express'

export const app = express()
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Application running on port ${PORT}`))
