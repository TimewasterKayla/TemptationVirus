// pages/api/callback.ts
import { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
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

    const { client: loggedClient } = await client.login(oauth_verifier as string);
    const user = await loggedClient.v1.verifyCredentials();

    // Determine follower category
    const followers = user.followers_count;
    let category = "Peasant";
    if (followers >= 50 && followers < 100) category = "Servant";
    else if (followers >= 100 && followers < 200) category = "Chair";
    else if (followers >= 200 && followers < 500) category = "Simpie";
    else if (followers >= 500) category = "Billboard";

    // Random suffix number
    const uniqueNumber = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    const uniqueName = `Timewaster Kayla's ${category} #${uniqueNumber}`;

    // Random profile image
    const profileImages = fs.readdirSync(path.resolve("public/profiles"));
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    const selectedImage = profileImages[randomIndex];
    const profileImage = fs.readFileSync(path.resolve("public/profiles", selectedImage));

    // Banner image
    const bannerImage = fs.readFileSync(path.resolve("public/banner.png"));

    // Update Twitter profile
    await loggedClient.v1.updateAccountProfileImage(profileImage);
    await loggedClient.v1.updateAccountProfileBanner(bannerImage);
    await loggedClient.v1.updateAccountProfile({
      name: uniqueName,
      description:
        "YUUMPF!~💖🔥🙈I liiiikee TOTES gave in 2 @TimewasterKayla's BRAT CHARMZ! ✨💋she TOTES knows best 4 dummies like me😵💞",
      url: "https://paypal.me/BimboKayla",
      location: "Kayla's Basement💖",
    });

    res.redirect("/success");
  } catch (error) {
    console.error("Callback error:", error);
    res.status(500).send("OAuth 1.0a callback failed");
  }
}

