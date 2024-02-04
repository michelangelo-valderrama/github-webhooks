import express from "express"
import { envs } from "./config"
import { GitHubController } from "./presentation/github/controller"
import { GitHubService } from "./presentation/services/github.service"
;(() => {
  main()
})()

async function main() {
  const app = express()

  app.use(express.json())

  const controller = new GitHubController(new GitHubService())

  app.post("/api/github", controller.webHookHandler)

  app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`)
  })
}
