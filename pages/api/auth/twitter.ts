import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import { serialize } from "cookie";

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { url, oauth_token, oauth_token_secret } = await client.generateAuthLink(
      "https://temptation-virus.vercel.app/api/callback",
      { authAccessType: "write" }
    );

    // ✅ Set cookie with proper options
    const cookie = serialize("oauth_token_secret", oauth_token_secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on Vercel
      sameSite: "lax", // Cookie is sent on redirect
      path: "/", // 🔥 Important: allow all paths including /api/callback
      maxAge: 300, // optional: expire in 5 mins
    });

    res.setHeader("Set-Cookie", cookie);
    res.redirect(url);
  } catch (error) {
    console.error("Twitter auth initiation failed:", error);
    res.status(500).send("Twitter auth error");
  }
}
