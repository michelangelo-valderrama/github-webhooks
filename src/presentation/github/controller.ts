import { Request, Response } from "express"
import { GitHubService } from "../services/github.service"
import { DiscordService } from "../services/discord.service"

export class GitHubController {
  constructor(
    private readonly gitHubService: GitHubService,
    private readonly discordService: DiscordService
  ) {}

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

    this.discordService
      .notify(message)
      .then(() => {
        return res.status(202).send("Accepted")
      })
      .catch(() => {
        return res.status(500).json({ error: "Internal Server Error" })
      })
  }
}
