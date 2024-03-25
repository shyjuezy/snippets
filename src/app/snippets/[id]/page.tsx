import { notFound } from "next/navigation";
import Link from "next/link";
import { dbClient } from "@/db";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const snippet = await dbClient.snippet.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center justify-between min-w-screen py-2 mt-6">
        <h1 className="text-2xl  w-2/3">{snippet.title}</h1>
        <div className="flex gap-2 flex-1">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="bg-blue-500 text-white p-2 rounded cursor-pointer flex-1"
          >
            Edit
          </Link>
          <Link
            href={`/snippets/${snippet.id}/delete`}
            className="bg-red-500 text-white p-2 rounded cursor-pointer flex-1"
          >
            Delete
          </Link>
        </div>
      </div>
      <div>
        <p className="p-4 bg-gray-100 rounded-md shadow-md">
          {snippet.content}
        </p>
      </div>
    </div>
  );
}
