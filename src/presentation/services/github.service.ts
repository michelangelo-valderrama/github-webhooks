import { GitHubPushPayload, GitHubStarPayload } from "../../interfaces"

export class GitHubService {
  onStar(payload: GitHubStarPayload): string {
    const { action, sender, repository } = payload

    return `User ${sender.login} ${action} star on ${repository.name}`
  }

  onPush(payload: GitHubPushPayload): string {
    const { repository, pusher, head_commit } = payload

    return `Push in ${repository.name} by ${pusher.name}: ${head_commit.message}`
  }
}
