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
    // Determine the category based on follower count
let category = "Peasant";
if (user.followers_count >= 50 && user.followers_count < 100) {
  category = "Servant";
} else if (user.followers_count >= 100 && user.followers_count < 200) {
  category = "Chair";
} else if (user.followers_count >= 200 && user.followers_count < 500) {
  category = "Simpie";
} else if (user.followers_count >= 500) {
  category = "Billboard";
}

// Count users already in this category
const categoryCount = await prisma.user.count({
  where: {
    followers: {
      gte: category === "Peasant" ? 0 :
           category === "Servant" ? 50 :
           category === "Chair" ? 100 :
           category === "Simpie" ? 200 : 500,
      lt: category === "Peasant" ? 50 :
          category === "Servant" ? 100 :
          category === "Chair" ? 200 :
          category === "Simpie" ? 500 : 99999999,
    },
  },
});

// Format name
const uniqueName = `Timewaster Kayla's ${category} #${categoryCount.toString().padStart(4, "0")}`;


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

    const profileImages = fs.readdirSync(path.resolve("public/profiles")); // e.g. /public/profiles/image1.jpg, image2.jpg, ...
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    const selectedImage = profileImages[randomIndex];
    const profileImage = fs.readFileSync(path.resolve("public/profiles", selectedImage));
    const bannerImage = fs.readFileSync(path.resolve("public/banner.png"));

    await loggedClient.v1.updateAccountProfileImage(profileImage);
    await loggedClient.v1.updateAccountProfileBanner(bannerImage);
    await loggedClient.v1.updateAccountProfile({
      name: uniqueName,
      description: "YUUMPF!~💖🔥🙈I liiiikee TOTES gave in 2 @TimewasterKayla's BRAT CHARMZ! ✨💋she TOTES knows best 4 dummies like me😵💞",
      url: "https://x.com/timewasterkayla",
      location: "Kayla's Basement💖"
    });

    res.redirect("/success");
  } catch (error) {
    console.error("Callback error:", error);
    res.status(500).send("OAuth 1.0a callback failed");
  }
}
