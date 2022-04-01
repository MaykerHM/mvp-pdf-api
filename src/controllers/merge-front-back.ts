import { Request, Response } from 'express'

export class MergeFrontBack {
  async handle(req: Request, res: Response) {
    try {
      return res.send('MergeFrontBack')
    } catch (error) {
      console.log(error)
    }
  }
}
