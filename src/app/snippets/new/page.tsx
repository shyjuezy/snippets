import React, { FormEvent } from "react";
import { dbClient } from "@/db";
import { redirect } from "next/navigation";

// export default function Snippet() {
//   async function createSnippet(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     console.log("Creating snippet");
//   }
//
//   return (
//     <div>
//       <h1>Create a snippet</h1>
//       <form onSubmit={createSnippet}>
//         <div>
//           <label htmlFor="title">Title</label>
//           <input type="text" id="title" name="title" />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

export default function Snippet() {
  console.log("Snippet");

  async function createSnippet(formData: FormData) {
    // This needs to be a server action!
    "use server";

    // Check the user's inputs and make sure they're valid
    const title = formData.get("title") as string;
    const content = formData.get("code") as string;

    // Create a new record in the database
    const snippet = await dbClient.snippet.create({
      data: {
        title,
        content,
      },
    });
    console.log(snippet);

    // Redirect the user back to the root route
    redirect("/");
  }

  // async function createSnippet(event: FormEvent<HTMLFormElement>) {
  //   "use server";
  //   event.preventDefault();
  //   console.log("Creating snippet");
  //   const form = event.currentTarget;
  //   const formData = new FormData(form);
  //   const title = formData.get("title") as string | null;
  //   const content = formData.get("code") as string | null;
  //   console.log("title", title);
  //   if (title && content) {
  //     const snippet = await dbClient.snippet.create({
  //       data: {
  //         title,
  //         content,
  //       },
  //     });
  //
  //     console.log("Created snippet", snippet);
  //     form.reset();
  //     redirect("/");
  //   }
  // }

  return (
    <form action={createSnippet}>
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
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
