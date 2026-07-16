import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function ImageViewerPage() {
  return (
    <PagePlaceholder
      module="Gallery"
      page="Image Viewer"
      route="/gallery/[albumId]/[imageId]"
    />
  );
}
