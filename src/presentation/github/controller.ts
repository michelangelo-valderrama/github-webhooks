import { Request, Response } from "express"

export class GitHubController {
  constructor() {}

  webHookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header("x-github-event") ?? "unknow"
    const signature = req.header("x-hub-signature-256") ?? "unknow"
    const payload = req.body

    console.log(JSON.stringify(payload))

    res.status(202).send("Accepted")
  }
}
