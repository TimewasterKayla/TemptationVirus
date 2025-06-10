import React from "react";

export default function Home() {
  const redirectToTwitter = () => {
    window.location.href = "/api/auth/twitter";
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Connect Twitter</h1>
      <button
  className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-200 font-semibold"
  onClick={redirectToTwitter}
>
  Connect with Twitter
</button>

    </main>
  );
}
