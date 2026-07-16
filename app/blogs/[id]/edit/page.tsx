import PagePlaceholder from "@/src/components/dev/PagePlaceholder";

export default function EditBlogPage() {
  return (
    <PagePlaceholder
      module="Blogs"
      page="Edit Blog"
      route="/blogs/[id]/edit"
    />
  );
}
