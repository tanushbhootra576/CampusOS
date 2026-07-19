import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function AlbumPage() {
  return (
    <PagePlaceholder
      module="Gallery"
      page="Album"
      route="/gallery/[albumId]"
    />
  );
}
