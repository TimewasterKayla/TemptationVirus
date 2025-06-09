import React from "react";

export default function Home() {
  const redirectToTwitter = () => {
    const clientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!;
    const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_TWITTER_REDIRECT_URI!);
    const state = crypto.randomUUID();
    const scope = "tweet.read tweet.write users.read users.write offline.access";

    const twitterUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
      scope
    )}&state=${state}&code_challenge=challenge&code_challenge_method=plain`;

    window.location.href = twitterUrl;
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Connect Twitter</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={redirectToTwitter}
      >
        Connect with Twitter
      </button>
    </main>
  );
}