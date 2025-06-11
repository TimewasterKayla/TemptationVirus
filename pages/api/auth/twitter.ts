import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url, oauth_token, oauth_token_secret } = await client.generateAuthLink(
    "https://kayla-forever.vercel.app/api/callback",
    { authAccessType: "write" }
  );

  // Store token/secret in cookie/session in prod
 // Set cookie with appropriate options
res.setHeader("Set-Cookie", `oauth_token_secret=${oauth_token_secret}; HttpOnly; Path=/api/callback; Secure; SameSite=None`);
  res.redirect(url);
}
