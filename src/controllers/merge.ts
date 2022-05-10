import { Request, Response } from 'express'
import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import { promisify } from 'util'
import { Readable } from 'stream'

export default class Merge {
  async handle(req: Request, res: Response) {
    try {
      const files = req.files as Express.Multer.File[]
      const mergedPdf = await PDFDocument.create()
      const unlinkAsync = promisify(fs.unlink)

      for (const file of files) {
        const pdf = await PDFDocument.load(fs.readFileSync(file.path))
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
        await unlinkAsync(file.path)
      }

      const mergedPdfFile = await mergedPdf.save({
        updateFieldAppearances: true,
      })
      res.setHeader('Content-Disposition', 'inline; filename="mergedPDF.pdf"')
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
