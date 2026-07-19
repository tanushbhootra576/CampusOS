import CommunityDetailPage from "@/src/modules/communities/CommunityDetailPage";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CommunitySlugPage({ params }: Props) {
  const { slug } = await params;
  return <CommunityDetailPage slug={slug} />;
}
