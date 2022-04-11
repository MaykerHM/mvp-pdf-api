import { Request, Response } from 'express'

export default class MergeFrontBack {
  async handle(req: Request, res: Response) {
    try {
      return res.send('merge-front-back')
    } catch (error) {
      console.log(error)
    }
  }
}
