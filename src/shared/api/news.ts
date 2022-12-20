export async function api<T>(url: string): Promise<T> {
  return await fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
