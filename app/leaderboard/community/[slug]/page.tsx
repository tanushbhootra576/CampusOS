interface CommunityPageProps {
  params: {
    slug: string;
  };
}

export default function CommunityLeaderboardPage({
  params,
}: CommunityPageProps) {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold capitalize">
        {params.slug} Leaderboard
      </h1>

      <p className="text-gray-500 mt-2">
        Community-specific leaderboard coming soon.
      </p>
    </main>
  );
}