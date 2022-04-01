import 'dotenv/config'
import express from 'express'

const app = express()
const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Application running on port ${PORT}`))
export default app
