import { dbClient } from "@/db";
import { notFound } from "next/navigation";
import SnippetEditFormPage from "@/components/snippet-edit-form";

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const id = parseInt(props.params.id);
  const snippet = await dbClient.snippet.findFirst({
    where: {
      id: id,
    },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl">Editing snippet with title - {snippet.title}</h1>
      <SnippetEditFormPage snippet={snippet} />
    </div>
  );
}
