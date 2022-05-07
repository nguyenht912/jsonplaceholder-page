export async function fetchUrl(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`[url] HTTP error: ${response.status}`);
    }
    const response__json = await response.json();
    console.log(response__json, typeof response__json);
    return response__json;
  } catch (err) {
    console.error(err);
  }
}
