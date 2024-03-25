import { dbClient } from "@/db";

export async function editSnippet(id: number, content: string) {
  await dbClient.snippet.update({
    where: {
      id: id,
    },
    data: {
      content: content,
    },
  });
}
