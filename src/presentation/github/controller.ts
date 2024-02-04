import { Request, Response } from "express"
import { GitHubService } from "../services/github.service"

export class GitHubController {
  constructor(private readonly gitHubService: GitHubService) {}

  webHookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header("x-github-event") ?? "unknow"
    const signature = req.header("x-hub-signature-256") ?? "unknow"
    const payload = req.body
    let message = ""

    switch (githubEvent) {
      case "star":
        message = this.gitHubService.onStar(payload)
        break
      case "push":
        message = this.gitHubService.onPush(payload)
        break
      default:
        message = `Unknown event ${githubEvent}`
        break
    }

    console.log(message)
    res.status(202).send("Accepted")
  }
}
