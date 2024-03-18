import React from "react";

import { dbClient } from "@/db";
import { redirect } from "next/navigation";

export default function Snippet() {
  console.log("Snippet");

  async function createSnippet(event: React.FormEvent<HTMLFormElement>) {
    "use server";
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title") as string | null;
    const content = formData.get("code") as string | null;
    console.log("title", title);
    if (title && content) {
      const snippet = await dbClient.snippet.create({
        data: {
          title,
          content,
        },
      });

      console.log("Created snippet", snippet);
      form.reset();
      redirect("/");
    }
  }

  return (
    <form onSubmit={createSnippet}>
      <h3 className="font-bold m-3">Create a snippet</h3>
      <div className="m-3">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-center">
            <label htmlFor="title" className="w-12">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex flex-row gap-4 items-center">
            <label htmlFor="code" className="w-12">
              Code
            </label>
            <textarea
              id="code"
              name="code"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
}
