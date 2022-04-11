import { Request, Response } from 'express'
import { PDFDocument } from 'pdf-lib'

export default class Merge {
  async handle(req: Request, res: Response) {
    try {
      const pdfDoc = await PDFDocument.create()

      return res.send('merge')
    } catch (error) {
      console.log(error)
    }
  }
}
