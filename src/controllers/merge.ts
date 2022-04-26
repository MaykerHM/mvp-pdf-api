import { Request, Response } from 'express'
import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import { Readable } from 'stream'

export default class Merge {
  async handle(req: Request, res: Response) {
    try {
      const files = req.files as Express.Multer.File[]
      const mergedPdf = await PDFDocument.create()

      files.map(async (file) => {
        const pdf = await PDFDocument.load(fs.readFileSync(file.path))
        await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      })

      const mergedPdfFile = await mergedPdf.save()
      res.setHeader('Content-Disposition', 'inline; filename="mergedPDF.pdf"')
      res.setHeader('Content-Length', mergedPdfFile.buffer.byteLength)
      res.setHeader('Content-Type', 'application/pdf')
      let stream = new Readable()
      stream.push(mergedPdfFile)
      stream.push(null)
      stream.pipe(res)
    } catch (error) {
      console.log(error)
    }
  }
}
