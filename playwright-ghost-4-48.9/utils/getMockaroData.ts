import { request } from "@playwright/test";

export async function getMockaroData(schema: string): Promise<object> {
  const context = await request.newContext({
    baseURL: `https://my.api.mockaroo.com/${schema}?key=a4360b50`
  });

  const data = await context.get("", {
    headers: {
      Accept: "application/*"
    }
  });
  const result = await data.json();
  return result;
}
