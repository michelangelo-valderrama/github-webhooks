import { GitHubPushPayload, GitHubStarPayload } from "../../interfaces"

export class GitHubService {
  onStar(payload: GitHubStarPayload): string {
    const { action, sender, repository } = payload

    return `User ${sender.login} ${action} star on ${repository.full_name}`
  }

  onPush(payload: GitHubPushPayload): string {
    const { repository, commits, created, deleted, pusher } = payload

    if (created) {
      return `New push created in ${repository.full_name} by ${pusher.name}`
    } else {
      return `Push deleted in ${repository.full_name} by ${pusher.name}`
    }
  }
}
