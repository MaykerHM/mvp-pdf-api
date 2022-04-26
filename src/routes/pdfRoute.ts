import express from 'express'
import fg from 'fast-glob'
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

export const pdfRoutes = express.Router()

fg.sync('**/src/controllers/**.ts').map(async (file) => {
  const controller = (await import(`../../${file}`)).default
  const fileName = file.split('/')[2].split('.')[0]
  pdfRoutes.use(`/${fileName}`, upload.array('files'), new controller().handle)
})
