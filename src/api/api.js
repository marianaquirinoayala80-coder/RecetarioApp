import { API_URL } from "../constants";

export async function fetchRecipes() {
  const res = await fetch(`${API_URL}/recipes`);
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`GET /recipes fallo: ${res.status} ${txt}`);
  }
  return await res.json();
}

export async function searchRecipes(q) {
  const res = await fetch(`${API_URL}/recipes/search?q=${encodeURIComponent(q || "")}`);
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`GET /recipes/search fallo: ${res.status} ${txt}`);
  }
  return await res.json();
}
