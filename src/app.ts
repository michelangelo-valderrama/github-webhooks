import express from "express"
import { envs } from "./config"
import { GitHubController } from "./presentation/github/controller"
import { GitHubService } from "./presentation/services/github.service"
import { DiscordService } from "./presentation/services/discord.service"
;import { GitHubSha256Middleware } from "./presentation/middlewares/github-sha256.middleware";
(() => {
  main()
})()

async function main() {
  const app = express()

  const controller = new GitHubController(
    new GitHubService(),
    new DiscordService()
  )

  app.use(express.json())
  app.use(GitHubSha256Middleware.verifySignature)
  
  app.post("/api/github", controller.webHookHandler)

  app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`)
  })
}
