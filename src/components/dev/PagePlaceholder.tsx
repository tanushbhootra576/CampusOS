interface PagePlaceholderProps {
  module: string;
  page: string;
  route: string;
  note?: string;
}

export default function PagePlaceholder({
  module,
  page,
  route,
  note,
}: PagePlaceholderProps) {
  return (
    <div className="container mx-auto flex min-h-[50vh] flex-col items-start justify-center gap-2 px-6 py-16">
      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
        {module}
      </span>
      <h1 className="text-2xl font-bold text-slate-900">{page}</h1>
      {note && <p className="max-w-md text-sm text-slate-500">{note}</p>}
      <code className="mt-4 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
        {route}
      </code>
    </div>
  );
}
