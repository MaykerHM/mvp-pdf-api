import express from 'express'
import fg from 'fast-glob'

export const pdfRoutes = express.Router()

fg.sync('**/src/controllers/**.ts').map(async (file) => {
    const controller = (await import(`../../${file}`)).default
    const fileName = file.split('/')[2].split('.')[0]
    pdfRoutes.use(`/${fileName}`,new controller().handle)
})
