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
    else if (followers >= 100 && followers < 150) category = "Chair";
    else if (followers >= 150 && followers < 200) category = "Simpie";
    else if (followers >= 200 && followers < 250) category = "Addict";
    else if (followers >= 250 && followers < 300) category = "Piggy";
    else if (followers >= 300 && followers < 350) category = "Loser";
    else if (followers >= 350 && followers < 400) category = "Drooler";
    else if (followers >= 400 && followers < 450) category = "Doggie";
    else if (followers >= 450 && followers < 500) category = "Kitty";
    else if (followers >= 500 && followers < 550) category = "Devotee";
    else if (followers >= 550 && followers < 700) category = "Cutie";
    else if (followers >= 700 && followers < 800) category = "Streamer";
    else if (followers >= 800 && followers < 1000) category = "Brat";
    else if (followers >= 1000 && followers < 1500) category = "Billboard";
    else if (followers >= 1500 && followers < 2000) category = "Bimbo";
    else if (followers >= 2000 && followers < 3000) category = "Mistress";
    else if (followers >= 3000 && followers < 4000) category = "Bestie";
    else if (followers >= 4000) category = "Wifey";

    let description = "";

switch (category) {
  case "Peasant":
    description = "💖I'm liikee, totes just a LOWLY peasant under @TimewasterKayla's SPELL💫🔮💕! It's sooo FUN 2 work 4 BRATZ like her~ 🙈👩‍🌾🌾~ you should def join us mmpff💖";
    break;
  case "Servant":
    description = "💖YUMPFF~!🔥🎀being a lil SERVANT 4 @TimewasterKayla is sooo fk'n HAWT!🧎✨i'd TOTES do ANYTHING she asks and I LOVE IT NGGGHH💞💦";
    break;
  case "Chair":
    description = "💖mmmpfff~💫😍I literally ONLY EXIST 2 be SAT ON by @TimewasterKayla's BIG BEHIND!🍑🪑💕... DUMMIES like me r meant 2 be SQUISHED!😋💖🤗🍑";
    break;
  case "Simpie":
    description = "💖omffggg!💕 I likeee~ can't stawp SIMPING 4 @TimewasterKayla!🥰💞💋she's soooo LOVELY💖💓😍.. being locked in her basement is the BEST~🥵💄🎀";
    break;
  case "Addict":
    description = "💖@TimewasterKayla is SOOOOO MY NEW ADDICTION OML!!!😍💫✨😵I JUST CAN'T GET ENOUGH!!!🥵💋🤤💞I'd do ANYTHING 4 HAWT WOMEN LIKE HERRR💦🎀🍑💕";
    break;
  case "Piggy":
    description = "💖OINK OINK OINK!🐽🐽💦I'm liiiikee~ TOTES a dumb fk'n PIGGY 4 @TimewasterKayla omlll💖💦🥵.. making IDIOTIC decisions 4 BRATS is sooooo LOVELY🐽💕☠";
    break;
  case "Loser":
    description = "💖im actually such a DUMB LIL LOSER 4 @TimewasterKayla🥵💖💞there's just something sooo.. REFRESHING.. ENCHANTING.. abt losing 4 BRATS💖💦🎀u should try it💖";
    break;
  case "Drooler":
    description = "💖ayooo CHAT?!😼🔥I liiiikeee~ just can't stawp DROOLING 4 @TimewasterKayla!😋💦💓kissies from BRAT BADDIEZ r to DIE FOR!!💀🤤💖";
    break;
  case "Doggie":
    description = "💖WURF WURF WURF!!!🐶❤️🎀 just another of @TimewasterKayla's DUMB DOGGIES LOLZ!💦🙈💄being collared in her KENNEL is TOTES the best 4 DUMMIES like meeee🐶🥵💞";
    break;
  case "Kitty":
    description = "💖MEOWMEOWMEOW!!!😻💖😻I'm a lil KITTY CAT 4 @TimewasterKayla and I fk'n LOVE MY LIFE!!😼🔥😻💓I get 2 sleep in her bed EVERY NIGHT RAHRKAJSDHKSAD🥰😻🎀💄";
    break;
  case "Devotee":
    description = "💖I'm liiikeee~ SO DEVOTED 2 @TimewasterKayla!🙏💘✨Hawt greeedy bratty baddies r TOTES liiike~ my new RELIGION!🙏🔥💋💞YUMMPFF!🎀💄💝";
    break;
  case "Cutie":
    description = "💖AWHHHH!💞🥰😇I'm just a lil CUTIE PIE 4 @TimewasterKayla!😚🎀💓I TOTES lewk SO much fk'n hotter LOCKED INSIDE HER BASEMENT where cuties belooong!!🥰💖🎀";
    break;
  case "Streamer":
    description = "💖LOCK IN CHAT!!😼🔥IM A NEW STREAMER 4 @TimewasterKayla!!😻🔥💞she's literally SOOOO FIRE FR FR NO CAP🔥💓🎀SIMP 4 HER LIKE I DO N'WATCH THE STREAM!💖🙈💞";
    break;
  case "Brat":
    description = "💖YUMMPFF~!💖🎀literallyyy just a BRAT 4 the BRAT QUEEN @TimewasterKayla!😈💝👑you should TOTES become her lil SUBJECT too BABY!💦💖🤪";
    break;
  case "Billboard":
    description = "💖I'M LITERALLY JUST AN ADVERTISEMENT LMFAOOO📢🤣🎀💖@TimewasterKayla TOTES deserves DUMB BILLBOARDS like meeeee!!💦✨💋💝being DUMB 4 BRATZ is the BEST!!💖";
    break;
  case "Bimbo":
    description = "💖mmmppfff~ SUCH a TOTAL BIMBO 4 @TimewasterKayla!💅💄💋being HAWT and STUPID is literallyyy my only FK'N PURPOSE IN LIFE TEEHEHE💝🎀😍that's sooooo sexyyy..🔥";
    break;
  case "Mistress":
    description = "💖I'm a newwww prreeetty MISTRESS 4 @TimewasterKayla!💕🥰💖😈she's liiikee.. TOTES showing me how 2 be JUST AS HAWT as herrr!!🎀💄👠🌟SIMP 4 US~ LOSER!!💋💋";
    break;
  case "Bestie":
    description = "💖omfggg I'm SO HAPPY 2 be @TimewasterKayla's NEW BESTIE!!😍💕🎀we totes do EVERYTHING TOGETHER!!🌺🙈🥰SNUGGLE~ LAUGH AT DUMMIES, SLOPPILY KISS...💋👄💦";
    break;
  case "Wifey":
    description = "💖OMGG IT HAPPENED!💖🎀I now ETERNALLY BELONG 2 @TimewasterKayla as one of her WIFEYS!!💍🥰💞liikee~ till DEATH do us PART!!🥰🌺💐✨I'm actually sooo in LUV!😍😍";
    break;
  default:
    description = "💖MMMPFF~!💓🎀💞I'm literally SOOOO FK'N CAUGHT IN @TimewasterKayla's WEB!!🕸🕷🥰she is SUCH a HAWTIE~ a GREEDY BRAT..💖💄🎀I'd do ANYTHING 4 herrrr😍💦😵";
}

    const emojis = ["🔥", "💓", "💕", "💝", "🌺", "💐", "💦", "✨", "👄", "🍑", "🌷", "🌼", "🌻", "🎀", "💄", "🥰", "😈", "😻", "🙈", "💖", "😇", "🥵", "💋", "💫"];

    // Shuffle the emojis
    const shuffled = emojis.sort(() => 0.5 - Math.random());
    // Pick the first 3 unique ones
    const selectedEmojis = shuffled.slice(0, 3).join("");

    // Final name
    const uniqueName = `Timewaster Kayla's ${category} ${selectedEmojis}`;


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
      description,
      name: uniqueName,
      url: "https://paypal.me/BimboKayla",
      location: "Kayla's Basement💖",
    });

    res.redirect("/success");
  } catch (error) {
    console.error("Callback error:", error);
    res.status(500).send("OAuth 1.0a callback failed");
  }
}

