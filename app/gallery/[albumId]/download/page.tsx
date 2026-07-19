import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function DownloadAlbumPage() {
  return (
    <PagePlaceholder
      module="Gallery"
      page="Download Album"
      route="/gallery/[albumId]/download"
    />
  );
}
