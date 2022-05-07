export async function fetchTxt(txt) {
  try {
    const response = await fetch(txt);
    if (!response.ok) {
      throw new Error(`[txt] HTTP error: ${response.status}`);
    }
    const response__txt = await response.text();
    console.log(response__txt, typeof response__txt);
    return response__txt;
  } catch (err) {
    console.error(err);
  }
}
