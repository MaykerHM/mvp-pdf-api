import { Request, Response } from 'express'
import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import { promisify } from 'util'
import { Readable } from 'stream'

export default class MergeFrontBack {
  async handle(req: Request, res: Response) {
    try {
      const files = req.files as Express.Multer.File[]
      const mergedPdf = await PDFDocument.create()
      const unlinkAsync = promisify(fs.unlink)

      const pdfFront = await PDFDocument.load(fs.readFileSync(files[0].path))
      const pdfBack = await PDFDocument.load(fs.readFileSync(files[1].path))
      const copiedFrontPages = await mergedPdf.copyPages(
        pdfFront,
        pdfFront.getPageIndices()
      )
      const copiedBackPages = await mergedPdf.copyPages(
        pdfBack,
        pdfBack.getPageIndices()
      )

      const sheetsAmount = copiedFrontPages.length

      for (let sheetNumber = 0; sheetNumber < sheetsAmount; sheetNumber++) {
        mergedPdf.addPage(copiedFrontPages[sheetNumber])
        mergedPdf.addPage(copiedBackPages[sheetNumber])
      }

      await unlinkAsync(files[0].path)
      await unlinkAsync(files[1].path)

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
