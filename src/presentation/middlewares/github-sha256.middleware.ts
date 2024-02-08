import { NextFunction, Request, Response } from "express"
import * as crypto from "node:crypto"
import { envs } from "../../config"

const SECRET_TOKEN = envs.SECRET_TOKEN

const verifySignature = (req: Request) => {
  try {
    const signature = crypto
      .createHmac("sha256", SECRET_TOKEN)
      .update(JSON.stringify(req.body))
      .digest("hex")

    const xHubSignature = req.header("x-hub-signature-256") ?? ""

    let trusted = Buffer.from(`sha256=${signature}`, "ascii")
    let untrusted = Buffer.from(xHubSignature, "ascii")
    return crypto.timingSafeEqual(trusted, untrusted)
  } catch (error) {
    return false
  }
}

export class GitHubSha256Middleware {
  static verifySignature = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!verifySignature(req)) {
      res.status(401).send("Unauthorized")
      return
    }
    next()
  }
}
