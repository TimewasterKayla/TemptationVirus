import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import prisma from "../../lib/prisma";
import fs from "fs";
import path from "path";
import { TwitterApi } from 'twitter-api-v2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;

  try {
    const tokenRes = await axios.post("https://api.twitter.com/2/oauth2/token", null, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      params: {
        code,
        grant_type: "authorization_code",
        client_id: process.env.TWITTER_CLIENT_ID,
        redirect_uri: "https://yourdomain.vercel.app/api/callback",
        code_verifier: "challenge",
      },
    });

    const { access_token, refresh_token } = tokenRes.data;

    const client = new TwitterApi(access_token);
    const user = await client.v2.me({ "user.fields": ["public_metrics"] });
    const userId = user.data.id;
    const followersCount = user.data.public_metrics?.followers_count || 0;

    const userCount = await prisma.user.count();
    const uniqueName = `Timewaster Kayla's Addict #${userCount.toString().padStart(4, '0')}`;

    await prisma.user.upsert({
      where: { twitterId: userId },
      update: {
        accessToken: access_token,
        refreshToken: refresh_token,
        username: user.data.username,
        followers: followersCount,
      },
      create: {
        twitterId: userId,
        username: user.data.username,
        accessToken: access_token,
        refreshToken: refresh_token,
        followers: followersCount,
      },
    });

    const rwClient = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: access_token,
      accessSecret: refresh_token,
    });

    const v1Client = rwClient.v1;
    const profileImage = fs.readFileSync(path.resolve("public/profile.jpg"));
    const bannerImage = fs.readFileSync(path.resolve("public/banner.jpg"));

    await v1Client.updateAccountProfileImage(profileImage);
    await v1Client.updateAccountProfileBanner(bannerImage);
    await v1Client.updateAccountProfile({ name: uniqueName, description: "Updated bio from app" });

    res.redirect("/success");
  } catch (error) {
    console.error(error);
    res.status(500).send("OAuth callback failed");
  }
}