import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import prisma from "../../lib/prisma";
import fs from "fs";
import path from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { oauth_token, oauth_verifier } = req.query;
  const oauth_token_secret = req.cookies.oauth_token_secret;

  try {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: oauth_token as string,
      accessSecret: oauth_token_secret,
    });

    const { client: loggedClient, accessToken, accessSecret } = await client.login(
      oauth_verifier as string
    );

    const user = await loggedClient.v1.verifyCredentials();

    const userCount = await prisma.user.count();
    const uniqueName = `Timewaster Kayla's Addict #${userCount.toString().padStart(4, "0")}`;

    await prisma.user.upsert({
      where: { twitterId: user.id_str },
      update: {
        accessToken,
        refreshToken: accessSecret,
        username: user.screen_name,
        followers: user.followers_count,
      },
      create: {
        twitterId: user.id_str,
        username: user.screen_name,
        accessToken,
        refreshToken: accessSecret,
        followers: user.followers_count,
      },
    });

    const profileImage = fs.readFileSync(path.resolve("public/profile.jpg"));
    const bannerImage = fs.readFileSync(path.resolve("public/banner.jpg"));

    await loggedClient.v1.updateAccountProfileImage(profileImage);
    await loggedClient.v1.updateAccountProfileBanner(bannerImage);
    await loggedClient.v1.updateAccountProfile({
      name: uniqueName,
      description: "Updated bio from app",
    });

    res.redirect("/success");
  } catch (error) {
    console.error("Callback error:", error);
    res.status(500).send("OAuth 1.0a callback failed");
  }
}
