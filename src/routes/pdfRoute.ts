import express from 'express'
import { MergeFrontBack } from '../controllers/merge-front-back'

export const pdfRoutes = express.Router()

pdfRoutes.get('/', new MergeFrontBack().handle)
