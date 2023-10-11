export async function getResponse({ url, method, data }) {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
