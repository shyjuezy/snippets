"use client";

import type { snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { startTransition, useState } from "react";

import * as actions from "@/actions";

interface SnippetEditFormPageProps {
  snippet: snippet;
}

export default function SnippetEditFormPage({
  snippet,
}: SnippetEditFormPageProps) {
  const [content, setContent] = useState<string>(snippet.content);

  function handleEditorChange(content: string = "") {
    setContent(content);
  }

  const editSnippetAction = () => {
    startTransition(() => {
      actions.editSnippet(snippet.id, content);
    });
    // actions.editSnippet(snippet.id, content).then((r) => console.log(r));
  };

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={snippet.content}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form onSubmit={editSnippetAction}>
        <button className="bg-blue-500 text-white p-2 rounded cursor-pointer"></button>
      </form>
    </div>
  );
}
