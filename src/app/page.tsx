import { dbClient } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippet = await dbClient.snippet.findMany();

  const renderedSnippet = snippet.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex flex-row justify-between w-full p-4
        my-2 bg-gray-100 rounded-md shadow-md cursor-pointer
        hover:bg-gray-200"
      >
        <h1>{snippet.title}</h1>
        <div>view</div>
      </Link>
    );
  });

  console.log(`snippet - ${JSON.stringify(snippet)}`);

  return (
    <div className="flex flex-col items-center justify-center min-w-screen py-1">
      <h1 className="m-5">Home Page</h1>
      <div className="flex flex-row justify-between w-full">
        <div>
          <h1 className="font-bold text-2xl">Snippets</h1>
        </div>
        <Link
          href="/snippets/new"
          className="bg-blue-500 text-white p-2 rounded cursor-pointer"
        >
          Create New Snippet
        </Link>
      </div>
      {renderedSnippet}
    </div>
  );
}
