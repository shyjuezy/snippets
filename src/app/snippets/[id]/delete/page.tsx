interface SnippetDeletePageProps {
  params: {
    id: string;
  };
}

export default function SnippetDeletePage(props: SnippetDeletePageProps) {
  const id = parseInt(props.params.id);
  console.log("SnippetEditPage", id);
  return (
    <div>
      <h1>Delete Snippet - {id} </h1>
    </div>
  );
}
